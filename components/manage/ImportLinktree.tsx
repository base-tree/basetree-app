import {
  Button,
  Flex,
  useMediaQuery,
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
  Avatar,
  Checkbox,
  Center,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiAddFill, RiAddLine, RiFileCopy2Line } from "react-icons/ri";
import { useAtom, useAtomValue } from "jotai";
import {
  addLinkTypeAtom,
  avatarAtom,
  bioAtom,
  linksArrayAtom,
  linksAtom,
  openImportLinktreeAtom,
  socialsArrayAtom,
  titleAtom,
} from "core/atoms";
import { capFirstLetter } from "core/utils";
import { LinkIcon } from "components/logos";
import AddWalletButton from "./AddWalletButton";
import AddLinkButton from "./AddLinkButton";
import AddSocialButton from "./AddSocialButton";
import { importLinktreeAccount } from "core/utils/dataImports";
import { CustomLink, LinktreeData, ObjectItem } from "@/types";
import { Links, Socials } from "../Profile";
import axios from "axios";
import cheerio from "cheerio";
import { AVAILABLE_LINKS, getSocialUrlScheme } from "@/core/utils/constants";

export default function ImportLinktree() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_open, _setOpen] = useAtom(openImportLinktreeAtom);
  const [username, setUsername] = useState("https://linktr.ee/");
  const [importKeys, setImportKeys] = useState({title:true,avatar:true,bio:true,socials:true,links:true});
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useAtom(bioAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [socials, setSocials] = useAtom(socialsArrayAtom);
  const [links, setLinks] = useAtom(linksAtom);
  const [linksArray, setLinksArray] = useAtom(linksArrayAtom);
  const [data, setData] = useState<LinktreeData>();
  const toast = useToast();

  useEffect(() => {
    if (_open) {
      onOpen();
    }
  }, [_open]);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  async function scrapeLinktree(url: string) {
    try {
      const { data: html } = await axios.get(`https://linktr.ee/${url}`);
      const $ = cheerio.load(html);

      // Extract the title
      const title = $("#profile-title").text().trim();

      // Extract the bio
      const bio = $("#profile-description").text().trim() || "";

      // Extract the avatar
      const avatar = $("#profile-picture img").attr("src") || "";

      // Extract links
      const links: CustomLink[] = [];
      $("#links-container .relative").each((index, element) => {
        const linkTitle = $(element).find("p").text().trim();
        const linkUrl = $(element).find("a").attr("href");
        const imgElement = $(element).find(
          'img[data-testid="LinkThumbnailImage"]'
        );
        const linkImage = imgElement.attr("src") || "";
        let linkType = "simple link"; // Default type if no specific match is found

        if (linkTitle && linkUrl) {
          // Iterate over AVAILABLE_LINKS to find the matching type
          for (let availableLink of AVAILABLE_LINKS) {
            const regex = availableLink.reg;

            // Check if the regex is valid and matches the URL
            if (regex && new RegExp(regex).test(linkUrl)) {
              linkType = availableLink.type;
              break; // Stop once we find the first match
            }
          }

          // Push the link object to the links array
          links.push({
            title: linkTitle,
            url: linkUrl,
            styles: { icon: linkImage, size: "md" },
            type: linkType,
            image: "",
            content: "",
          });
        }
      });

      // Extract socials (using data-testid="SocialIcon")
      const socials: ObjectItem[] = [];
      $('a[data-testid="SocialIcon"]').each((index, element) => {
        const socialTitle = $(element).attr("title") || "";
        const socialUrl = $(element).attr("href") || "";

        if (socialTitle && socialUrl) {
          socials.push({ key: socialTitle, value: socialUrl });
        }
      });

      return { title, bio, avatar, links, socials };
    } catch (error: any) {
      console.error(`Error scraping Linktree page: ${error.message}`);
      return { title: "", bio: "", avatar: "", links: [], socials: [] };
    }
  }

  const importLinktree = async () => {
    setLoading(true);
    const name = username.split("/")[3].split("?")[0];
    const data = await scrapeLinktree(name);

    if (data) {
      const user = data;
      setData(user);
      console.log(user);
    }
    setLoading(false);
  };

  const importLinks = async ()=> {

      if(!data) return;

      if(importKeys.title){
        setTitle(data.title);
      }

      if(importKeys.avatar){
        setAvatar(data.avatar);
      }
      if(importKeys.bio){
        setBio(data.bio);
      }

      if(importKeys.socials){
        setSocials([...socials,...data.socials.map((social)=> ({key : getSocialUrlScheme(social.key) ,value:social.value}))])
      }

      if(importKeys.links){
        setLinks([...links,...data.links])
        setLinksArray([...links,...data.links])
      }

      toast({
        title:'Import Successful',
        description:'Data was imported succesfully',
        status: 'success',
        isClosable: true
      })
      onClose();
      
  }

  return (
    <>
      <Button
        variant={"pop"}
        rounded={"xl"}
        gap={2}
        onClick={() => {
          setData(undefined);
          onOpen();
          setLoading(false);
          setImportKeys({title:true,avatar:true,bio:true,socials:true,links:true})
        }}
        className="add"
        h={"80px"}
        w={"100%"}
        size={"lg"}
      >
        <LinkIcon type="linktree" size={"28px"} />
        Import from Linktree
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={["full", "full", "lg", "xl", "2xl"]}
      >
        <ModalOverlay
          bg="blackAlpha.700"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent
          bg={colorMode === "dark" ? "var(--dark1)" : "var(--white)"}
        >
          <ModalHeader>Import from Linktree</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={"center"} alignContent={"center"}>
            {!data ? (
              <Stack gap={4}>
                <Text>Enter your linktree URL : </Text>
                <Input
                  size={"lg"}
                  defaultValue={"https://linktree.com/"}
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  placeholder="e.g. https://linktree.com/abolfazlbayat"
                />
                <Button
                  size={"lg"}
                  onClick={importLinktree}
                  isLoading={loading}
                >
                  Fetch Linktree Data
                </Button>
              </Stack>
            ) : (
              <Stack gap={4}>
                <Text>Linktree Data Fetched</Text>
                <Text>Select Links to Import</Text>

                {data?.title && (
                  <Flex gap={2} justify={"space-between"}>
                    <Checkbox size="lg" defaultChecked checked={importKeys.title} onChange={(e)=> setImportKeys({ ...importKeys, title: e.currentTarget.checked })} >
                      <Text>Title</Text>
                    </Checkbox>
                    <Text fontWeight={"bold"}>{`${title} -> ${data.title}`}</Text>
                  </Flex>
                )}

                {data?.avatar && (
                  <Flex gap={2} justify={"space-between"}>
                    <Checkbox size="lg" defaultChecked checked={importKeys.avatar} onChange={(e)=> setImportKeys({ ...importKeys, avatar: e.currentTarget.checked })} >
                      <Text>Avatar</Text>
                    </Checkbox>
                    <Center gap={4}>
                    <Avatar src={avatar} size={"sm"} />{` -> `}
                    <Avatar src={data.avatar} size={"sm"} />
                    </Center>
                  </Flex>
                )}

                {data?.bio && (
                  <Flex gap={2} flexDir={"column"}>
                    <Checkbox size="lg" defaultChecked checked={importKeys.bio} onChange={(e)=> {setImportKeys({ ...importKeys, bio: e.currentTarget.checked })}} >
                      <Text>Bio</Text>
                    </Checkbox>
                    <Text fontWeight={"bold"}>{`${bio} -> ${data.bio}`}</Text>
                  </Flex>
                )}

                {data?.socials && (
                  <Flex gap={2} flexDir={"column"}>
                    <Checkbox size="lg" defaultChecked checked={importKeys.socials} onChange={(e)=> setImportKeys({ ...importKeys, socials: e.currentTarget.checked })} >
                      <Text>Social Media Icons</Text>
                    </Checkbox>
                    <Socials
                      json={{ socials: data.socials }}
                      title="linktree-socials"
                      onlyIcons
                    />
                  </Flex>
                )}

                {data?.links && (
                  <Flex gap={2} flexDir={"column"}>
                    <Checkbox size="lg" defaultChecked checked={importKeys.links} onChange={(e)=> setImportKeys({ ...importKeys, links: e.currentTarget.checked })} >
                      <Text>Links</Text>
                    </Checkbox>
                    <Links
                      json={{ links: data.links }}
                      title="linktree-links"
                    />
                  </Flex>
                )}

                <Button
                  size={"lg"}
                  onClick={importLinks}
                  isLoading={loading}>
                  Import
                </Button>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter justifyContent={"center"} fontSize={"xs"}>
            Updating Regularly
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
