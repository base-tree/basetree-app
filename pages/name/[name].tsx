import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useMediaQuery,
  useColorMode,
  Button,
  Container,
  Heading,
  Text,
  Flex,
  Spinner,
  Center,
  Link,
  useToast,
  Box,
  LightMode,
  Stack,
  useClipboard,
  Tooltip,
  IconButton,
  ButtonGroup,
  DarkMode,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import {
  beautifyUrl,
  detectCoinChanges,
  detectTextChanges,
  truncAddress,
} from "core/utils";
import axios from "axios";
import {
  ManageSocials,
  ManageLinks,
  EditAvatar,
  BioTextInput,
  TitleInput,
  ManageWallets,
  PreviewModal,
} from "components/manage";
import { useAtom, useAtomValue } from "jotai";
import {
  bioAtom,
  btcAtom,
  lightModeAtom,
  ethAtom,
  avatarAtom,
  nameAtom,
  jsonAtom,
  socialsArrayAtom,
  nftContractAtom,
  linksArrayAtom,
  useLineIconsAtom,
  titleAtom,
  subtitleAtom,
  horizontalSocialAtom,
  addressAtom,
  socialButtonsAtom,
  isConnectedAtom,
  bgColorAtom,
  connectedAccountAtom,
  ipfsGatewayAtom,
  walletsArrayAtom,
  jsonHashAtom,
  walletButtonsAtom,
  roundAtom,
  buttonBgColorAtom,
  variantAtom,
  fontAtom,
  tourStepAtom,
  nftJsonAtom,
  avatarShapeAtom,
  isStyledAtom,
  networkAtom,
  mobileViewAtom,
  targetAtom,
  showDomainAtom,
  headerModeAtom,
  linksAtom,
  avatarSizeAtom,
  headerColorAtom,
  chainAtom,
  skillsAtom,
  noticeAtom,
  passportAtom,
  showSkillsAtom,
  showScoreAtom,
  scoreTypeAtom,
} from "core/atoms";
import {
  SITE_DESCRIPTION,
  SITE_PROFILE_URL,
  SITE_TITLE,
  IPFS_URLS,
  BUTTON_BG_COLORS,
  BUTTON_ROUNDS,
  BUTTON_VARIANTS,
  BG_COLORS,
  FONTS,
  BG_IMAGES,
  getSocialTitle,
  isLink,
  TLD,
  SITE_URL,
  SITE_URL_SHORT,
  MAIN_TLD,
  DEFAULT_RECORDS,
  DEFAULT_SOCIAL_RECORDS,
  DEFAULT_BASETREE_RECORDS,
  TALENT_PASSPORTS_API,
  PASSPORT_CREDENTIALS_API,
  updateSocialsFromPassport,
  DEFAULT_STYLES,
} from "core/utils/constants";

import NextLink from "next/link";

import {
  client,
  ConnectWalletButton,
  mainViemClient,
  viemClient,
} from "components/walletConnect";

import AddModal from "components/manage/AddModal";
import ShareButton from "components/manage/Share";
import Preview from "components/Profile/Preview";
import ProfileCompletion from "components/manage/ProfileCompletion";
import CropAvatar from "components/manage/CropAvatar";
import ManageSidebar from "components/manage/ManageSidebar";
import { LinkIcon } from "components/logos";
import StyleDrawer from "components/manage/StyleDrawer";
import ManageHeader from "components/manage/ManageHeader";
import { CustomLink, TalentPassport } from "types";
import { getNamesForAddress } from "@base-tree/js/subgraph";
import { generateRecordCallArray, namehash } from "@base-tree/js/utils";
import { multicallWithNodeCheck } from "@/contracts/8453/Resolver";
import { Resolver } from "core/utils/contracts";
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import ManageSubnames from "components/manage/ManageSubnames";
import { DeviceFrameset } from "react-device-frameset";
import { base, baseSepolia } from "thirdweb/chains";
import AccordionWrapper from "@/components/manage/AccordionWrapper";
import ManageStylesBox from "@/components/manage/ManageStylesBox";
import ManageLayoutBox from "@/components/manage/ManageLayoutBox";
import { main_addresses, test_addresses } from "@/core/utils/contractAddresses";
import { normalize, getEnsText } from "viem/ens";
import { createPublicClient } from "viem";
import useUploadJsonFile from "@/core/lib/hooks/use-upload";
import ManageSkills from "@/components/manage/ManageSkills";
import ManageVerify from "@/components/manage/ManageVerify";

const ManagePage: NextPage = () => {
  const { t } = useTranslate();
  const [name, setName] = useAtom(nameAtom);
  const [bio, setBio] = useAtom(bioAtom);
  const [skills, setSkills] = useAtom(skillsAtom);
  const [notice, setNotice] = useAtom(noticeAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const [ipfsGateway, setIpfsGateway] = useAtom(ipfsGatewayAtom);
  const [retries, setRetries] = useState<number>(0);
  const [passport, setPassport] = useAtom(passportAtom);
  const isConnected = useAtomValue(isConnectedAtom);
  const network = useAtomValue(networkAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [chain, setChain] = useAtom(chainAtom);
  const linksArray = useAtomValue(linksArrayAtom);
  const links = useAtomValue(linksAtom);
  const socials = useAtomValue(socialsArrayAtom);
  const wallets = useAtomValue(walletsArrayAtom);
  const [lineIcons, setLineIcons] = useAtom(useLineIconsAtom);
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const [round, setRound] = useAtom(roundAtom);
  const [buttonBgColor, setButtonBgColor] = useAtom(buttonBgColorAtom);
  const [variant, setVariant] = useAtom(variantAtom);
  const [font, setFont] = useAtom(fontAtom);
  const [notMobile] = useMediaQuery("(min-width: 992px)");
  const [notMobileH] = useMediaQuery("(min-height: 896px)");
  const [desktop] = useMediaQuery("(min-width: 1280px)");
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
  const [avatarSize, setAvatarSize] = useAtom(avatarSizeAtom);
  const [socialIcons, setSocialIcons] = useAtom(horizontalSocialAtom);
  const [showDomain, setShowDomain] = useAtom(showDomainAtom);
  const [showSkills, setShowSkills] = useAtom(showSkillsAtom);
  const [showScore, setShowScore] = useAtom(showScoreAtom);
  const [showSocialProfiles, setShowSocialProfiles] = useAtom(showScoreAtom);
  const [scoreType, setScoreType] = useAtom(scoreTypeAtom);
  const [headerMode, setHeaderMode] = useAtom(headerModeAtom);
  const [headerColor, setHeaderColor] = useAtom(headerColorAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const [socialRecords, setSocialRecords] = useState("");
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [json, setJson] = useAtom(jsonAtom);
  const [_nftJson, setNftJson] = useAtom(nftJsonAtom);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();
  const domainName =
    String(router.query.name).includes(`.${TLD}`) ||
    String(router.query.name).includes(`.${MAIN_TLD}`)
      ? normalize(String(router.query.name))
      : String(router.query.name) + `.${TLD}`;

  const isMainnet = chain === base && domainName.includes(MAIN_TLD);
  const addresses = isMainnet ? main_addresses : test_addresses;
  const [nftContract, setNftContract] = useAtom(nftContractAtom);
  const { colorMode } = useColorMode();
  const [mobileView, setMobileView] = useAtom(mobileViewAtom);
  const toast = useToast();
  const account = useActiveAccount();
  const { onCopy, hasCopied } = useClipboard(
    String(SITE_URL + name.replace(".bst", ""))
  );

  const {
    isLoading: isUploading,
    data,
    hasError,
    uploadJsonFile,
  } = useUploadJsonFile({ client: client });

  //const [horizontalWallet, setHorizontalWallet] = useAtom(horizontalWalletsAtom);

  const getJson = () => {
    let socialsObj: any = {};
    socials.map((social) => {
      socialsObj[social["key"]] = social["value"];
    });

    let walletsObj: any = {};
    wallets.map((wallet) => {
      walletsObj[wallet["key"]] = wallet["value"];
    });

    let styles: any = {
      lineIcons: lineIcons,
      lightMode: lightMode,
      bgColor: bgColor,
      avatarShape: avatarShape,
      avatarSize: avatarSize,
      socialIcons: socialIcons,
      walletButtons: walletButtons,
      socialButtons: socialButtons,
      buttonBgColor: buttonBgColor,
      showDomain: showDomain,
      showSkills: showSkills,
      showScore: showScore,
      scoreType: scoreType,
      socialProfiles: showSocialProfiles,
      headerMode: headerMode,
      headerColor: headerColor,
      round: round,
      variant: variant,
      font: font,
    };

    const data = {
      name: name,
      owner: connectedAccount,
      title: title,
      subtitle: subtitle,
      avatar: avatar,
      bio: bio,
      links: links,
      skills: skills,
      wallets: walletsObj,
      socials: socialsObj,
      styles: styles,
    };

    return data;
  };

  async function saveProfile() {
    setIsSaving(true);
    toast({
      status: "loading",
      title: "Saving profile to the blockchain",
      description: "Please confirm the transaction in your wallet",
      duration: null,
      isClosable: true,
    });

    const newProfileData = getJson(); // Get updated profile data
    console.log(newProfileData);
    const currentProfileData = json; // Existing profile data from `getProfileJson`

    // Compare old and new profile data for changes and deletions
    const { changedRecords, deletedRecords } = detectTextChanges(
      currentProfileData,
      newProfileData
    );

    const { changedCoins, deletedCoins } = detectCoinChanges(
      currentProfileData.wallets,
      newProfileData.wallets
    );

    // Only proceed if there are changes
    if (
      changedRecords.length === 0 &&
      deletedRecords.length === 0 &&
      changedCoins.length === 0 &&
      deletedCoins.length === 0 &&
      JSON.stringify(currentProfileData.links) ===
        JSON.stringify(newProfileData.links)
    ) {
      toast.closeAll();
      toast({
        status: "info",
        title: "No changes detected",
        description: "No updates to save.",
        duration: 3000,
        isClosable: true,
      });
      setIsSaving(false);
      return;
    }

    // Prepare text records to save (only changed ones)
    let _texts: { key: string; value: string }[] = [];
    changedRecords.map((record) =>
      _texts.push({ key: record.key, value: record.value })
    );

    if (
      JSON.stringify(currentProfileData.links) !==
      JSON.stringify(newProfileData.links)
    ) {
      let __links = JSON.stringify(newProfileData.links);
      if (__links.length > 300) {
        toast({
          title: "Uploading to IPFS",
          description: "Uploading link content to IPFS to reduce gas costs",
          status: "loading",
          duration: 5000,
          isClosable: false,
        });
        __links = await uploadJsonFile(
          JSON.stringify(newProfileData.links),
          `links.${domainName}`
        );
        if (hasError) {
          toast.closeAll();
          toast({
            title: "Error on Uploading to IPFS",
            description:
              "Can not upload to IPFS, please check your network. If the problem presists, please contact support at info@basetree.xyz",
            status: "warning",
            isClosable: true,
          });
          return;
        } else {
          //toast.closeAll();
        }
        console.log("Links too big", __links);
      }

      _texts.push({ key: "xyz.basetree.links", value: __links });
    }

    let _socials: string[] = [];

    Object.keys(newProfileData.socials).forEach((key) => {
      _socials.push(key);
    });

    if (_socials.join(",") !== socialRecords) {
      _texts.push({ key: "xyz.basetree.socials", value: _socials.join(",") });
    }

    // Handle deleted records
    if (deletedRecords.length > 0) {
      deletedRecords.map((key) => handleDeletedRecord(key));
    }

    // Prepare coin records (order-independent)
    let _coins: { coin: string; value: string }[] = [];
    changedCoins.forEach((coin) =>
      _coins.push({ coin: coin.coin, value: coin.value })
    );

    // Handle deleted coins if necessary (optional)
    deletedCoins.forEach((key) => {
      // Implement your logic to handle deleted coins
      console.log(`Coin deleted: ${key}`);
    });

    const options = {
      texts: _texts,
      coins: _coins,
      clearRecords: false, // Do not clear all records, only update the changes
    };

    console.log(options);

    const hash = namehash(domainName);

    let data = generateRecordCallArray({
      namehash: hash,
      ...options,
    });

    if (data.length === 0) data = [];

    const tx = multicallWithNodeCheck({
      contract: getContract({
        client: client,
        address: addresses.PublicResolver,
        chain: isMainnet ? chain : baseSepolia,
        abi: [
          {
            inputs: [
              {
                internalType: "bytes[]",
                name: "data",
                type: "bytes[]",
              },
            ],
            name: "multicall",
            outputs: [
              {
                internalType: "bytes[]",
                name: "results",
                type: "bytes[]",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      }),
      nodehash: hash,
      data: data,
    });

    console.log(options);

    try {
      const { transactionHash } = await sendTransaction({
        transaction: tx,
        account: account!,
      });

      if (transactionHash) {
        setIsSaving(false);
        setIsConfirming(true);
        toast.closeAll();
        toast({
          status: "loading",
          title: "Confirming changes on the blockchain",
          description: "Please wait a few moments while your changes are saved",
          duration: null,
          isClosable: true,
        });
      } else {
        return;
      }

      const receipt = await waitForReceipt({
        client: client,
        chain: isMainnet ? chain : baseSepolia,
        transactionHash: transactionHash,
      });

      if (receipt.status === "success") {
        toast.closeAll();
        toast({
          status: "success",
          title: "Save Successful",
          description: `${name} Profile Saved Successfully. You can now view and share your profile link.`,
          duration: null,
          isClosable: true,
        });
      } else {
        toast.closeAll();
        toast({
          status: "error",
          title: "Failed",
          description:
            "There was an error saving your profile. Please try again.",
          duration: null,
          isClosable: true,
        });
      }
    } catch (e) {
      toast.closeAll();
      toast({
        status: "error",
        title: "Failed",
        description:
          "There was an error saving your profile. Please try again.",
        duration: null,
        isClosable: true,
      });
    }

    setIsSaving(false);
    setIsConfirming(false);
  }

  // Handle deletion of a record (calls a separate function to remove the record)
  const handleDeletedRecord = (key: string) => {
    console.log(`Record deleted: ${key}`);
    // Implement your delete record logic here
    console.log("removing rec : ", key); // Call to remove record from the blockchain
  };

  useEffect(() => {
    async function getProfileJson() {
      if (connectedAccount && isConnected && domainName) {
        try {
          if (json) {
            return;
          }

          setIsLoading(true);
          let subgraphRecords: any;
          let textRecords: any = [];
          let coinRecords: any = [];
          // console.log('getting nft0');
          if (isMainnet) {
            const _subgraphRecords = await mainViemClient.getEnsText({
              name: domainName,
              key: "xyz.basetree.socials",
              universalResolverAddress:
                addresses.PublicResolver as `0x${string}`,
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
              setSocialRecords(_subgraphRecords.toString());
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
                    addresses.PublicResolver as `0x${string}`,
                });
                return { key: textKey, value: textValue };
              })
            );
          } else {
            subgraphRecords = await viemClient.getSubgraphRecords({
              name: domainName,
            });

            textRecords = await Promise.all(
              subgraphRecords.texts.map(async (textKey: string) => {
                const textValue = await viemClient.getTextRecord({
                  name: domainName,
                  key: textKey,
                });
                return { key: textKey, value: textValue };
              })
            );

            coinRecords = await Promise.all(
              subgraphRecords.coins.map(async (coinKey: string) => {
                const coinValue = await viemClient.getAddressRecord({
                  name: domainName,
                  coin: coinKey,
                });
                return { key: coinKey, value: coinValue };
              })
            );
          }

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
          let _passport: TalentPassport | any = undefined;
          let _styles: any = {
            lineIcons: lineIcons,
            lightMode: lightMode,
            bgColor: bgColor,
            avatarShape: avatarShape,
            avatarSize: avatarSize,
            socialIcons: socialIcons,
            walletButtons: walletButtons,
            socialButtons: socialButtons,
            buttonBgColor: buttonBgColor,
            showDomain: showDomain,
            showSkills: showSkills,
            showScore: showScore,
            scoreType: scoreType,
            headerMode: headerMode,
            headerColor: headerColor,
            round: round,
            variant: variant,
            font: font,
          };

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
              if (
                text.key === "url" ||
                text.key === "url2" ||
                text.key === "url3"
              ) {
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
            `${TALENT_PASSPORTS_API}/${connectedAccount}`,
            { headers: talent_passport_options }
          );

          if (talent_passport_results.status === 200) {
            _passport = talent_passport_results.data.passport;
            const passport_credentials_results = await axios.get(
              `${PASSPORT_CREDENTIALS_API}?passport_id=${_passport.passport_id}`,
              { headers: talent_passport_options }
            );
            console.log(passport_credentials_results);
            if (passport_credentials_results.status === 200) {
              _passport.credentials =
                passport_credentials_results.data.passport_credentials;
            } else {
              _passport.credentials = [];
            }
          }

          let _owner: string | null = "";

          if (isMainnet) {
            _owner = await mainViemClient.getEnsAddress({
              name: domainName,
              universalResolverAddress:
                addresses.PublicResolver as `0x${string}`,
            });
          } else {
            // @ts-ignore: Unreachable code error
            const nfts = await getNamesForAddress(viemClient, {
              address: connectedAccount! as `0x${string}`,
              filter: {
                searchString: domainName.slice(0, domainName.indexOf(".bst")),
              },
            });

            _owner = nfts[0].wrappedOwner;

            if (nfts.length === 0) {
              setError(
                `${domainName} doesn't exist, yet! If you have registered this domain, please reload in a few minutes.`
              );
              setIsLoading(false);
              return;
            }
          }

          const nftJson: any = {
            info: {
              owner: _owner,
              manager: _owner,
            },
            name: domainName,
          };

          if (
            String(nftJson.info.owner).toLowerCase() !==
              connectedAccount.toLowerCase() ||
            String(nftJson.info.manager).toLowerCase() !==
              connectedAccount.toLowerCase()
          ) {
            setError(
              `You (${truncAddress(
                connectedAccount
              )}) don't have permission to manage this NFT`
            );
            setIsLoading(false);
            return;
          } else {
            setError("");
          }
          setNftJson(nftJson);
          //console.log(nftJson);

          setJson({
            name: domainName,
            title: _title,
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

          if(_skills === ''){
            if(_passport && _passport.passport_profile && _passport.passport_profile.tags){
              _skills = String(_passport.passport_profile.tags);
            }
          }
      
          if(_passport && _passport.passport_socials){
            _socials = updateSocialsFromPassport(_socials,_passport.passport_socials)
          }

          if(_passport && _passport.main_wallet && _passport.main_wallet.toLowerCase() === nftJson.info.owner.toLowerCase()){
            setPassport(_passport);
          }

          setName(domainName);
          setTitle(_title);
          setSubtitle(_subtitle);
          setBio(_bio);
          //setBtc(res.data.btcAddress);
          //setEth(res.data.ethAddress);
          setAvatar(_avatar);
          setSkills(_skills);
          setNotice(_notice);
          setAvatarShape(_styles.avatarShape ?? "round");
          setAvatarSize(_styles.avatarSize ?? "md");
          setSocialIcons(_styles.socialIcons ?? true);
          setSocialButtons(_styles.socialButtons ?? true);
          setWalletButtons(_styles.walletButtons ?? true);
          setBgColor(_styles.bgColor ?? BG_COLORS[0].color);
          setLineIcons(_styles.lineIcons ?? false);
          setLightMode(_styles.lightMode ?? BG_COLORS[0].lightMode);
          setButtonBgColor(_styles.buttonBgColor ?? BUTTON_BG_COLORS[1]);
          setShowDomain(_styles.showDomain ?? true);
          setShowSkills(_styles.showSkills ?? true);
          setShowScore(_styles.showScore ?? true);
          setScoreType(_styles.scoreType ?? "direct");
          setShowSocialProfiles(_styles.socialProfiles ?? true);
          setHeaderMode(_styles.headerMode);
          setHeaderColor(_styles.headerColor ?? "#ffffff11");
          setRound(_styles.round ?? BUTTON_ROUNDS[1]);
          setVariant(_styles.variant ?? BUTTON_VARIANTS[3]);
          setFont(_styles.font ?? FONTS[0]);
          //setIsStyled(res.data?.styles?.isStyled ?? false);
          // setIsLoading(false);
          // setIsLoaded(true);
          setIsLoading(false);
          setIsLoaded(true);
        } catch (error: any) {
          // console.log('error fetching nft', error);
          // console.log("retries : " + retries)
          if (
            error.code === "ERR_NETWORK" ||
            error.code === "ERR_BAD_REQUEST"
          ) {
            // console.log("retries : " + retries)
            if (retries < 5) {
              setRetries((r) => r + 1);
              let currentIndex = IPFS_URLS.indexOf(ipfsGateway);
              let newIndex =
                currentIndex === IPFS_URLS.length - 1 ? 0 : currentIndex + 1;
              setIpfsGateway(IPFS_URLS[newIndex]);
              toast({
                title: "changing ipfs gateway",
                description:
                  "There was a problem fetching data from ipfs, changing the ipfs gateway to resolve the problem",
                isClosable: true,
                duration: 3000,
                status: "warning",
              });
              //await sleep(4000);
              //getProfileJson();
            } else {
              toast({
                title: "network error",
                description:
                  "There was a problem fetching data from ipfs, please check your network and retry",
                isClosable: true,
                duration: 5000,
                status: "warning",
              });
              setIsLoading(false);
              setError(error.message + " please try again");
              console.log(error);
            }
          } else {
            setIsLoading(false);
            console.log(error);
            setError(error.message + " please try again");
            //router.reload();
          }
        }
      }
    }
    getProfileJson();
  }, [connectedAccount, isConnected, network, nftContract, domainName]);

  return (
    <>
      <Head>
        <title>
          {`${name && !isLoading ? name : SITE_TITLE} | ${
            json && !isLoading && bio !== "" ? bio : SITE_DESCRIPTION
          }`}
        </title>
        <meta
          name="description"
          content={`${json && !isLoading ? name : SITE_TITLE} | ${
            json && !isLoading && bio !== "" ? bio : SITE_DESCRIPTION
          }`}
        />
        <link
          rel="icon"
          href={
            json && !isLoading && json.avatar !== "" ? json.avatar : "/logo.svg"
          }
        />
      </Head>

      {isConnected ? (
        <Box width="100%" bg={colorMode === "dark" ? "var(--dark)" : "white"}>
          <Container
            as="main"
            maxW="full"
            display="grid"
            key={"name-base-tree-main"}
            placeContent={[
              "center",
              "center",
              "center",
              "center",
              "start",
              "start",
            ]}
            placeItems={["start"]}
            h="100vh"
          >
            {error ? (
              <Center my={20} gap={6} flexDirection={"column"} w={"100%"}>
                <Text>{error}</Text>
                <ConnectWalletButton />
              </Center>
            ) : (
              <Flex w={"100%"}>
                {!isLoading && json ? (
                  <Flex
                    gap={[4, 4, 4, 4, 6]}
                    justify={"space-between"}
                    w={"100%"}
                  >
                    <Flex
                      my={4}
                      direction={"column"}
                      gap={2}
                      borderRadius={12}
                      width={[
                        "100vw",
                        "100vw",
                        "xl",
                        "2xl",
                        mobileView ? "2xl" : "xl",
                        "3xl",
                      ]}
                      backgroundColor={
                        colorMode === "light" ? "white" : "blackAlpha.600"
                      }
                      justify={"space-between"}
                      h={notMobileH ? "96vh" : "96vh"}
                      p={3}
                    >
                      <Stack>
                        <ManageHeader />
                        <Flex
                          direction={"column"}
                          maxHeight={notMobileH ? "77vh" : "72vh"}
                          overflow={"auto"}
                          w={"100%"}
                          className="noscroll"
                          gap={4}
                          rounded={"lg"}
                        >
                          {/* <ProfileCompletion /> */}

                          {/* <BtcAddressInput />
                        <EthAddressInput /> */}
                          {/* {account && json && <div>
                              <ChatUIProvider theme={darkChatTheme}>
                                <ChatView
                                  chatId="0xBFd210db795A9Ac48D0C3be2a74232BE44144E84"
                                  limit={10}
                                  isConnected={true}
                                  verificationFailModalPosition={
                                    "RELATIVE"
                                  }
                                />
                              </ChatUIProvider>
                            </div>} */}
                          <AccordionWrapper
                            title="Profile Info"
                            icon="RiProfileLine"
                          >
                            <>
                              <TitleInput />
                              <EditAvatar />
                              <CropAvatar />
                              <BioTextInput />
                              <ManageSkills />
                            </>
                          </AccordionWrapper>

                          {/* <ManageSubnames /> */}
                          {/* <ManageWallets json={json} /> */}
                          <ManageLinks json={json} />
                          <ManageSocials json={json} />
                          <AccordionWrapper title="Styles" icon="RiPaletteLine">
                            <ManageStylesBox />
                          </AccordionWrapper>

                          <AccordionWrapper title="Layout" icon="RiLayoutLine">
                            <ManageLayoutBox />
                          </AccordionWrapper>

                          <ManageVerify />
                        </Flex>
                      </Stack>
                      <Flex gap={2} justify={"stretch"}>
                        <AddModal type={"square"} />
                        {!isLoading && json && (
                          <PreviewModal
                            json={getJson()}
                            onSave={saveProfile}
                          />
                        )}

                        <DarkMode>
                          <Button
                            gap={2}
                            borderRadius={12}
                            colorScheme="gray"
                            flexDirection={"column"}
                            w={"100%"}
                            className="save"
                            height="72px"
                            isLoading={isSaving || isConfirming}
                            isDisabled={isLoading || isSaving || isConfirming}
                            loadingText={
                              isSaving
                                ? "Saving..."
                                : isConfirming
                                ? "Confirming..."
                                : ""
                            }
                            onClick={saveProfile}
                          >
                            <LinkIcon type="RiSave2Line" />
                            Save
                          </Button>
                        </DarkMode>
                      </Flex>
                    </Flex>
                    {isLoaded && json && desktop && (
                      <Flex my={4} position={"fixed"} top={0} right={8}>
                        <Center
                          rounded={"2xl"}
                          w={"90%"}
                          borderRadius={0}
                          px={"5%"}
                          zIndex={10}
                          top={6}
                          right={6}
                          backgroundColor={"auto"}
                          backdropFilter="auto"
                          backdropBlur={"8px"}
                          position={"absolute"}
                          py={2}
                          gap={3}
                          h={"60px"}
                          transition={'"all 1s ease"'}
                          alignItems={"center"}
                          p={2}
                        >
                          <ButtonGroup isAttached>
                            <Tooltip
                              borderRadius={4}
                              label={
                                <Text p={2}>
                                  {hasCopied ? "Copied" : "Copy"} Basetree URL
                                </Text>
                              }
                              color="white"
                              bgColor={"black"}
                              hasArrow
                            >
                              <IconButton
                                onClick={onCopy}
                                roundedRight={0}
                                variant="outline"
                                aria-label={`copy-${name}-address`}
                              >
                                {hasCopied ? (
                                  <LinkIcon
                                    type="RiCheckDoubleFill"
                                    size={22}
                                  />
                                ) : (
                                  <LinkIcon type="RiFileCopyLine" size={22} />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Button
                              as={NextLink}
                              href={`${SITE_URL}${name.replace(".bst", "")}`}
                              target="_blank"
                              bgColor={"dark.600"}
                              roundedLeft={0}
                              variant={"outline"}
                              gap={2}
                              display={"flex"}
                            >
                              <LinkIcon type="RiExternalLinkLine" size={22} />
                              {"open"}
                            </Button>
                          </ButtonGroup>
                          <ShareButton
                            name={name}
                            url={SITE_URL + name.replace(".bst", "")}
                          />
                          <Tooltip
                            borderRadius={4}
                            label={
                              <Text p={2}>
                                {mobileView ? "Desktop View" : "Mobile View"}
                              </Text>
                            }
                            color="white"
                            bgColor={"black"}
                            hasArrow
                          >
                            <Button
                              gap={2}
                              variant={"outline"}
                              onClick={() => {
                                setMobileView(!mobileView);
                              }}
                            >
                              {mobileView ? (
                                <LinkIcon type="RiComputerLine" size={22} />
                              ) : (
                                <LinkIcon type="RiSmartphoneLine" size={22} />
                              )}
                            </Button>
                          </Tooltip>
                        </Center>
                        <DeviceFrameset
                          device={"iPhone 5s"}
                          color={colorMode === "dark" ? "black" : "silver"}
                          width={mobileView ? 410 : 620}
                          // @ts-ignore: Unreachable code error
                          height={"84vh"}
                        >
                          <Preview json={getJson()} />
                        </DeviceFrameset>
                      </Flex>
                    )}
                  </Flex>
                ) : (
                  <Center w={"96%"} minH="94vh" position={"absolute"}>
                    <Spinner size="lg" />
                  </Center>
                )}
              </Flex>
            )}
          </Container>
        </Box>
      ) : (
        <Center my={8} flexDirection="column" minH="100vh">
          <Text my={4}>Please Connect Your Wallet</Text>
          <ConnectWalletButton />
        </Center>
      )}
    </>
  );
};

export default ManagePage;
