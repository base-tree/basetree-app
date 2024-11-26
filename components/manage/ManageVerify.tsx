import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import SettingsButton from "./SettingButton";
import { useAtom, useAtomValue } from "jotai";
import {
  passportAtom,
  scoreTypeAtom,
  showDomainAtom,
  showScoreAtom,
  showSocialProfilesAtom,
  socialsArrayAtom,
} from "core/atoms";
import { capFirstLetter } from "@/core/utils";
import SelectOption from "./SelectOption";
import SelectOptionButton from "./SelectOptionButton";
import { LinkIcon } from "../logos";
import AccordionWrapper from "./AccordionWrapper";
import {
  getSocialUrlScheme,
  SOCIAL_URLS,
  TALENT_PASSPORT_URL,
  TALENT_PASSPORTS_API,
} from "@/core/utils/constants";
import { ObjectItem } from "@/types";

export default function ManageVerify() {
  const passport = useAtomValue(passportAtom);
  const [showScore, setShowScore] = useAtom(showScoreAtom);
  const [showSocialProfiles, setShowSocialProfiles] = useAtom(showSocialProfilesAtom);
  const [scoreType, setScoreType] = useAtom(scoreTypeAtom);
  const [socialsArray, setSocialsArray] = useAtom(socialsArrayAtom);

  // const importSocialLinks = () => {
  //   console.log(socialsArray);
     console.log(passport.passport_socials);
  //   let _newSocials: ObjectItem[] = [];
  //   passport.passport_socials.map((social: any, ind: number) => {
  //     if (getSocialUrlScheme(social.source) !== "com.basename") {
  //       _newSocials.push({
  //         key: social.source,
  //         value: social.profile_url.replace(SOCIAL_URLS[social.source], ""),
  //       });
  //     }
  //   });

  //   setSocialsArray(_newSocials);
  //   console.log(_newSocials);
  // };

  return (
    <AccordionWrapper title="Verify Identity" icon="RiVerifiedBadgeLine">
      <Stack gap={4}>
        <Flex gap={2} align={"center"}>
          <LinkIcon type="talent" />{" "}
          <Text w={"100%"}>Talent Passport Credentials </Text>
          <Tooltip
            borderRadius={4}
            label={
              <Flex align={"center"} p={2} gap={2}>
                <Text>{"Goto Talent Passport"}</Text>
              </Flex>
            }
            color="white"
            bgColor={"black"}
            placement="top"
            hasArrow
          >
            <IconButton
              variant="outline"
              border={0}
              as={Link}
              href={TALENT_PASSPORT_URL}
              target="_blank"
              aria-label={"talent-protocol-link"}
              key={"talent-protocol-link"}
            >
              <LinkIcon type="RiExternalLinkLine" />
            </IconButton>
          </Tooltip>
        </Flex>
        {passport ? (
          <Center gap={2} py={8} flexDir={"column"}>
            <Avatar src={passport.passport_profile.image_url} size={"md"} />
            <Text>{passport.passport_profile.display_name}</Text>
            <Text>Talent Passport ID #{passport.passport_id}</Text>
            <Text>Builder Score : {passport.score}</Text>
          </Center>
        ) : (
          "No Passport Found"
        )}

        <SettingsButton
          title="Show Builder Score"
          value={showScore}
          top
          bottom
          setValue={setShowScore}
        />

        <SettingsButton
          title="Show Social Profiles"
          value={showSocialProfiles}
          top
          bottom
          setValue={setShowSocialProfiles}
        />

        <Box pl={2}>
          <SelectOptionButton
            options={["modal", "direct"]}
            title="Layout"
            value={scoreType}
            setValue={setScoreType}
          />
        </Box>

        {/* <Button onClick={importSocialLinks}>
          Import Verified Social Media Links
        </Button> */}
      </Stack>
    </AccordionWrapper>
  );
}
