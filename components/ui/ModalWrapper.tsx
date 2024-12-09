import {
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useColorMode,
  useDisclosure,
  Tooltip,
  IconButton,
  Center,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { LinkIcon } from "../logos";
import SimpleLink from "../Profile/SimpleLink";
import {
  getColor,
  getColorSchemeName,
  getIconInButtonColor,
} from "@/core/utils";
import { useAtomValue } from "jotai";
import { Styles } from "@/types";
import {
  buttonBgColorAtom,
  fontAtom,
  lightModeAtom,
  roundAtom,
  variantAtom,
} from "@/core/atoms";

interface Props {
  title: string;
  tooltip?: string | JSX.Element;
  defaultOpen?: boolean;
  icon?: string;
  styles?: Styles;
  children: JSX.Element;
  isProfile?: boolean;
}

export default function ModalWrapper({
  title,
  icon = "RiFullscreenLine",
  styles,
  children,
  tooltip,
  isProfile,
}: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const round = styles?.round ?? useAtomValue(roundAtom);
  const font = styles?.font ?? useAtomValue(fontAtom);
  const variant = styles?.variant ?? useAtomValue(variantAtom);
  const buttonBg = styles?.bg ?? useAtomValue(buttonBgColorAtom);
  const lightMode = isProfile
    ? useAtomValue(lightModeAtom)
    : colorMode === "light";

  const root = document.documentElement;
  // Get the value of the --primary-color CSS variable
  const trackColor =
    getComputedStyle(root)
      .getPropertyValue(
        String(getIconInButtonColor(variant, buttonBg, lightMode)).slice(4, -1)
      )
      .trim() + "44";

  return (
    <>
      <SimpleLink
        title={title}
        styles={{ size: "md" }}
        onClick={onOpen}
        url="#"
        icon={
          icon.includes("%") ? (
            <CircularProgress
              max={100}
              thickness={"14px"}
              isIndeterminate={icon.slice(0, icon.indexOf("%")) === "x"}
              size={"40px"}
              value={Number(icon.slice(0, icon.indexOf("%")))}
              color={getIconInButtonColor(variant, buttonBg, lightMode)}
              trackColor={trackColor}
            >
              <CircularProgressLabel fontWeight={"bold"} fontSize={"sm"}>
                {icon.slice(0, icon.indexOf("%"))}
              </CircularProgressLabel>
            </CircularProgress>
          ) : (
            <LinkIcon
              type={icon}
              color={getColor(variant, getColorSchemeName(buttonBg), lightMode)}
            />
          )
        }
        type={"simple link"}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={["full", "full", "xl", "2xl"]}
      >
        <ModalOverlay
          bg="blackAlpha.700"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent bg={"var(--dark1)"}>
          <ModalHeader display={"flex"} justifyContent={"space-between"}>
            {title}
            <Flex gap={2}>
              <IconButton
                variant="outline"
                border={0}
                aria-label={"close-modal-button"}
                onClick={onClose}
              >
                <LinkIcon type={"RiCloseFill"} />
              </IconButton>
            </Flex>
          </ModalHeader>
          <ModalBody justifyContent={"center"} alignContent={"center"}>
            <Stack gap={4}>{children}</Stack>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            {tooltip && <Center pt={4}> {tooltip}</Center>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
