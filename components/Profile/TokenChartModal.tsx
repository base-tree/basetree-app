import {
  Button,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AspectRatio,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { lightModeAtom, roundAtom } from "core/atoms";
import { Styles } from "types";
import SimpleLink from "./SimpleLink";
import TVWidget from "../ui/TVWidget";

interface Props {
  title: string;
  type: string;
  content: string;
  icon?: JSX.Element;
  styles?: Styles;
}

export default function TokenChartModal({
  title,
  content,
  type,
  styles,
  icon,
}: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const effect = styles?.effect ?? "price-only";
  const color = styles?.color;
  const embedType = styles?.type;
  const tokenChart = content
    ? JSON.parse(content)
    : { symbols: [], changeMode: "percent-only"};

  return (
    <>
      <Flex
        flexDirection={"column"}
        gap={0}
        w={"100%"}
        rounded={round === "none" ? round : "lg"}
      >
        <Flex justify={"center"} align={"center"}>
          {embedType === "modal" ? (
            <SimpleLink
              title={title}
              styles={styles}
              onClick={onOpen}
              url="#"
              icon={icon}
              type={type}
            />
          ) : (
            <Flex
              gap={4}
              flexDirection="column"
              width={"100%"}
              overflow={"hidden"}
              key={`embed-box-${title.replaceAll(" ", "-")}-${embedType}-${styles?.bg}`}
            >
              <TVWidget
                symbols={tokenChart.symbols.map((symbol: any) => [
                  symbol.value,
                ])}
                changeMode={tokenChart.changeMode}
                key={`direct-token-chart-${tokenChart.symbols.toString().replaceAll(":","-")}-${embedType}-${styles?.bg}`}
                backgroundColor={styles?.bg}
                height={styles?.height ? Number(styles.height) * 10 :
                  styles?.size === "lg"
                    ? "600"
                    : styles?.size === "md"
                    ? "400"
                    : "250"
                }
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={["full", "full", "xl", "2xl", "3xl"]}
      >
        <ModalOverlay
          bg="blackAlpha.700"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent bg={color ? color : "var(--dark1)"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={"center"} alignContent={"center"}>
            <Flex direction="column" gap={2} w={"100%"}>
             {embedType === "modal" && <TVWidget
                symbols={tokenChart.symbols.map((symbol: any) => [
                  symbol.value,
                ])}
                key={`modal-token-chart-${tokenChart.symbols.toString().replaceAll(":","-")}-${embedType}-${styles?.bg}`}
                changeMode={tokenChart.changeMode}
                backgroundColor={styles?.bg}
                height={styles?.height ? Number(styles.height) * 10 :
                  styles?.size === "lg"
                    ? "600"
                    : styles?.size === "md"
                    ? "400"
                    : "250"
                }
              />}
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
