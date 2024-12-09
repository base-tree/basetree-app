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
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  buttonBgColorAtom,
  isConnectedAtom,
  lightModeAtom,
  openEmbedModalAtom,
  roundAtom,
  variantAtom,
} from "core/atoms";
import IframeResizer from "@iframe-resizer/react";
import { Styles } from "types";
import Link from "./Link";
import SimpleLink from "./SimpleLink";
import Frame from "./Frame";

interface Props {
  title: string;
  type: string;
  url: string;
  icon?: JSX.Element;
  styles?: Styles;
}

export default function FarcasterFrame({
  title,
  url,
  type,
  styles,
  icon,
}: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const bgColor = styles?.bg;
  const ref = React.useRef();
  const color = styles?.color;
  const embedType = styles?.type;
  const [height, setHeight] = useState<string>("340px"); //styles?.height ? Number(styles.height) * 10 : undefined;
  const [notMobile] = useMediaQuery("(min-width: 992px)");

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
              key={`embed-box-${title.replaceAll(" ", "-")}-${embedType}`}
            >
              <IframeResizer
                src={`https://i.frames.fun/embed?dangerousSkipSigning=false&frameUrl=${url}`}
                license="GPLv3"
                title={title}
                scrolling="omit"
                //ref={ref}
                height={notMobile ? '360px' : '300px'}
                style={{
                  borderRadius: round === "none" ? 0 : round === "md" ? 8 : 16,
                  backgroundColor: lightMode ? "white" : "black",
                  width: "340px",
                  minWidth: "100%",
                }}
                checkOrigin={true}
                inPageLinks
                tolerance={20}
                seamless
                onResized={(e)=> console.log(e)}
                onLoad={(e)=> console.log(e)}
                
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
              <IframeResizer
                src={`https://i.frames.fun/embed?dangerousSkipSigning=false&frameUrl=${url}`}
                license="GPLv3"
                title={title}
                scrolling="omit"
                style={{
                  borderRadius: round === "none" ? 0 : round === "md" ? 8 : 16,
                  backgroundColor: lightMode ? "white" : "black",
                  width: "1px",
                  minWidth: "100%",
                  minHeight: notMobile ? "425px" : "300px",
                }}
                inPageLinks
              />
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
