import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Button,
  Avatar,
  Container,
  Text,
  Stack,
  SimpleGrid,
  Box,
  Tooltip,
  Center,
  Image,
  Flex,
  Link,
  useMediaQuery,
  useColorMode,
  Spinner,
  HStack,
  IconButton,
  Switch,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Input,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import Logo from "components/logos/Logo";
import { getTierByScore, openWindow, sleep } from "core/utils";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  primaryNameAtom,
  ipfsGatewayAtom,
  networkAtom,
  connectedAccountAtom,
  isConnectedAtom,
  chainAtom,
} from "core/atoms";
import { useAtom, useAtomValue } from "jotai";
import {
  AVATAR_API_URL,
  AVATAR_PREVIEW_URL,
  ETHERSCAN_ADDRESS,
  MAIN_TLD,
  SITE_LOGO_URL,
  SITE_PROFILE_URL,
  SITE_URL,
  TALENT_PASSPORTS_API,
  TLD,
} from "core/utils/constants";
import { RiMoreFill, RiRestartLine } from "react-icons/ri";
import { MdOutlinePreview, MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { createWeb3Name } from "@web3-name-sdk/core";
import { useRouter } from "next/router";
import { LinkIcon } from "components/logos";
import { formatDateDifference, truncAddress } from "core/utils/stringUtils";
import {
  client,
  ConnectWalletButton,
  mainViemClient,
  viemClient,
} from "components/walletConnect";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { base } from "thirdweb/chains";
import { main_addresses, test_addresses } from "@/core/utils/contractAddresses";
import { TalentPassport } from "@/types";
import ModalWrapper from "../ui/ModalWrapper";
import EmbedModal from "../Profile/EmbedModal";
import BasetreeModal from "../Profile/BasetreeModal";

function ExploreSection() {
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const isConnected = useAtomValue(isConnectedAtom);
  const address = useActiveAccount()?.address;
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [names, setNames] = useState<string[]>();
  const [loaded, setLoaded] = useState(false);
  const [passports, setPassports] = useState<any>(undefined);
  const [chain, setChain] = useAtom(chainAtom);
  const isMainnet = chain === base;
  const addresses = isMainnet ? main_addresses : test_addresses;
  const network = useAtomValue(networkAtom);
  const [_network, _setNetwork] = useState(network);
  const { t } = useTranslate();
  const ipfsGateway = useAtomValue(ipfsGatewayAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { colorMode } = useColorMode();
  const [nextPage, setNextPage] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const { pathname } = useRouter();
  const [page, setPage] = useState<number | undefined>();
  const [keyword, setKeyword] = useState<string>("");
  const [order, setOrder] = useState<string>("expiryDate");
  const [orderDir, setOrderDir] = useState<"desc" | "asc">("desc");
  const _collection = "0x03c4738Ee98aE44591e1A4A4F3CaB6641d95DD9a";
  const toast = useToast();

  const loadPassports = async (_page = 1) => {
    try {
      // Clear existing NFTs and set loading state
      console.log("getting passes 0 ", _page, page, isLoading);

      if (_page === page) {
        if (loaded || isLoading) return;
      }

      if (keyword === "" && _page === 1) {
        setPassports([]);
      }
      setIsLoading(true);
      console.log("getting passes");

      const talent_passport_options = {
        "X-API-KEY": process.env.NEXT_PUBLIC_TALENT_API,
      };

      const talent_passport_results = await axios.get(
        `${TALENT_PASSPORTS_API}`,
        { headers: talent_passport_options, params: { keyword, page: _page } }
      );

      if (talent_passport_results.status === 200) {
        console.log(talent_passport_results.data);
        //setPassports((ps:any)=> ps ? [...ps,talent_passport_results.data.passports] : talent_passport_results.data.passports);
        setPage(_page);
        if (keyword.length > 0) {
          setPassports(talent_passport_results.data.passports);
        } else {
          if (keyword === "" && _page === 1) {
            setPassports(talent_passport_results.data.passports);
          } else {
            setPassports((passes: any) =>
              passes
                ? [...passes, ...talent_passport_results.data.passports]
                : talent_passport_results.data.passports
            );
          }
        }
      } else {
        console.log("error loading passports");
      }

      // Helper function to process the response

      setLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (passports?.length === 0 && loaded) {
      setListIsEmpty(true);
    } else {
      setListIsEmpty(false);
    }
  }, [passports]);

  useEffect(() => {
    async function getNfts() {
      if (!loaded) {
        loadPassports(1);
      }
    }

    getNfts();
  }, [keyword]);

  const reload = async () => {
    await loadPassports();
  };

  return (
    <Box>
      <Container
        as="main"
        maxW="100%"
        display="grid"
        flexDir={"column"}
        minH={"100vh"}
        pt={"80px"}
        flexGrow={1}
      >
        <Box py={6} gap={0} width={"100%"} pb={20}>
          <Stack width={"100%"}>
            <Flex
              minWidth={["350px", "420px", "580px", "800px"]}
              align={"center"}
              minH={"80px"}
              p={3}
              borderTopRadius={10}
              justifyContent={"space-between"}
              gap={3}
              flexDir={["column", "column", "row"]}
              background={colorMode === "dark" ? "blackAlpha.500" : "white"}
            >
              <Text
                flexGrow={1}
                fontWeight="bold"
                px={4}
                fontSize={["lg", "xl", "2xl", "3xl"]}
              >
                Explore Top Builders on Base
              </Text>
              <Flex px={3} gap={3} w={["100%", "xs"]}>
                <Input
                  placeholder="Search Builders"
                  value={keyword}
                  fontSize={["md", "lg"]}
                  rounded={"2xl"}
                  variant={"solid"}
                  w={["100%", "xs"]}
                  px={4}
                  size={"lg"}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setPassports([]);
                    }
                    setKeyword(e.target.value.toLowerCase());
                    setLoaded(false);
                  }}
                  bg={
                    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.100"
                  }
                />
              </Flex>
            </Flex>
            {isLoading && (
              <Center width={"100%"} height={500} bg={"blackAlpha.500"} mt={-2}>
                <Spinner size="lg" />
              </Center>
            )}
          </Stack>
          {/* <InfiniteScroll
            dataLength={passports ? passports.length : 0}
            next={()=> setPage((p:any)=> p + 1)}
            hasMore={true}
            loader={<Text>Loading...</Text>}
          > */}
          <SimpleGrid
            gap={4}
            columns={[1, 1, 2, 3, 3, 4]}
            width={"100%"}
            background={colorMode === "dark" ? "blackAlpha.500" : "white"}
            borderBottomRadius={"2xl"}
            p={6}
          >
            {passports?.map((passport: TalentPassport, i: number) => (
              <GridItem
                key={passport.passport_id + "-manage-item"}
                flexDirection={"column"}
                gap={6}
                alignItems={"center"}
              >
                <Center
                  flexDir={"column"}
                  w={"100%"}
                  rounded={"2xl"}
                  minH={["240px", "340px"]}
                  gap={3}
                  p={6}
                  bg={"whiteAlpha.50"}
                >
                  <Box
                    width={["80px"]}
                    height={["80px"]}
                    placeContent={'center'}
                    placeItems={'center'}
                    key={passport.passport_id + "-box-name"}
                  >
                    <Image
                      my={"0px"}
                      onError={({ currentTarget }: any) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = SITE_LOGO_URL;
                      }}
                      maxWidth={["80px"]}
                      maxHeight={["80px"]}
                      rounded={'lg'}
                      alt={passport.passport_profile.display_name}
                      src={String(passport.passport_profile.image_url)}
                    />
                  </Box>
                  <Stack gap={0} textAlign={"center"}>
                    <Center gap={2}>
                      <Text
                        flexGrow={1}
                        fontWeight={"bold"}
                        fontSize={["lg", "xl"]}
                      >
                        {String(
                          passport.passport_profile.display_name
                        ).toLowerCase()}
                      </Text>
                      {passport.verified && (
                        <LinkIcon type="RiVerifiedBadgeFill" size={"26px"} />
                      )}
                    </Center>
                    <Text
                      flexGrow={1}
                      fontWeight={"normal"}
                      fontSize={["md", "lg"]}
                      opacity={0.5}
                    >
                      {passport.passport_profile.location ?? "Based Builder"}
                    </Text>
                    <Text
                      flexGrow={1}
                      fontWeight={"normal"}
                      fontSize={["md", "lg"]}
                      opacity={0.7}
                    >
                      {getTierByScore(passport.score)} Builder
                    </Text>
                  </Stack>
                  <BasetreeModal address={passport.main_wallet} />
                  {/* <ModalWrapper title="View Basetree">    
                    <EmbedModal type="embed" url={} title={passport.passport_profile.display_name + " Basetree"} />
                  </ModalWrapper> */}
                </Center>
              </GridItem>
            ))}
            {passports && passports.length > 0 && (
              <GridItem
                key={"load-more"}
                flexDirection={"column"}
                gap={6}
                alignItems={"center"}
              >
                <Button
                  flexDir={"column"}
                  w={"100%"}
                  rounded={"2xl"}
                  minH={["240px", "340px"]}
                  gap={3}
                  p={6}
                  isLoading={isLoading}
                  onClick={() => loadPassports(page ? page + 1 : 1)}
                  bg={"whiteAlpha.50"}
                >
                  <Text>{passports.length} Builder Loaded</Text>
                  <LinkIcon type="RiMoreFill" />
                  <Text>Load More</Text>
                </Button>
              </GridItem>
            )}
          </SimpleGrid>
          {/* </InfiniteScroll> */}
          {/* {passports && passports?.length > 0 && page && page !== "" && (
            <Flex align={"center"} py={8} gap={4} justify={"end"}>
              <Text fontSize={["xl"]} textAlign={"center"}>
                Page {pageNum}
              </Text>
              <Button
                rounded={"full"}
                isDisabled={page === undefined || page === "" || isLoading}
                size={"lg"}
                onClick={() => {
                  setPageNum(1);
                  setPage("");
                }}
              >
                <LinkIcon type="RiArrowLeftDoubleFill" />
              </Button>
              <Button
                rounded={"full"}
                isDisabled={
                  nextPage === undefined || nextPage === "" || isLoading
                }
                size={"lg"}
                onClick={() => {
                  setPageNum((y) => y + 1);
                  setPage(nextPage);
                }}
              >
                <LinkIcon type="RiArrowRightSLine" />
              </Button>
            </Flex>
          )} */}
          {listIsEmpty && !isLoading && (
            <Center
              display="flex"
              flexDirection="column"
              gap={4}
              minH={"200px"}
            >
              {!isConnected ? (
                <Center my={8} flexDirection="column" minH={"200px"} gap={4}>
                  <Text fontSize="xl">Connect your wallet</Text>
                  <ConnectWalletButton />
                </Center>
              ) : (
                <>
                  <Text fontSize="xl">
                    You don't own any {pathname.includes("old") ? " old " : ""}{" "}
                    Domains on {truncAddress(connectedAccount)}
                  </Text>
                  <NextLink href={"/app"} passHref>
                    <Button
                      variant="outline"
                      textAlign="left"
                      borderWidth={1}
                      gap={2}
                      borderColor="grey"
                    >
                      Claim Your Basetree Now
                    </Button>
                  </NextLink>
                </>
              )}
            </Center>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ExploreSection;
