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
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Link,
  Avatar,
  Center,
  Spinner,
  LightMode,
  DarkMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiCheckLine, RiShuffleLine } from "react-icons/ri";
import { useAtom, useAtomValue } from "jotai";
import {
  bgColorAtom,
  buttonBgColorAtom,
  fontAtom,
  isConnectedAtom,
  lightModeAtom,
  nameAtom,
  openModalAtom,
  roundAtom,
  variantAtom,
} from "core/atoms";
import { LinkIcon } from "components/logos";
import QRCode from "react-qr-code";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { Styles } from "types";
import { getColor, truncAddress } from "core/utils";
import { TransactionButton, useActiveWallet } from "thirdweb/react";
import { getContract, prepareContractCall, toWei } from "thirdweb";
import { client, ConnectWalletButton } from "components/walletConnect";
import SimpleLink from "./SimpleLink";
import { PAYMENT_COINS } from "@/core/utils/coins";

import Lottie from "react-lottie";
import * as animationData from "assets/animations/congrats.json";

interface Props {
  title: string;
  content: string;
  style?: Styles;
  type: string;
  icon?: JSX.Element;
}

export default function Pay({ title, content, style, icon, type }: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const wallet = useActiveWallet();
  const eth = style?.eth;
  const btc = style?.btc;
  const success = content;
  const font = useAtomValue(fontAtom);
  const name = useAtomValue(nameAtom);
  const round = useAtomValue(roundAtom);
  const bg = useAtomValue(bgColorAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const [connected, setIsConnected] = useAtom(isConnectedAtom);
  const [autoEth, setAutoEth] = useState(false);
  const [isPaying, setisPaying] = useState(false);
  const [paySuccessful, setpaySuccessful] = useState(false);
  const [animated, setAnimated] = useState<boolean>(false);
  const isConnected = useAtomValue(isConnectedAtom);

  const [_open, _setOpen] = useAtom(openModalAtom);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  const [value, setValue] = useState("1");
  const ethuri = `ethereum:${eth}?value=${Number(value) * 1e18}&gas=42000`;

  const btcuri = `bitcoin:${btc}?amount=${value}&label=payment`;

  return (
    <>
      <SimpleLink
        title={title}
        styles={style}
        onClick={onOpen}
        url="#"
        icon={icon}
        type={type}
      />
      <Box
        as={lightMode ? LightMode : DarkMode}
        key={`pay-modal-box-${title.replaceAll(" ","-")}-${lightMode}`}
      >
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
          <ModalOverlay
            bg="blackAlpha.500"
            backdropFilter="auto"
            backdropBlur={"6px"}
          />
          <ModalContent
            bg={
              isPaying
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
            <ModalBody>
              {paySuccessful && !isPaying && (
                <Center minH={246} w={"100%"} flexDir={"column"} gap={6} p={4}>
                  <Text fontSize={"xl"} py={10} textAlign={"center"} w={"100%"}>
                    {`Sent ${value} ETH to ${name} (${truncAddress(
                      String(eth)
                    )})`}
                  </Text>
                  <Text fontSize={"2xl"} px={4}>
                    {success.length > 0 ? success : "Done. Thanks!"}
                  </Text>
                  <Button onClick={() => setpaySuccessful(false)} gap={2}>
                    <LinkIcon type="RiRestartLine" size={"24px"} />
                    Pay Again
                  </Button>
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

              {isPaying && (
                <Center minH={246} flexDirection={"column"} gap={6} p={4}>
                  <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {`Sending ${value} ETH to ${name} (${truncAddress(
                      String(eth)
                    )})`}
                  </Text>
                  <Text
                    fontSize={"xl"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                  >
                    {`Please Confirm in your Wallet`}
                  </Text>
                  <Spinner size={"xl"} />
                </Center>
              )}

              {!paySuccessful && !isPaying && (
                <>
                  {eth && (
                    <Center gap={4} p={4} flexDir={"column"}>
                      <Text>
                        Send {value} ETH to {name} ({truncAddress(eth)})
                      </Text>
                      <InputGroup size="lg" minWidth="xs" borderColor="gray">
                        <InputLeftAddon>
                          <FaEthereum size={"28"} />
                        </InputLeftAddon>
                        <Input
                          placeholder={"Enter amount"}
                          value={value}
                          type="number"
                          onChange={(e) =>
                            setValue(String(e.currentTarget.value))
                          }
                        />
                        <InputRightElement width={"70px"} fontWeight={"bold"}>
                          ETH
                        </InputRightElement>
                      </InputGroup>
                      {isConnected ? (
                        <TransactionButton
                          style={{ borderRadius: "54px", width: "100%" }}
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
                            setisPaying(false);
                            setpaySuccessful(true);
                          }}
                          onError={(error) => {
                            console.error("Transaction error", error);
                            setpaySuccessful(false);
                            setisPaying(false);
                          }}
                          onClick={() => {
                            setisPaying(true);
                          }}
                        >
                          {title}
                        </TransactionButton>
                      ) : (
                        <ConnectWalletButton
                          title="Connect wallet"
                          style={{ width: "100%" }}
                        />
                      )}
                    </Center>
                  )}
                </>
              )}
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
