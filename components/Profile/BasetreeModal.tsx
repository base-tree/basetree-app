import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Stack,
  HStack,
  useClipboard,
  Tooltip,
  IconButton,
  useDisclosure,
  Text,
  Flex,
  useMediaQuery,
  Center,
  useColorMode,
  Box,
  Link,
  SimpleGrid,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Menu,
  MenuButton,
  MenuList,
  Switch,
  ButtonGroup,
  LightMode,
  DarkMode,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { Avatar, Socials, ProfileSkeleton, Wallets } from "components/Profile";
import Links from "components/Profile/Links";
import {
  RiFileCopyLine,
  RiCheckDoubleFill,
  RiCloseLine,
  RiUpload2Line,
  RiMessage3Line,
  RiComputerLine,
  RiSmartphoneLine,
} from "react-icons/ri";
import { LinkIcon } from "components/logos";
import Preview from "components/Profile/Preview";
import { client, mainViemClient } from "../walletConnect";
import { main_addresses } from "@/core/utils/contractAddresses";
import {
  BG_COLORS,
  DEFAULT_BASETREE_RECORDS,
  DEFAULT_RECORDS,
  DEFAULT_SOCIAL_RECORDS,
  DEFAULT_STYLES,
  getSocialTitle,
  IPFS_URLS,
  MAIN_TLD,
  PASSPORT_CREDENTIALS_API,
  SITE_URL,
  TALENT_PASSPORTS_API,
  updateSocialsFromPassport,
} from "@/core/utils/constants";
import { CustomLink, TalentPassport } from "@/types";
import axios from "axios";
import { beautifyUrl } from "@/core/utils";
import { name } from "@/contracts/8453/Resolver";
import { getNamesForAddress } from "@ensdomains/ensjs/subgraph";
import { node } from "contracts/8453/ReverseRegistrar";
import { getContract, prepareContractCall } from "thirdweb";
import { ReverseRegistrar } from "core/utils/contracts";
import { base } from "thirdweb/chains";
import Basetree from "./Basetree";

interface Attribute {
  trait_type: string;
  value: string;
}

interface Props {
  basename?: string;
  address: string;
  onSave?: Function;
}

const BasetreeModal = ({ basename, address, onSave }: Props) => {
  const { t } = useTranslate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const [mobileView, setMobileView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [domainName, setDomainName] = useState(basename);
  const [json, setJson] = useState<any>();
  const toast = useToast();


  const viewBasetree = async ()=> {

    toast({
      title: "Checking Basename",
      description: "Checking for the primary Basename Profile",
      status: "loading",
      duration: null,
      isClosable: false,
    });

    const _node: any = await node({
      contract: getContract({
        client: client,
        address: main_addresses.ReverseRegistrar,
        chain: base,
      }),
      addr: address,
    });

    const _name: any = await name({
      contract: getContract({
        client: client,
        address: main_addresses.PublicResolver,
        chain: base,
      }),
      node: _node as `0x${string}`,
    });
    console.log(_name);
    
    if(_name.includes(MAIN_TLD)){
      toast.closeAll();
      setDomainName(_name);
      onOpen();
    } else {
      toast.closeAll();
      toast({
        title: "No Basename Found",
        description: "Sorry, There is no Basename connected with the users main wallet",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }

  }

  async function getBasetree() {
    if (json || !domainName) {
      return;
    }

    setIsLoading(true);
    let subgraphRecords: any;
    let textRecords: any = [];
    let coinRecords: any = [];

    const _subgraphRecords = await mainViemClient.getEnsText({
      name: domainName,
      key: "xyz.basetree.socials",
      universalResolverAddress: main_addresses.PublicResolver as `0x${string}`,
    });

    if (_subgraphRecords) {
      subgraphRecords = {
        texts: [
          ...DEFAULT_RECORDS,
          ...DEFAULT_BASETREE_RECORDS,
          ..._subgraphRecords.split(","),
        ],
        coins: [],
      };
    } else {
      subgraphRecords = {
        coins: [],
        texts: [
          ...DEFAULT_RECORDS,
          ,
          ...DEFAULT_BASETREE_RECORDS,
          ...DEFAULT_SOCIAL_RECORDS,
        ],
      };
    }

    textRecords = await Promise.all(
      subgraphRecords.texts.map(async (textKey: string) => {
        const textValue = await mainViemClient.getEnsText({
          name: domainName,
          key: textKey,
          universalResolverAddress:
            main_addresses.PublicResolver as `0x${string}`,
        });
        return { key: textKey, value: textValue };
      })
    );

    console.log(subgraphRecords);
    console.log(textRecords);
    // console.log('getting nft');

    const _wallets: { [key: string]: string } = {};
    let _socials: { [key: string]: string } = {};
    const _links: CustomLink[] = [];
    let _title: string = "";
    let _subtitle: string = "";
    let _bio: string = "";
    let _skills: string = "";
    let _notice: string = "";
    let _avatar: string = "";
    let _passport: TalentPassport | any = {};
    let _styles: any = { ...DEFAULT_STYLES };

    coinRecords.map((coin: any) => {
      _wallets[coin.value.name] = coin.value.value;
    });

    textRecords.map(async (text: any) => {
      if (!text) return;
      if (!text.value) return;
      if (getSocialTitle(text.key) !== undefined) {
        _socials[text.key] = text.value;
      }

      if (text.key === "xyz.basetree.links") {
        if (text.value.includes("ipfs://")) {
          const links_result = await axios.get(
            IPFS_URLS[0] + text.value?.slice(7)
          );
          if (links_result.status === 200) {
            let __links: CustomLink[] = links_result.data;
            __links.map((lnk) => {
              _links.push(lnk);
            });
          }
        } else {
          let __links: CustomLink[] = JSON.parse(text.value);
          __links.map((lnk) => {
            _links.push(lnk);
          });
        }
      } else {
        if (text.key === "url" || text.key === "url2" || text.key === "url3") {
          _links.push({
            type: "simple link",
            url: text.value,
            content: "",
            title: beautifyUrl(text.value),
            image: "",
          });
        }
      }

      // if (text.key === "frames") {
      //   text.value.split("|").map((frameUrl: string, ind: number) => {
      //     _links.push({
      //       type: "farcaster frame",
      //       url: frameUrl,
      //       content: "",
      //       title: `Frame ${ind + 1}`,
      //       image: "",
      //     });
      //   });
      // }
      // if(String(text.key).indexOf("url") === 0){
      //   _links.push({title: 'Website', url: text.value, type: 'simple link', image:'',content:'',styles:{size:'md'}});
      // }

      if (text.key === "avatar") {
        _avatar = text.value;
      }

      if (text.key === "display") {
        _title = text.value;
      }

      if (text.key === "location") {
        _subtitle = text.value;
      }

      if (text.key === "description") {
        _bio = text.value;
      }

      if (text.key === "keywords") {
        _skills = text.value;
      }

      if (text.key === "notice") {
        _notice = text.value;
      }

      if (text.key === "xyz.basetree.styles") {
        _styles = {...DEFAULT_STYLES,...JSON.parse(text.value)};

      }
    });

    const talent_passport_options = {
      "X-API-KEY": process.env.NEXT_PUBLIC_TALENT_API,
    };

    const talent_passport_results = await axios.get(
      `${TALENT_PASSPORTS_API}/${address}`,
      { headers: talent_passport_options }
    );

    if (talent_passport_results.status === 200) {
      _passport = talent_passport_results.data.passport;
      const passport_credentials_results = await axios.get(
        `${PASSPORT_CREDENTIALS_API}?passport_id=${_passport.passport_id}`,
        { headers: talent_passport_options }
      );
      console.log(talent_passport_results);
      if (passport_credentials_results.status === 200) {
        _passport.credentials =
          passport_credentials_results.data.passport_credentials;
      } else {
        _passport.credentials = [];
      }
    }

    let _owner: string | null = "";

    _owner = await mainViemClient.getEnsAddress({
      name: domainName,
      universalResolverAddress: main_addresses.PublicResolver as `0x${string}`,
    });

    if(_skills === ''){
      if(_passport && _passport.passport_profile && _passport.passport_profile.tags){
        _skills = String(_passport.passport_profile.tags);
      }
    }

    if(_passport && _passport.passport_socials){
      _socials = updateSocialsFromPassport(_socials,_passport.passport_socials)
    }
    

    setJson({
      name: domainName,
      title: _title,
      owner: _owner,
      subtitle: _subtitle,
      avatar: _avatar,
      bio: _bio,
      links: _links,
      skills: _skills,
      passport: _passport,
      wallets: _wallets,
      socials: _socials,
      styles: _styles,
    });

    setIsLoading(false);

  }

  useEffect(() => {
    // console.log(json)
    if (isOpen) {
      getBasetree();
    } else {
      setIsLoading(true);
      setJson(undefined);
    }
  }, [isOpen]);

  return (
    <>
      <DarkMode>
        <Button
          gap={2}
          borderRadius={12}
          onClick={viewBasetree}
          className={notMobile ? "designDesktop" : "design"}
          colorScheme={"gray"}
          color={"white"}
          w={"100%"}
          maxW={'300px'}
          size={'lg'}
          height={'60px'}
        >
          <LinkIcon type="RiEyeLine" size="22" />
          View Basetree
        </Button>
      </DarkMode>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={mobileView ? "md" : "fullscreen"}
        scrollBehavior="outside"
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.800"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent bg={BG_COLORS[0].color}>
          <ModalBody
            p={0}
            w={"100%"}
          >
            <>
              {isLoading && !json ? (
                <Center w={"100%%"} minH="100vh">
                  <Spinner size="lg" />
                </Center>
              ) : (
                <Basetree
                  json={json}
                  h={'100vh'}
                  isStatic
                  key={`preview-modal-${json.name}`}
                  w={["sm", "sm", "lg", "lg", "xl", "2xl","3xl"]}
                  styles={{paddingTop : '80px'}}
                />
              )}
              <Flex
                gap={2}
                position={"fixed"}
                align={'center'}
                justifyContent={"space-between"}
                width={"100%"}
                display={"flex"}
                backdropFilter="blur(12px)"
                zIndex={10}
                top={0}
                left={0}
                p={3}
              >
                <Flex gap={2} justify={'space-between'} align={'center'}>
                  
                  <IconButton aria-label="close-design-modal" onClick={onClose} gap={2}>
                    <LinkIcon type="RiArrowLeftSLine" /> 
                  </IconButton>
                </Flex>

                {!isLoading && json && <Flex gap={2} align={'center'}>
                <Text fontSize={['lg','lg','xl','2xl']} fontWeight={'bold'}>{json.name}</Text>
                {json.passport && json.passport.verified && <LinkIcon type="RiVerifiedBadgeFill" />}
                </Flex>}

                {json && !isLoading && <IconButton
                    gap={2}
                    aria-label="ViewBasetree"
                    as={Link}
                    href={SITE_URL + json.name}
                    target="_blank"
                  >
                    <LinkIcon type="RiExternalLinkLine" size="24" />
                    
                  </IconButton>}
              </Flex>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BasetreeModal;
