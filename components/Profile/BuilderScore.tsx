import {
  Button,
  useColorMode,
  Text,
  Link as ChakraLink,
  Flex,
  Stack,
  Box,
  Link,
  Center,
} from "@chakra-ui/react";
import {
  buttonBgColorAtom,
  fontAtom,
  lightModeAtom,
  passportAtom,
  roundAtom,
  scoreTypeAtom,
  variantAtom,
} from "core/atoms";
import {
  getColor,
  getColorSchemeName,
  getTierByScore,
  sortCredentialsByScore,
  withHttps,
} from "core/utils";
import { AVAILABLE_LINKS, TALENT_PROTOCOL_URL } from "core/utils/constants";
import { useAtomValue } from "jotai";
import { Styles } from "types";
import { LinkIcon } from "../logos";
import AccordionWrapper from "../manage/AccordionWrapper";
import Skills from "./Skills";
import ModalWrapper from "../ui/ModalWrapper";

interface Props {
  passport: any;
  styles?: Styles;
  onClick?: any;
}

export default function BuilderScore({ passport, styles }: Props) {
  const { colorMode } = useColorMode();
  const type = styles?.type ?? useAtomValue(scoreTypeAtom);
  const lightMode = useAtomValue(lightModeAtom);
  
  const identityCredentials = sortCredentialsByScore(
    passport.credentials.filter(
      (pass: any) => pass.category === "Identity" && pass.score > 0
    )
  );
  const activityCredentials = sortCredentialsByScore(
    passport.credentials.filter(
      (pass: any) => pass.category === "Activity" && pass.score > 0
    )
  );
  const skillsCredentials = sortCredentialsByScore(
    passport.credentials.filter(
      (pass: any) => pass.category === "Skills" && pass.score > 0
    )
  );

  console.log(identityCredentials)

  //console.log("skills creds : ", skillsCredentials);

  return (
    <Box
      as={type === "modal" ? ModalWrapper : AccordionWrapper}
      title={`${getTierByScore(passport.score)} Builder - ${
        passport.score
      }`}
      icon="talent"
      styles={{ size: "lg" }}
      tooltip={
        <Center gap={3} as={Link} href={TALENT_PROTOCOL_URL} target="_blank" p={3}>
          <LinkIcon type="talent" size={'22px'}/>
          Powered by Talent Protocol
        </Center>
      }
    >
      <Stack gap={4}>
        {skillsCredentials.length > 0 && <AccordionWrapper
          title={
            <Flex w={"100%"} justify={"space-between"}>
              <Text>Skills </Text>
              <Text>{passport.skills_score}</Text>
            </Flex>
          }
          icon="RiUserStarFill"
        >
          <Stack gap={1}>
            {skillsCredentials.map((skillCred: any, ind) => {
              return (
                <Flex
                  fontWeight={"bold"}
                  gap={3}
                  align={"center"}
                  py={2}
                  justify={"space-between"}
                >
                  <Stack gap={0}>
                    <Text>{skillCred.name}</Text>
                    <Text fontSize={"sm"} opacity={0.6}>{skillCred.value}</Text>
                  </Stack>
                  <Text>
                    {skillCred.score}/{skillCred.max_score}
                  </Text>
                </Flex>
              );
            })}
          </Stack>
        </AccordionWrapper>}
        {activityCredentials.length > 0 && <AccordionWrapper
          title={
            <Flex w={"100%"} justify={"space-between"}>
              <Text>Activity </Text>
              <Text>{passport.activity_score}</Text>
            </Flex>
          }
          icon="RiUserVoiceFill"
        >
          <Stack gap={2}>
            {activityCredentials.map((skillCred: any) => {
              return (
                <Flex
                  fontWeight={"bold"}
                  gap={2}
                  align={"center"}
                  justify={"space-between"}
                >
                  <Stack gap={2}>
                    <Text>{skillCred.name}</Text>
                  </Stack>
                  <Text>
                    {skillCred.score}/{skillCred.max_score}
                  </Text>
                </Flex>
              );
            })}
          </Stack>
        </AccordionWrapper>}
        {identityCredentials.length > 0 && 
        <AccordionWrapper
          title={
            <Flex w={"100%"} justify={"space-between"}>
              <Text>Identity </Text>
              <Text>{passport.identity_score}</Text>
            </Flex>
          }
          icon="RiUserFollowFill"
        >
          <Stack gap={2}>
            {identityCredentials.map((skillCred: any) => {
              return (
                <Flex
                  fontWeight={"bold"}
                  gap={2}
                  align={"center"}
                  justify={"space-between"}
                >
                  <Text>{skillCred.name}</Text>
                  <Text>
                    {skillCred.score}/{skillCred.max_score}
                  </Text>
                </Flex>
              );
            })}
          </Stack>
        </AccordionWrapper>}
      </Stack>
    </Box>
  );
}
