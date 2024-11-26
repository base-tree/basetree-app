import {
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Tooltip,
  useMediaQuery,
  useDisclosure,
  Stack,
  Collapse,
  Accordion,
  AccordionItem,
  AccordionButton,
  Button,
  Flex,
  AccordionIcon,
  AccordionPanel,
  useColorMode,
  InputLeftElement,
} from "@chakra-ui/react";
import { showSkillsAtom, skillsAtom, subtitleAtom, titleAtom } from "core/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
import SelectOption from "./SelectOption";
import { SKILLS } from "@/core/utils/constants";
import SettingsButton from "./SettingButton";
export default function ManageSkills() {
  const [skills, setSkills] = useAtom(skillsAtom);
  const [showSkills, setShowSkills] = useAtom(showSkillsAtom);
  const [notMobile] = useMediaQuery("(min-width: 992px)");
  const { colorMode } = useColorMode();
  console.log(skills);
  return (
    <Accordion
      allowToggle
      allowMultiple={false}
      className="titlee"
      borderRadius={10}
      width={"100%"}
      size="lg"
      backgroundColor={
        colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100"
      }
      display={"flex"}
    >
      <AccordionItem border={0} borderRadius={10} width={"100%"}>
        <AccordionButton
          minWidth={"100%"}
          as={Button}
          size="lg"
          _expanded={{ bgColor: "blackAlpha.50" }}
        >
          <Flex gap={2} alignItems={"center"} textAlign="left" width={"100%"}>
            <Text fontWeight={"bold"} display={"flex"} flex={1} fontSize={"xl"}>
              Skills
            </Text>
            <AccordionIcon />
          </Flex>
        </AccordionButton>

        <AccordionPanel py={4} minWidth="100%">
          <Stack gap={3}>
            <SelectOption
              options={SKILLS.map((skill) => ({ label: skill, value: skill }))}
              value={
                skills.length > 2
                  ? skills
                      .split(",")
                      .map((skill) => ({ label: skill, value: skill }))
                  : []
              }
              isMulti={true}
              setValue={(e: any) => {
                setSkills(e.map((s: any) => s.label).toString());
                console.log(e);
              }}
              title="Skills"
              showTitle={false}
            />

            <SettingsButton
              title="Show Skills"
              value={showSkills}
              setValue={setShowSkills}
              top bottom
            />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
