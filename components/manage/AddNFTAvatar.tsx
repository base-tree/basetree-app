import {
  useDisclosure,
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Drawer,
  SimpleGrid,
  Center,
  Box,
  Spinner,
  HStack,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addLinkContentAtom,
  addLinkImageAtom,
  addLinkStylesAtom,
  addLinkTitleAtom,
  addLinkTypeAtom,
  addLinkUrlAtom,
  avatarAtom,
  avatarNftAtom,
  nftsNetworkAtom,
  nftSmallerViewAtom,
  nftTypeAtom,
  openAddLinkAtom,
  openAddNftAtom,
  connectedAccountAtom,
} from "core/atoms";
import { LinkIcon } from "components/logos";
import { MARKETPLACE_URLS, OPENSEA_URL } from "core/utils/constants";
import NetworkModal from "./NetworkModal";
import ReactPlayer from "react-player";
import { useActiveAccount } from "thirdweb/react";
import { getMimeType } from "@/core/utils";

interface Props {
  defaultType: string;
  key?: string;
}

export default function AddNFTAvatar({ defaultType, key }: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_open, _setOpen] = useAtom(openAddNftAtom);
  const [type, setType] = useAtom(nftTypeAtom);
  const _setAddLinkOpen = useSetAtom(openAddLinkAtom);
  const _setTitle = useSetAtom(addLinkTitleAtom);
  const _setType = useSetAtom(addLinkTypeAtom);
  const _setImage = useSetAtom(addLinkImageAtom);
  const _setUrl = useSetAtom(addLinkUrlAtom);
  const _setContent = useSetAtom(addLinkContentAtom);
  const _setStyles = useSetAtom(addLinkStylesAtom);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [listView, setListView] = useAtom(nftSmallerViewAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [network, setNetwork] = useAtom(nftsNetworkAtom);
  const [currentNetwork, setCurrentNetwork] = useState(network);
  const [nftjsons, setNftJsons] = useState<any[] | undefined>(undefined);
  const [avatarNft, setAvatarNft] = useAtom(avatarNftAtom);
  const [collection, setCollection] = useState<string>("");

  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);

  useEffect(() => {
    if (_open) {
      onOpen();
    }
  }, [_open]);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  async function setAsAvatar(index: number) {
    if (!nftjsons) return;
    let nft = nftjsons[index];
    if (!nft) return;
    // if (nft.type === "contract") {
    //   setLoaded(false);
    //   setCollection(() => nft.address);
    //   loadNFTs(nft.address);
    //   return;
    // }
    let avatarURL = nft.image?.source;

    setAvatar(String(avatarURL));
    //setEditingAvatarFile(undefined);
    setAvatarNft(String(nft.address));
    onClose();
  }

  async function addAsLink(index: number) {
    if (!nftjsons) return;
    let nft = nftjsons[index];
    if (!nft) return;
    // if (nft.type === "contract") {
    //   setLoaded(false);
    //   setCollection(() => nft.address);
    //   loadNFTs(nft.address);
    //   return;
    // }
    let avatarURL = nft.image?.source;

    let _styleType;

    _setType("nft link");
    _setTitle(String(nft.name));
    _setImage(String(avatarURL));

    _setUrl(
      MARKETPLACE_URLS[nft.network] +
        String(nft.address) +
        "/" +
        String(nft.tokenId)
    );
    _setContent(
      JSON.stringify({
        address: String(nft.address) + "/" + String(nft.tokenId),
        metadata: nft.metadata,
      })
    );

    _setStyles({
      size: "md",
      network: nft.network,
      scanLink: false
    });
    _setAddLinkOpen(true);
    onClose();
  }

  const getApiUrl = (chain: string) => {
    return `https://api.opensea.io/api/v2/chain/${chain}/account/${connectedAccount}/nfts`;
  };

  const loadNFTs = async (_collection: string) => {
    try {
      // Clear existing NFTs and set loading state
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);

      //const isContract = _collection === "";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": String(process.env.NEXT_PUBLIC_OPENSEA_API),
        },
      };

      // Helper function to process the response
      // const processNfts = (response: any, network: string) => {
      //   const nfts =
      //     (isContract ? response?.contracts : response?.ownedNfts) || [];

      //   return nfts.map((nft: any) => {
      //     const thumbnailUrl = nft.image.thumbnailUrl || nft.image.cachedUrl;
      //     console.log(nft);
      //     return {
      //       name: isContract
      //         ? nft.openSeaMetadata?.collectionName || nft.name
      //         : nft.name,
      //       type: isContract ? "contract" : "nft",
      //       tokenId: nft.tokenId,
      //       tokenCount: isContract ? nft.totalBalance : 1,
      //       address: isContract ? nft.address : nft.contract.address,
      //       network: network,
      //       metadata: isContract ? "" : nft.raw?.metadata || {},
      //       image: {
      //         source: thumbnailUrl,
      //         mimetype: nft.image.contentType,
      //       },
      //     };
      //   });
      // };

      // // Fetch NFTs
      // const baseResponse = await fetch(
      //     getApiUrl("base", eth),
      //     options
      //   ).then((res) => res.json());

      // // Process responses and combine NFTs from both networks
      // const baseNfts = processNfts(baseResponse, "ethereum");
      // setNftJsons(baseNfts);

      // // If no NFTs were found, mark the list as empty
      // if (baseNfts.length === 0) {
      //   setListIsEmpty(true);
      // }

      await fetch(getApiUrl("base"), options)
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          const _nfts: any[] = response?.nfts ;
          _nfts.map((nft: any) => {
            const _nftJson = {
              name: nft.name,
              tokenId: nft.identifier,
              description: nft.description,
              address: nft.contract,
              network: network,
              metadata: nft.metadata_url,
              image: {
                source: nft.display_image_url,
                mimetype: getMimeType(nft.image_url),
              },
            };
            nft.name !== null &&
              setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
              
          });
          if(_nfts.length === 0){
            setListIsEmpty(true);
          } else {
            setListIsEmpty(false);
          }
        })
        .catch((err) => console.error(err));

      setLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getNfts() {
      if (isOpen && !loaded) {
        loadNFTs(collection);
      }

      if (isOpen && network !== currentNetwork) {
        setCurrentNetwork(network);
        loadNFTs(collection);
      }
    }
    if (isOpen) {
      getNfts();
    }
  }, [isOpen, network, collection]);

  return (
    <>
      <Button
        key={key}
        colorScheme="gray"
        variant={"pop"}
        rounded={"xl"}
        onClick={() => {
          _setAddLinkOpen(false);
          setType(defaultType);
          _setOpen(true);
          onOpen();
        }}
      >
        {defaultType === "avatar" ? "Pick Avatar" : "Pick NFT"}
      </Button>
      <Drawer
        key={key}
        onClose={onClose}
        isOpen={_open}
        size={"full"}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === "dark" ? "var(--dark1)" : "var(--white)"}
          py={4}
        >
          <DrawerHeader
            gap={3}
            display={"flex"}
            flexDirection={notMobile ? "row" : "column"}
          >
            <HStack gap={2} flexGrow={1}>
              <Text flexGrow={1}>
                Pick {type === "avatar" ? "Avatar" : "NFT"}
              </Text>

              <Button
                aria-label="reload-nfts"
                onClick={() => loadNFTs(collection)}
                gap={2}
                variant={"pop"}
                rounded={"xl"}
              >
                {notMobile ? "Reload" : ""}{" "}
                <LinkIcon type="RiRestartLine" size={"24"} />
              </Button>
              {/* {notMobile && <NetworkModal />} */}
              <Button
                aria-label="close-nfts-modal"
                onClick={onClose}
                gap={2}
                variant={"pop"}
                rounded={"xl"}
              >
                <LinkIcon type="RiCloseLine" size={"24"} />
              </Button>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            {collection.length > 0 && (
              <Button
                mb={4}
                onClick={() => {
                  setCollection(() => "");
                  loadNFTs("");
                }}
                size={"lg"}
              >
                Back to Collections
              </Button>
            )}
            <SimpleGrid columns={[1, 2, 3, 3, 4]} gap={6}>
              {nftjsons?.map((nft, index) => (
                <Button
                  onClick={() =>
                    type === "avatar" ? setAsAvatar(index) : addAsLink(index)
                  }
                  key={"nft-" + index}
                  borderRadius={12}
                  h={"100%"}
                  w={"100%"}
                >
                  <Flex
                    width={"100%"}
                    key={"nft-div-" + index}
                    flexDirection={"column"}
                    gap={2}
                    p={4}
                    borderRadius={12}
                  >
                    <Flex justify={"space-between"} gap={2} align={"center"}>
                      {/* <Box opacity={0.5}>
                        <LinkIcon type={`No.${nft.tokenCount}`} size={"34px"}/>
                      </Box> */}
                      <Text
                        w={"100%"}
                        fontWeight={"bold"}
                        fontSize={
                          listView
                            ? String(nft.name).length > 15
                              ? String(nft.name).length > 18
                                ? "xs"
                                : "sm"
                              : "md"
                            : "lg"
                        }
                      >
                        {listView
                          ? String(nft.name).length > 18
                            ? String(nft.name).slice(0, 18) + "..."
                            : String(nft.name)
                          : String(nft.name).length > 23
                          ? String(nft.name).slice(0, 23) + "..."
                          : String(nft.name)}
                      </Text>
                      <Box opacity={0.5}></Box>{" "}
                      <LinkIcon type={String(nft.network)} line size={"24"} />
                    </Flex>
                    <Flex
                      key={nft.name + " name" + index}
                      gap={2}
                      w={"100%"}
                      flexDirection={"column"}
                      justify={"center"}
                      align={"center"}
                    >
                      <Box p={4}>
                        {String(nft.image?.mimetype).includes("mp4") ? (
                          <Center>
                            <ReactPlayer
                              url={nft?.image?.source}
                              width={"100%"}
                              loop
                              muted
                              playing
                              height={230}
                            />
                          </Center>
                        ) : (
                          <Image
                            borderRadius={12}
                            width={"100%"}
                            height={"230px"}
                            transition={"ease"}
                            transitionDuration={"1000"}
                            alt={nft.name}
                            textAlign={"center"}
                            src={nft.image?.source}
                          />
                        )}
                      </Box>
                    </Flex>
                  </Flex>
                </Button>
              ))}
            </SimpleGrid>
            {isLoading && (
              <Center width={"100%"} height={200}>
                <Spinner size="lg" />
              </Center>
            )}

            {listIsEmpty && !isLoading && (
              <Center display="flex" flexDirection="column" gap={4} minH={200}>
                <Text fontSize="xl">Looks like You don't own any NFTs !?</Text>
              </Center>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
