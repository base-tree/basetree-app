import React, { useEffect } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  Link,
  Stack,
  Text,
  keyframes,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { BASENAMES_URL, SITE_URL, TALENT_PROTOCOL_URL } from "@/core/utils/constants";

export const FAQ = () => {
  const [notMobile] = useMediaQuery("(min-width: 992px)");
  const { colorMode } = useColorMode();

  return (
    <Flex w={"100%"} maxW={"container.md"} fontSize={"lg"}>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderRadius={6}
        width={"100%"}
        border={"0.5px solid #77777777"}
        size="lg"
        backgroundColor={colorMode === "dark" ? "blackAlpha.600" : "white"}
      >
        <AccordionItem border={0} width={"100%"}>
          <AccordionButton
            w={"100%"}
            as={Button}
            variant={"outline"}
            borderBottomRadius={0}
            minW={notMobile ? "container.md" : "100%"}
            size="lg"
            height={"68px"}
            fontSize={["md", "lg", "xl"]}
            justifyContent={"space-between"}
          >
            What is Basetree ?
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            <Text>
              Basetree is a decentralized profile builder that works with Base
              domains (Basenames), allowing you to create personalized pages
              with links, integrations, and more.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border={0} borderRadius={10} width={"100%"}>
          <AccordionButton
            w={"100%"}
            as={Button}
            variant={"outline"}
            borderBottomRadius={0}
            borderTopRadius={0}
            minW={notMobile ? "container.md" : "100%"}
            size="lg"
            height={"68px"}
            fontSize={["md", "lg", "xl"]}
            justifyContent={"space-between"}
          >
            What are Basenames ?
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            <Box>
              <Link
                color={"var(--base00)"}
                href={BASENAMES_URL}
                target="_blank"
              >
                Basenames
              </Link>{" "}
              are domain names on the Base blockchain. Basetree enables you to
              use these domains as personalized profiles.
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={0} borderRadius={10} width={"100%"}>
          <AccordionButton
            w={"100%"}
            as={Button}
            variant={"outline"}
            borderBottomRadius={0}
            borderTopRadius={0}
            minW={notMobile ? "container.md" : "100%"}
            size="lg"
            height={"68px"}
            fontSize={["md", "lg", "xl"]}
            justifyContent={"space-between"}
          >
            How do I view my Basetree?
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            <Box>
              The simplest way to access your Basetree profile is by
              appending your basename to the Basetree URL.
              <br/><br/> For example, if your
              basename is{" "}
              <Link
                color={"var(--base00)"}
                href={`${BASENAMES_URL}/0xsamy.base.eth`}
                target="_blank"
              >
                0xsamy.base.eth
              </Link>{" "}
              , you can access your profile directly at: {" "}
              <Link
                color={"var(--base00)"}
                href={`${SITE_URL}0xsamy.base.eth`}
                target="_blank"
              >
                basetree.xyz/0xsamy.base.eth
              </Link>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={0} borderRadius={10} width={"100%"}>
          <AccordionButton
            w={"100%"}
            as={Button}
            borderBottomRadius={0}
            variant={"outline"}
            borderTopRadius={0}
            minW={notMobile ? "container.md" : "100%"}
            size="lg"
            height={"68px"}
            fontSize={["md", "lg", "xl"]}
            justifyContent={"space-between"}
          >
            Do I need to pay to use Basetree?
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            <Box>
              No, Basetree is completely free for Base domain holders. Owners
              will have to pay for gas for saving or modifying their basetrees.
              ( normal TX cost on Base ~$0.02)
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={0} borderRadius={10} width={"100%"}>
          <AccordionButton
            w={"100%"}
            as={Button}
            variant={"outline"}
            borderBottomRadius={0}
            borderTopRadius={0}
            minW={notMobile ? "container.md" : "100%"}
            size="lg"
            height={"68px"}
            fontSize={["sm", "md", "lg", "xl"]}
            justifyContent={"space-between"}
          >
            How does Talent Protocol integration work ?
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            <Box>
              <Link
                color={"var(--base00)"}
                href={TALENT_PROTOCOL_URL}
                target="_blank"
              >
                Talent Passport
              </Link>{" "}
              verifies your Identity, Activity, Skill credentials and social
              accounts, and you can showcase your builder score directly on your
              Basetree profile.
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={0} borderRadius={10} width={"100%"}>
          <AccordionButton
            w={"100%"}
            as={Button}
            variant={"outline"}
            borderTopRadius={0}
            minW={notMobile ? "container.md" : "100%"}
            size="lg"
            height={"68px"}
            fontSize={["sm", "md", "lg", "xl"]}
            justifyContent={"space-between"}
          >
            Can I use Basetree without a Basename?
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel py={4} minWidth="100%">
            <Box>
              Currently, Basetree is designed to work only with Basenames.
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
