"use client";
import {
  useMediaQuery,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  GridItem,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import NextLink from "next/link";
import { openModalAtom } from "core/atoms";
import { useAtom, useSetAtom } from "jotai";
import { motion } from "framer-motion";
import { LinkIcon, Logo, LogoIcon } from "components/logos";
import DomainName from "components/features/DomainName";
import AccountAddress from "components/features/AccountAddress";
import AnimateOnScroll from "components/animate/AnimateOnScroll";
import Preview from "../Profile/Preview";
import { TEMPLATES } from "@/core/utils/templates";

export default function TemplatesSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  const [small] = useMediaQuery("(min-width: 580px)");
  const [_open, _setOpen] = useAtom(openModalAtom);

  return (
    <motion.div key={"templates"}>
      <Container
        maxW="container.lg"
        display="grid"
        placeContent="center"
        placeItems="center"
        id="templates"
        px={[2,4,8]}
        py={20}
        minH="100vh"
      >
        <Center flexDir={"column"} gap={8}>
          <AnimateOnScroll delay={0.1}>
            <Heading
              as={"h2"}
              fontWeight="bold"
              fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
              textAlign={["center", "center", "center"]}
            >
              {t("Basetree Templates")}
            </Heading>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <Heading
              as={"h3"}
              fontWeight="bold"
              fontSize={["4xl", "4xl"]}
              textAlign={["center", "center", "center"]}
            >
              {t("Choose from Ready-Made Templates")}
            </Heading>
          </AnimateOnScroll>
        </Center>
        <SimpleGrid columns={[1, 2]} gap={10} py={16}>
          <GridItem>
            <Preview json={TEMPLATES[0]} isStatic />
          </GridItem>
          <GridItem>
            <Preview json={TEMPLATES[1]} isStatic />
          </GridItem>
          {/* <GridItem>
            <Preview json={TEMPLATES[2]} isStatic />
          </GridItem>
          <GridItem>
            <Preview json={TEMPLATES[3]} isStatic />
          </GridItem> */}
        </SimpleGrid>
      </Container>
    </motion.div>
  );
}
