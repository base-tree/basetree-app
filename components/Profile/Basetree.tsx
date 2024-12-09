import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  useMediaQuery,
  useColorMode,
  Box,
  LightMode,
  DarkMode,
  Center,
  useColorModeValue,
  IconButton,
  Link,
  Button,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { Avatar, Socials, ProfileSkeleton } from "components/Profile";
import Links from "components/Profile/Links";

import {
  avatarAtom,
  avatarShapeAtom,
  bgColorAtom,
  bioAtom,
  colorModeAtom,
  fontAtom,
  headerModeAtom,
  horizontalSocialAtom,
  isStyledAtom,
  lightModeAtom,
  mobileViewAtom,
  nameAtom,
  passportAtom,
  showDomainAtom,
  showOnChainScoreAtom,
  showScoreAtom,
  showSkillsAtom,
  skillsAtom,
  socialButtonsAtom,
  socialsArrayAtom,
  subtitleAtom,
  titleAtom,
  useLineIconsAtom,
  walletButtonsAtom,
} from "core/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Wallets from "./Wallets";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import { RiExternalLinkLine, RiLinksLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import ProfileInfo from "./ProfileInfo";
import Skills from "./Skills";
import BuilderScore from "./BuilderScore";
import AnimateOnScroll from "../animate/AnimateOnScroll";
import BioWithLinks from "./Bio";
import ProfileOnChainScore from "./ProfileOnChainScore";

interface Attribute {
  trait_type: string;
  value: string;
}

interface Props {
  json: any;
  isStatic?: boolean;
  w?: any;
  h?: any;
  styles?: any;
}

const Basetree = ({ json, w, h, isStatic, styles }: Props) => {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const [horizontalSocial, setHorizontalSocial] = useAtom(horizontalSocialAtom);
  //const [horizontalWallet, setHorizontalWallet] = useAtom(horizontalWalletsAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const walletButtons = isStatic
    ? json.styles.walletButtons
    : useAtomValue(walletButtonsAtom);
  const bgColor = isStatic ? json.styles.bgColor : useAtomValue(bgColorAtom);
  const socials = useAtomValue(socialsArrayAtom);
  const font = isStatic ? json.styles.font : useAtomValue(fontAtom);
  const showScore = isStatic
    ? json.styles.showScore
    : useAtomValue(showScoreAtom);
  const showOnChainScore = isStatic
    ? json.styles.showOnChainScore
    : useAtomValue(showOnChainScoreAtom);
  const passport = isStatic ? json.passport : useAtomValue(passportAtom);
  const showSkills = isStatic
    ? json.styles.showSkills
    : useAtomValue(showSkillsAtom);
  const skills = isStatic ? json.skills : useAtomValue(skillsAtom);
  const _bio = isStatic ? json.bio : useAtomValue(bioAtom);
  const bio =
    _bio !== "" ? _bio : passport ? passport.passport_profile.bio : "";
  const lightMode = isStatic
    ? json.styles.lightMode
    : useAtomValue(lightModeAtom);
  const mobileView = useAtomValue(mobileViewAtom);

  //console.log(json);

  // useEffect(() => {
  //   // console.log(json)

  //   if (lightMode === true && colorMode === 'dark') {
  //     toggleColorMode();
  //     // console.log('toggledColor');
  //   }

  //   if (lightMode === false && colorMode === 'light') {
  //     toggleColorMode();
  //     // console.log('toggledColor');
  //   }

  //   setIsStyled(true);
  // }, [lightMode]);

  return (
    <>
      <Flex
        bg={bgColor}
        key={`preview-desktop-${lightMode}`}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        w={"100%"}
        rounded={isStatic ? "2xl" : "none"}
        bgPosition={"center"}
        justify={"center"}
        align={isStatic ? "center" : "auto"}
        minH={isStatic ? (h ? h : "auto") : "100vh"}
        color={lightMode ? "var(--dark1)" : "white"}
        style={styles}
      >
        <Flex my={0}>
          <>
            <Container
              width={w}
              key={`preview-main-${lightMode}`}
              display="flex"
              flexDir={"column"}
              gap={4}
              pb={6}
              fontFamily={font}
            >
              {json && (
                <Flex
                  direction="column"
                  justify={"center"}
                  align={"center"}
                  gap={4}
                  width={"100%"}
                >
                  <Box
                    as={lightMode ? LightMode : DarkMode}
                    key={`preview-desktop-mode-${lightMode}`}
                  >
                    <ProfileInfo
                      _title={isStatic ? json.title : undefined}
                      _subtitle={isStatic ? json.subtitle : undefined}
                      _username={isStatic ? json.name : undefined}
                      _avatar={isStatic ? json.avatar : undefined}
                      _styles={isStatic ? json.styles : undefined}
                      _passport={isStatic ? json.passport : undefined}
                    />

                    {skills && skills.length > 0 && showSkills && (
                      <Skills data={skills.split(",")} />
                    )}

                    {horizontalSocial && (
                      <Socials
                        json={json}
                        onlyIcons
                        color={
                          isStatic
                            ? !lightMode
                              ? "#f5f5f5"
                              : "#121212"
                            : undefined
                        }
                        key={`social-icons-${socials.length}`}
                      />
                    )}

                    {passport && showScore && (
                      <AnimateOnScroll
                        delay={1.5}
                        styles={{ width: "100%", overflow: "visible" }}
                      >
                        <BuilderScore passport={passport} />
                      </AnimateOnScroll>
                    )}

                     {showOnChainScore && <AnimateOnScroll
                        delay={1.6}
                        styles={{ width: "100%", overflow: "visible" }}
                      >
                        <ProfileOnChainScore profileAddress={json.owner} />
                      </AnimateOnScroll>}
                    

                    {/* {walletButtons && (
                      <Wallets
                        json={json}
                        color={
                          !lightMode
                            ? "var(--chakra-colors-gray-100)"
                            : "var(--chakra-colors-gray-800)"
                        }
                        key={`social-icons-${json.name}`}

                      />
                    )} */}

                    <BioWithLinks bio={bio} />

                    <Stack width={"100%"} gap={3}>
                      {/* <ChatUIProvider>
                        <ChatWidget
                          chatId={"0x862cD05C263Ff60a4Ea53db12eaa7548499E07E7"} //chatId or recipient's address
                        />
                        </ChatUIProvider> */}

                      <Links
                        json={json}
                        color={
                          !lightMode
                            ? "var(--chakra-colors-gray-100)"
                            : "var(--chakra-colors-gray-800)"
                        }
                        title={isStatic ? "preview links" : undefined}
                        key={`preview-links-${json.title}`}
                      />

                      {socialButtons && (
                        <Socials
                          json={json}
                          key={`social-buttons-${socials.length}`}
                          title={isStatic ? "preview socials" : undefined}
                        />
                      )}
                    </Stack>
                  </Box>
                </Flex>
              )}
            </Container>
          </>
        </Flex>
      </Flex>
    </>
  );
};

export default Basetree;
