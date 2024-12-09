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
import { subtitleAtom, titleAtom } from "core/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";
export default function TitleInput() {
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [notMobile] = useMediaQuery("(min-width: 992px)");
  const { colorMode } = useColorMode();

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
              Title & Subtitle
            </Text>
            <AccordionIcon />
          </Flex>
        </AccordionButton>

        <AccordionPanel py={4} minWidth="100%">
          <Stack gap={3}>
            <Text>Name</Text>
            <Input
              variant={"filled"}
              size={'lg'}
              placeholder={"Enter Display Name"}
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <Text>Location</Text>
            <Input
              variant={"filled"}
              placeholder={"Enter Location"}
              size={'lg'}
              value={subtitle}
              onChange={(e) => setSubtitle(e.currentTarget.value)}
            />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
