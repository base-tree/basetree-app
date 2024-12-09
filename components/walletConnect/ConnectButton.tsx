import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  useMediaQuery,
  Text,
  Center,
  Stack,
  useColorMode,
  LightMode,
  Menu,
  MenuButton,
  Flex,
  Avatar,
  MenuList,
  Tooltip,
  IconButton,
  useClipboard,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { LinkIcon } from "components/logos";
import {
  AVATAR_API_URL,
  FAUCET_URL,
  IPFS_URLS,
  SITE_DESCRIPTION,
  SITE_LOGO_URL,
  SITE_TITLE,
  SITE_URL,
  TLD,
} from "core/utils/constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  RiLogoutBoxRLine,
  RiFileCopyLine,
  RiCheckDoubleFill,
  RiRefund2Line,
} from "react-icons/ri";
import LogoIcon from "../logos/LogoIcon";
import {
  chainAtom,
  connectedAccountAtom,
  isConnectedAtom,
  networkAtom,
  primaryNameAtom,
} from "core/atoms";
import {
  AutoConnect,
  ConnectButton,
  darkTheme,
  lightTheme,
  useActiveAccount,
  useActiveWallet,
  useConnect,
  useConnectModal,
  useDisconnect,
  useWalletBalance,
} from "thirdweb/react";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client, mainViemClient, viemClient } from ".";
import { getName } from "@base-tree/js/public";
import {
  addr,
  name,
} from "@/contracts/8453/Resolver";
import { node } from "contracts/8453/ReverseRegistrar"
import { Chain, getContract } from "thirdweb";
import { base, baseSepolia } from "thirdweb/chains";
import { truncAddress } from "core/utils";
import Link from "next/link";
import { main_addresses, test_addresses } from "@/core/utils/contractAddresses";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "farcaster", "telegram", "discord", "phone"],
    },
  }),
  //createWallet("com.trustwallet.app"),
  //createWallet("io.zerion.wallet"),
  //createWallet("me.rainbow"),
  //createWallet("app.phantom"),
];

interface Props {
  title?: string;
  style?: any;
  onConnect?: Function | undefined;
}

export default function ConnectWalletButton({
  title = "Connect",
  style,
  onConnect,
}: Props) {
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const [small] = useMediaQuery("(min-width: 480px)");
  const lightMode = useColorMode().colorMode === "light";
  //const web3Name = createWeb3Name();
  const [chain, setChain] = useAtom(chainAtom);
  const isMainnet = chain === base ;
  const addresses = isMainnet ? main_addresses : test_addresses ;
  const [avatar, setAvatar] = useState('');
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);
  const [connectedAccount, setConnectedAccount] = useAtom(connectedAccountAtom);
  const [primaryName, setPrimary] = useAtom(primaryNameAtom);
  const { connect, isConnecting } = useConnectModal();
  const _connectedAccount = useActiveAccount()?.address;
  const { data, isLoading, isError } = useWalletBalance({
    client,
    chain: chain,
    address: _connectedAccount,
  });
  const { onCopy, hasCopied } = useClipboard(String(connectedAccount));
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  async function handleConnect() {
    const wallet = await connect({ client, wallets: wallets }); // opens the connect modal
    console.log("connected to", wallet);
    setIsConnected(true);
    setConnectedAccount(wallet.getAccount()?.address!);
    if (wallet.getChain() !== chain) {
      await wallet.switchChain(chain);
    }
    await getEthPrimary();
    try {
      if (onConnect) {
        onConnect();
      }
    } catch (e) {
      console.log(e);
    }
  }
  //const ethAddress = useAtomValue(ethAtom);
  const [checkName, setCheckName] = useState(false);

  useEffect(() => {
    if (connectedAccount) {
      getEthPrimary();
    }
  }, [connectedAccount]);

  async function getEthPrimary() {
    try {
      if(!connectedAccount || primaryName) return;
      //@ts-ignore
      const _primary = await getName(viemClient, {
        address: connectedAccount as `0x${string}`,
      })

      if(_primary){
        if(_primary.match){
          setPrimary(_primary.name.replace(".bst",""));
        } 
      } else {
        const _node: any = await node({
          contract: getContract({
            client: client,
            address: addresses.ReverseRegistrar,
            chain: chain,
          }),
          addr: connectedAccount as `0x${string}`,
        });

        const _name: any = await name({
          contract: getContract({
            client: client,
            address: addresses.PublicResolver,
            chain: chain,
          }),
          node: _node as `0x${string}`,
        });
        console.log(_name);
        setPrimary(_name.replace(".bst",""));
      };

    } catch {
      (e: any) => {
        console.log("error in eth primary", e);
      };
    }
  }

  const switchAccount = async () => {
    await logout();
    await handleConnect();
  };

  const logout = async () => {
    wallet && disconnect(wallet);

    setConnectedAccount("");
    setIsConnected(false);
    setPrimary("");

  };

  const switchNetwork = async (chain: Chain) => {
    setChain(chain);
    if (wallet && wallet.getChain() !== chain) {
      await wallet.switchChain(chain);
    }
    setPrimary('');
    getEthPrimary();
  };

  useEffect(()=>{

    async function getAvatar() {
      if(isMainnet){
        const _avatar = await mainViemClient.getEnsText({
          name: primaryName,
          key: 'avatar',
          universalResolverAddress: addresses.PublicResolver as `0x${string}`,
        });
        setAvatar(_avatar ? IPFS_URLS[0] + _avatar.replace('ipfs://','') : '');
      } else {
        setAvatar(AVATAR_API_URL + primaryName + "." + TLD);
      }
    }

    if(primaryName.length > 5){
      getAvatar();
    }
  },[primaryName])

  return (
    <>
      <Box
        w={style?.width ? style?.width :
          title !== "Connect"
            ? ["100%", "100%", "fit-content"]
            : ["168px", "fit-content"]
        }
      >
        <AutoConnect
          wallets={wallets}
          client={client}
          onConnect={(wallet) => {
            setIsConnected(true);
            setConnectedAccount(String(wallet.getAccount()?.address));
            if (wallet.getChain() !== chain) {
              wallet.switchChain(chain);
            }
            getEthPrimary();
          }}
          appMetadata={{
            logoUrl: SITE_LOGO_URL,
            name: SITE_TITLE,
            description: SITE_DESCRIPTION,
            url: SITE_URL,
          }}
        />
        {_connectedAccount ? (
          <>
            <Menu>
              <MenuButton
                as={Button}
                size={"lg"}
                rounded={"full"}
                w={'auto'}
                px={0}
                pr={3}
                colorScheme={lightMode ? "whiteAlpha" : "gray"}
                bgColor={lightMode ? "whiteAlpha.900" : "whiteAlpha.100"}
              >
                <Flex
                  gap={3}
                  align={"center"}
                  key={
                    primaryName
                      ? `primary-avatar-box-${primaryName}`
                      : "wallet-avatar-box"
                  }
                >
                  {primaryName !== "" ? (
                    <Avatar
                      color={!lightMode ? "var(--base)" : "var(--base)"}
                      icon={
                        <LinkIcon type="RiUserLine" size={22} color="#ffffff" />
                      }
                      bgColor={!lightMode ? "var(--base0)" : "var(--base0)"}
                      rounded={"full"}
                      src={avatar}
                      size={["md"]}
                    />
                  ) : (
                    <Box p={3} rounded={"full"} border={"1px #77777750 solid"}>
                      <LinkIcon type="RiUserLine" size={22} color="#777777" />
                    </Box>
                  )}
                  <Text
                    fontWeight={"semibold"}
                    textAlign={"left"}
                    fontSize={["md", "lg"]}
                    color={"#ffffff"}
                    my={"0 !important"}
                  >
                    {primaryName && primaryName !== ""
                      ? primaryName.length > (!small ? 8 : 16)
                        ? primaryName?.slice(0, !small ? 8 : 16) + "..."
                        : primaryName
                      : truncAddress(connectedAccount)}
                  </Text>
                  {/* </Stack> */}
                </Flex>
              </MenuButton>
              <MenuList
                width={320}
                mt={1}
                py={2}
                border={lightMode ? "none" : "1px #77777733 solid"}
                shadow={lightMode ? "md" : "none"}
                position={"relative"}
                zIndex={1500}
                rounded={"2xl"}
                bg={lightMode ? "var(--white)" : "black"}
              >
                <Flex
                  p={5}
                  alignItems="center"
                  gap={2}
                  key={
                    primaryName
                      ? `primary-name-box-${primaryName}`
                      : "wallet-name-box"
                  }
                >
                  {/* {primaryName !== "" ? (
                    <Avatar
                      color={!lightMode ? "var(--base)" : "var(--base)"}
                      icon={
                        <LinkIcon type="RiUserLine" size={22} color="#ffffff" />
                      }
                      bgColor={!lightMode ? "var(--base0)" : "var(--base0)"}
                      rounded={"full"}
                      src={avatar}
                      size={["md"]}
                    />
                  ) : (
                    <Box p={3} rounded={"full"} border={"1px #77777750 solid"}>
                      <LinkIcon type="RiUserLine" size={22} color="#777777" />
                    </Box>
                  )} */}
                  <Stack gap={0.5} mx={1} flexGrow={1}>
                    <Text
                      fontWeight={"semibold"}
                      textAlign={"left"}
                      fontFamily={"Poppins"}
                      fontSize="14px"
                      my={"0 !important"}
                    >
                      {primaryName !== ""
                        ? String(primaryName)
                        : truncAddress(connectedAccount)}
                    </Text>
                    <Text
                      fontWeight={"semibold"}
                      textAlign={"left"}
                      fontFamily={"Poppins"}
                      my={"0 !important"}
                      fontSize="14px"
                      color="gray.500"
                    >
                      {!isLoading && !isError && data
                        ? Number(data?.displayValue).toFixed(4)
                        : "Loading"}{" "}
                      {notMobile ? "ETH" : ""}
                    </Text>
                  </Stack>
                  <Tooltip
                    borderRadius={4}
                    label={<Text p={2}>Copy Address</Text>}
                    color={lightMode ? "white" : "black"}
                    bgColor={lightMode ? "black" : "white"}
                    placement="bottom"
                    hasArrow
                  >
                    <IconButton
                      onClick={onCopy}
                      variant="ghost"
                      aria-label="copy-wallet-address"
                    >
                      {hasCopied ? (
                        <RiCheckDoubleFill size={22} />
                      ) : (
                        <RiFileCopyLine size={22} />
                      )}
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip
                    borderRadius={4}
                    label={<Text p={2}>Disconnect Wallet</Text>}
                    hasArrow
                    placement="bottom-end"
                    color={lightMode ? "white" : "black"}
                    bgColor={lightMode ? "black" : "white"}
                  >
                    <IconButton
                      onClick={logout}
                      variant="ghost"
                      aria-label="disconnect-wallet"
                    >
                      <RiLogoutBoxRLine size={22} />
                    </IconButton>
                  </Tooltip> */}
                </Flex>
                <Stack gap={2} my={4} justify={"center"}>
                  {primaryName && (
                    <LinkBox px={5}>
                      <Link href={"name/" + primaryName} passHref>
                        <Button
                          gap={2}
                          width={"100%"}
                          size="md"
                        >
                          <LinkIcon type="RiUserLine" size={22} />
                          Profile
                        </Button>
                      </Link>
                    </LinkBox>
                  )}

                  <LinkBox px={5}>
                    <Button
                      as={NextLink}
                      gap={2}
                      href={"/names"}
                      passHref
                      width={"100%"}
                      size="md"
                    >
                      <LinkIcon type="RiApps2Line" size={24} />
                      {isMainnet ? 'My Basenames' : 'My Pages'}
                    </Button>
                  </LinkBox>

                  <Box px={5}>
                    <Button
                      onClick={logout}
                      borderColor={"gray.800"}
                      gap={2}
                      width={"100%"}
                    >
                      <LinkIcon type="RiLogoutBoxRLine" size={22} />
                      Disconnect
                    </Button>
                  </Box> 

                  {/* <Box px={5}>
                    <Button
                      onClick={()=> switchNetwork(isMainnet ? baseSepolia : base)}
                      borderColor={"gray.800"}
                      gap={2}
                      width={"100%"}
                    >
                      <LinkIcon type="RiShuffleLine" size={22} />
                      Switch to {isMainnet ? 'Testnet' : 'Mainnet'}
                    </Button>
                  </Box> */}
                </Stack>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Button
            rounded={"full"}
            onClick={handleConnect}
            variant="solid"
            colorScheme="light"
            height={"47px"}
            fontSize={"medium"}
            width={
              title !== "Connect"
                ? ["100%", "100%", "fit-content"]
                : ["144px"]
            }
            {...style}
          >
            {title}
          </Button>
        )}
      </Box>
    </>
  );
}
