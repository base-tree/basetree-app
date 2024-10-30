import {
  Box,
  IconButton,
  Accordion,
  AccordionItem,
  Tooltip,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Flex,
  Input,
  Textarea,
  InputRightElement,
  InputGroup,
  useMediaQuery,
  useColorMode,
  Text,
  Stack,
  Badge,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { SortableHandle } from "react-sortable-hoc";
import { MdOutlineDragIndicator } from "react-icons/md";
import {
  RiCheckLine,
  RiFileCopy2Line,
  RiUploadCloudLine,
} from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { capFirstLetter } from "core/utils";
import { ImageLink, Link } from "components/Profile";
import { useStorageUpload } from "@thirdweb-dev/react";
import {
  AVAILABLE_LINKS,
  EXAMPLE_LINK_URLS,
  IPFS_IMAGE_URI,
  IPFS_URLS,
  OPENSEA_URL,
} from "core/utils/constants";
import { LinkIcon } from "components/logos";
import { Styles } from "types";
import NftLink from "components/Profile/NftLink";
import { useAtom, useAtomValue } from "jotai";
import SelectOptionButton from "./SelectOptionButton";
import WalletInput from "./WalletInput";
import Donate from "components/Profile/Donate";
import Pay from "components/Profile/Pay";
import { useLineIconsAtom } from "core/atoms";
import IconPicker from "./IconPicker";
import ManageSimpleLink from "./ManageSimpleLink";
import ManageUpload from "./ManageUpload";
import ManageDonate from "./ManageDonate";
import ManageNftGallery from "./ManageNftGallery";
import ManageNftSlider from "./ManageNftSlider";
import ManageEmbedLink from "./ManageEmbedLink";
import ManageBlock from "./ManageBlock";
import axios from "axios";
import ManagePSNProfile from "./ManagePSNProfile";
import SettingsButton from "./SettingButton";
import ManageTokenChart from "./ManageTokenChart";
import ManageImageLink from "./ManageImageLink";
import ManageHeading from "./ManageHeading";
import ManageNftLink from "./ManageNftLink";
import ManageDocument from "./ManageDocument";

const DragHandle = SortableHandle(() => (
  <span>
    <MdOutlineDragIndicator size="22" />
  </span>
));

interface Props {
  type: string;
  title: string;
  url: string;
  ind: number;
  icon: JSX.Element;
  image?: string;
  content?: string;
  styles?: Styles;
  setUrl?: any;
  removeUrl?: any;
}

export default function ManageLink({
  type,
  icon,
  title,
  url,
  image,
  content,
  styles,
  setUrl,
  ind,
  removeUrl,
}: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const [_title, setTitle] = useState(title);
  const [_url, setURL] = useState(url);
  const [_content, setContent] = useState(content);
  const [_loadedContent, setLoadedContent] = useState(
    content?.includes("ipfs://") ? undefined : content
  );
  const [_image, setImage] = useState(image);
  const [_styles, setStyles] = useState(styles);
  const lineIcons = useAtomValue(useLineIconsAtom);
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? "";

  useEffect(() => {
    async function getContent() {
      const result = await axios.get(IPFS_URLS[0] + content?.slice(7));
      if (result.status === 200) {
        setLoadedContent(result.data);
        console.log(result.data);
      }
    }

    if (content?.includes("ipfs://")) {
      getContent();
    }
  }, [content]);

  const toast = useToast();

  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderRadius={10}
        minWidth={"100%"}
        size="lg"
        backgroundColor={
          colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100"
        }
        display={"flex"}
        flexGrow={1}
      >
        <AccordionItem border={0} borderRadius={10} width={"100%"}>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                minWidth={"100%"}
                as={Button}
                height={"52px"}
                _expanded={{ bgColor: "blackAlpha.50" }}
              >
                <Flex
                  gap={2}
                  alignItems={"center"}
                  textAlign="left"
                  width={"100%"}
                >
                  <DragHandle />
                  {icon}
                  <Stack display={"flex"} flex={1} gap={0}>
                    <Text fontWeight={"bold"} m={0}>
                      {_title.length > 20
                        ? _title.slice(0, 20) + " ..."
                        : _title}
                    </Text>
                    <Text fontSize="xs" mt={"0px !important"}>
                      {capFirstLetter(type)}
                    </Text>
                  </Stack>
                  <AccordionIcon />
                </Flex>
              </AccordionButton>

              <AccordionPanel pb={4} minWidth="100%">
                <Stack gap={4}>
                  <Input
                    size="lg"
                    value={_title}
                    variant="filled"
                    mt={2}
                    placeholder={`Enter ${capFirstLetter(type)} Title/Heading`}
                    fontWeight="bold"
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    //onChange={(e) => setUrl(title.toLowerCase(),e.currentTarget.value)}
                  />

                  {isExpanded && type.indexOf("heading") >= 0 && (
                    <ManageHeading
                      type={type}
                      url={_url}
                      setUrl={setURL}
                      styles={_styles}
                      title={title}
                      setStyles={setStyles}
                      preview
                    />
                  )}

                  {isExpanded &&
                    (type.includes("simple link") ||
                      type.includes("video") ||
                      type.includes("tweet") ||
                      type.includes("twitter") ||
                      type.includes("soundcloud")) && (
                      <ManageSimpleLink
                        type={type}
                        url={_url}
                        setUrl={setURL}
                        styles={_styles}
                        setStyles={setStyles}
                      />
                    )}

                  {isExpanded && type.includes("image") && (
                    <ManageImageLink
                      type={type}
                      url={_url}
                      setUrl={setURL}
                      setImage={setImage}
                      image={_image}
                      styles={_styles}
                      setStyles={setStyles}
                    />
                  )}

                  {isExpanded &&
                    (type.includes("youtube") ||
                      type.includes("tweet") ||
                      type.includes("twitter") ||
                      type.includes("soundcloud")) &&
                    RegExp(reg).test(_url) && (
                      <Link
                        type={type}
                        title={_title}
                        url={_url}
                        styles={_styles}
                        content={_content}
                        image={_image}
                      />
                    )}

                  {isExpanded && type.includes("pdf") && (
                    <ManageDocument
                      type={type}
                      url={_url}
                      setUrl={setURL}
                      setImage={setImage}
                      image={_image}
                      styles={_styles}
                      setStyles={setStyles}
                    />
                  )}

                  {(type.includes("simple link") ||
                    type.includes("image") ||
                    type.includes("pdf")) && (
                    <>
                      {(_image || _url) && (
                        <Link
                          type={type}
                          key={
                            type === "simple link"
                              ? _title + "-" + String(_styles?.icon)
                              : _title + "-" + type
                          }
                          title={_title ? _title : capFirstLetter(type)}
                          icon={
                            <LinkIcon
                              key={
                                type === "simple link"
                                  ? _title + "-" + String(_styles?.icon)
                                  : _title + "-" + type
                              }
                              type={
                                type === "simple link"
                                  ? String(_styles?.icon)
                                  : type
                              }
                              line={lineIcons}
                              size={
                                String(_styles?.icon).includes(IPFS_IMAGE_URI)
                                  ? _styles?.size
                                  : _styles?.size === "sm"
                                  ? "24px"
                                  : _styles?.size === "lg"
                                  ? "36px"
                                  : "28px"
                              }
                            />
                          }
                          url={String(_url)}
                          image={String(_image)}
                          styles={_styles}
                        />
                      )}
                    </>
                  )}

                  {isExpanded &&
                    _loadedContent &&
                    type.indexOf("nft link") >= 0 && (
                      <>
                        <ManageNftLink
                          type={type}
                          url={_url}
                          setUrl={setURL}
                          title={_title}
                          setContent={setLoadedContent}
                          image={_image}
                          content={_loadedContent}
                          styles={_styles}
                          setStyles={setStyles}
                        />
                      </>
                    )}

                  {isExpanded && type.indexOf("text") >= 0 && (
                    <Textarea
                      minWidth="xs"
                      my={4}
                      rows={5}
                      maxLength={500}
                      placeholder={"Simple Text ..."}
                      size="lg"
                      bg={
                        colorMode === "dark"
                          ? "whiteAlpha.100"
                          : "blackAlpha.100"
                      }
                      variant="outline"
                      border="none"
                      resize={"none"}
                      value={_content}
                      onChange={(e) => setContent(e.currentTarget.value)}
                    />
                  )}

                  {isExpanded &&
                    (type.includes("donate") || type.includes("pay")) && (
                      <ManageDonate
                        title={_title}
                        type={type}
                        content={String(_content)}
                        setContent={setContent}
                        setStyles={setStyles}
                        styles={_styles ? _styles : {}}
                      />
                    )}

                  {isExpanded && _loadedContent && type.includes("block") && (
                    <ManageBlock
                      title={_title}
                      type={type}
                      content={String(_loadedContent)}
                      setContent={setLoadedContent}
                      setStyles={setStyles}
                      styles={_styles ? _styles : {}}
                    />
                  )}

                  {isExpanded &&
                    _loadedContent &&
                    type.includes("psn profile") && (
                      <ManagePSNProfile
                        title={_title}
                        type={type}
                        content={String(_loadedContent)}
                        setContent={setLoadedContent}
                        setStyles={setStyles}
                        styles={_styles ? _styles : {}}
                      />
                    )}

                  {isExpanded && type.includes("nft gallery") && (
                    <ManageNftGallery
                      title={_title}
                      type={type}
                      content={String(_content)}
                      setContent={setContent}
                      setStyles={setStyles}
                      styles={_styles ? _styles : {}}
                    />
                  )}

                  {isExpanded && type.includes("nft slider") && (
                    <ManageNftSlider
                      title={_title}
                      type={type}
                      content={String(_content)}
                      setContent={setContent}
                      setStyles={setStyles}
                      styles={_styles ? _styles : {}}
                    />
                  )}

                  {isExpanded && type.includes("embed") && (
                    <ManageEmbedLink
                      title={title}
                      type={type}
                      url={_url}
                      setUrl={setURL}
                      styles={_styles ? _styles : {}}
                      setStyles={setStyles}
                    />
                  )}

                  {isExpanded &&
                    _loadedContent &&
                    type.includes("token chart") && (
                      <ManageTokenChart
                        title={title}
                        type={type}
                        url={_url}
                        content={String(_loadedContent)}
                        setContent={setLoadedContent}
                        setUrl={setURL}
                        styles={_styles ? _styles : {}}
                        setStyles={setStyles}
                      />
                    )}

                  <Flex gap={2} width={"100%"}>
                    <Button
                      color="white"
                      bgColor="var(--base1)"
                      isDisabled={
                        _url === url &&
                        _title === title &&
                        _image === image &&
                        _loadedContent === content &&
                        _styles === styles
                      }
                      onClick={() => {
                        if (new RegExp(reg, "i").test(_url)) {
                          setUrl(
                            ind,
                            _title,
                            _url,
                            _image,
                            type === "block" || type === "token chart"
                              ? _loadedContent
                              : _content,
                            _styles
                          );
                        } else {
                          toast({
                            status: "warning",
                            title: "Invalid URL",
                            description:
                              "Please enter the url in the required format",
                            duration: 3000,
                          });
                        }
                      }}
                    >
                      Save
                    </Button>
                    <Button onClick={() => removeUrl(ind)}>Remove</Button>
                  </Flex>
                </Stack>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
}
