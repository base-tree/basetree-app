import {
  Button,
  Box,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  LightMode,
  DarkMode,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiCheckLine } from "react-icons/ri";
import { useAtom, useAtomValue } from "jotai";
import {
  buttonBgColorAtom,
  fontAtom,
  isConnectedAtom,
  lightModeAtom,
  nameAtom,
  openModalAtom,
  roundAtom,
  variantAtom,
} from "core/atoms";
import { capFirstLetter, getColor, truncAddress } from "core/utils";
import { LinkIcon } from "components/logos";
import QRCode from "react-qr-code";
import Lottie from "react-lottie";
import * as animationData from "assets/animations/congrats.json";

import { DONATE_VALUES } from "core/utils/constants";
import WalletLink from "./WalletLink";
import { Styles } from "types";
import {
  PayEmbed,
  TransactionButton,
  useActiveAccount,
  useActiveWallet,
} from "thirdweb/react";
import { client, ConnectWalletButton } from "components/walletConnect";
import { getContract, prepareContractCall, toWei } from "thirdweb";
import SimpleLink from "./SimpleLink";

interface Props {
  title: string;
  content: string;
  style?: Styles;
  type: string;
  icon?: JSX.Element;
}

export default function Donate({ title, content, style, icon, type }: Props) {
  const eth = style?.eth;
  const mode = style?.mode;
  const btc = style?.btc;
  const success = content;
  const wallet = useActiveWallet();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const name = useAtomValue(nameAtom);
  const font = useAtomValue(fontAtom);
  const isConnected = useAtomValue(isConnectedAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const [comment, setComment] = useState<string | undefined>();
  const [isDonating, setIsDonating] = useState(false);
  const [donateSuccessful, setDonateSuccessful] = useState(false);
  const [_open, _setOpen] = useAtom(openModalAtom);
  const [animated, setAnimated] = useState<boolean>(false);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  const [value, setValue] = useState("0.001");
  const ethuri = `ethereum:${eth}?value=${
    Number(value.slice(0, value.indexOf(" "))) * 1e18
  }&gas=42000`;

  const btcuri = `bitcoin:${btc}?amount=${value.slice(
    0,
    value.indexOf(" ")
  )}&label=donation`;

  const DonatePanel = ()=> {
    return (<>
      {donateSuccessful && !isDonating && (
        <Center minH={246} w={"100%"} flexDir={"column"} gap={6}>
          <Text fontSize={"xl"} py={10}>
            {`Sent ${value} ETH to ${truncAddress(String(eth))}`}
          </Text>
          <Text fontSize={"2xl"} px={4}>
            {success.length > 0 ? success : "Done. Thanks!"}
          </Text>
          <Box position={"fixed"} top={-100} zIndex={1000}>
            {!animated && (
              //@ts-ignore
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={800}
                width={800}
                eventListeners={[
                  {
                    eventName: "complete",
                    callback: () => setAnimated(true),
                  },
                ]}
              />
            )}
          </Box>
        </Center>
      )}

      {isDonating && (
        <Center minH={246} flexDirection={"column"} gap={6}>
          <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
            {`Sending ${value} ETH to ${name} (${truncAddress(String(eth))})`}
          </Text>
          <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
            {`Please Confirm in your Wallet`}
          </Text>
          <Spinner size={"xl"} />
        </Center>
      )}

      {!donateSuccessful && !isDonating && (
       <>
            {eth && (
                <Center flexDir={'column'} gap={4} p={4}>
                  <Text>
                      Send {value} ETH to {name} ({truncAddress(eth)})
                    </Text>
                    {DONATE_VALUES["ethereum"].map((val: string) => (
                      <Button
                        leftIcon={
                          val === value ? <RiCheckLine /> : undefined
                        }
                        w={'100%'}
                        onClick={() => setValue(val)}
                        isActive={val === value}
                        size="lg"
                        rounded={round}
                        key={"donate-value-eth-" + val}
                        variant={variant}
                        colorScheme={buttonBg}
                        color={getColor(variant, buttonBg, lightMode)}
                      >
                        {val} ETH
                      </Button>
                    ))}

                  {isConnected ? <TransactionButton
                    style={{ borderRadius: "54px", fontSize: 'large' , width : '100%'}}
                    transaction={async () => {
                      const tx = prepareContractCall({
                        contract: getContract({
                          client: client,
                          address: eth,
                          chain: wallet?.getChain()!,
                        }),
                        method:
                          "function transfer(address to, uint256 value)",
                        params: [eth, toWei(value)],
                        value: toWei(value),
                      });
                      console.log(toWei(value));
                      return tx;
                    }}
                    onTransactionSent={(result) => {
                      console.log(
                        "Transaction submitted",
                        result.transactionHash
                      );
                      console.log(result);
                    }}
                    onTransactionConfirmed={(receipt) => {
                      console.log(
                        "Transaction confirmed",
                        receipt.transactionHash
                      );
                      console.log(receipt);
                      setIsDonating(false);
                      setDonateSuccessful(true);
                    }}
                    onError={(error) => {
                      console.error("Transaction error", error);
                      setDonateSuccessful(false);
                      setIsDonating(false);
                    }}
                    onClick={() => {
                      setIsDonating(true);
                    }}
                  >
                    {title}
                    </TransactionButton> : <ConnectWalletButton title="Connect wallet" style={{width : '100%'}} />}

                </Center>
            )}
          </>
      )}
      </>)
  }

  return (
    <>
      {mode !== "button" ? (
        <SimpleLink
          title={title}
          styles={style}
          onClick={() => {
            setIsDonating(false);
            setDonateSuccessful(false);
            setAnimated(false);
            onOpen();
          }}
          url="#"
          icon={icon}
          type={type}
        />
      ) : (
        <DonatePanel />
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"xl"}
        key={"donate-box-" + title}
      >
        <ModalOverlay
          bg="blackAlpha.500"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent
          bg={
            isDonating
              ? lightMode
                ? "var(--base00)"
                : "var(--base2)"
              : colorMode === "dark"
              ? "var(--dark1)"
              : "var(--white)"
          }
          transition={"all ease 1s"}
          fontFamily={font}
          color={lightMode ? "var(--dark1)" : "white"}
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={lightMode ? LightMode : DarkMode}>
            <DonatePanel />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
