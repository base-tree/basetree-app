import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { LinkIcon, Logo } from "components/logos";
import { chainAtom, colorModeAtom, nameAtom } from "core/atoms";
import { useAtom, useAtomValue } from "jotai";
import { base } from "thirdweb/chains";

export default function ManageHeader() {
  const name = useAtomValue(nameAtom);
  const [notMobile] = useMediaQuery("(min-width: 992px)");
  const chain = useAtomValue(chainAtom);
  const isMainnet = chain === base;
  return (
    <Flex gap={2} justify={"space-between"} align={"center"} mb={2}>
      <NextLink href="/names" passHref>
        <Button fontWeight="bold" p={2} gap={[0, 0, 0, 2]} size={"lg"}>
          <LinkIcon type="RiArrowLeftLine" />
          <Text>{notMobile ? isMainnet ? 'My Basenames' : 'My Pages' : ""}</Text>
        </Button>
      </NextLink>
      {/* <IconButton
        aria-label="theme-mode"
        size={"lg"}
        onClick={() => {
          setColorM(colorMode === "light" ? "dark" : "light");
          toggleColorMode();
        }}
        icon={
          colorMode === "light" ? (
            <LinkIcon type="RiMoonFill" size="20px" />
          ) : (
            <LinkIcon type="RiSunFill" size="20px" />
          )
        }
      /> */}
      <Button fontWeight="bold" variant="ghost" p={2} gap={2} size={"lg"}>
        <Logo />
        <Heading
          bgGradient={useColorModeValue(
            "linear(to-r, var(--base2), var(--blue2))",
            "linear(to-r, var(--base0), var(--blue0))"
          )}
          bgClip="text"
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          {name.replace(".bst","")}
        </Heading>
      </Button>
    </Flex>
  );
}
