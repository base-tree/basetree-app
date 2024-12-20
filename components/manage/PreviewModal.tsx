import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Stack,
  HStack,
  useClipboard,
  Tooltip,
  IconButton,
  useDisclosure,
  Text,
  Flex,
  useMediaQuery,
  Center,
  useColorMode,
  Box,
  Link,
  SimpleGrid,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Menu,
  MenuButton,
  MenuList,
  Switch,
  ButtonGroup,
  LightMode,
  DarkMode,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { Avatar, Socials, ProfileSkeleton, Wallets } from "components/Profile";
import Links from "components/Profile/Links";
import {
  RiFileCopyLine,
  RiCheckDoubleFill,
  RiCloseLine,
  RiUpload2Line,
  RiMessage3Line,
  RiComputerLine,
  RiSmartphoneLine,
} from "react-icons/ri";
import { MdOutlineVisibility } from "react-icons/md";
import {
  avatarShapeAtom,
  bgColorAtom,
  colorModeAtom,
  enableDonationsAtom,
  enablePaymentsAtom,
  fontAtom,
  horizontalSocialAtom,
  horizontalWalletsAtom,
  isStyledAtom,
  lightModeAtom,
  showAllNftsAtom,
  socialButtonsAtom,
  useLineIconsAtom,
  variantAtom,
  walletButtonsAtom,
} from "core/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import BgPicker from "components/manage/BgPicker";
import NftBgPicker from "components/manage/NftBgPicker";
import SettingsButton from "components/manage/SettingButton";
import {
  ButtonColorPicker,
  ButtonRoundPicker,
  ButtonVarianticker,
} from "components/manage";
import FontPicker from "components/manage/FontPicker";
import { getIconInButtonColor } from "core/utils";
import AvatarShapePicker from "components/manage/AvatarShapePicker";
import { LinkIcon } from "components/logos";
import Preview from "components/Profile/Preview";
import ManageStylesBox from "./ManageStylesBox";
import ManageLayoutBox from "./ManageLayoutBox";

interface Attribute {
  trait_type: string;
  value: string;
}

interface Props {
  json: any;
  onSave: Function;
}

const PreviewModal = ({ json, onSave }: Props) => {
  const { t } = useTranslate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const [useLineIcons, setUseLineIcons] = useAtom(useLineIconsAtom);
  const [horizontalSocial, setHorizontalSocial] = useAtom(horizontalSocialAtom);
  //const [horizontalWallet, setHorizontalWallet] = useAtom(horizontalWalletsAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const bgColor = useAtomValue(bgColorAtom);
  const setIsStyled = useSetAtom(isStyledAtom);
  const avatarShape = useAtomValue(avatarShapeAtom);
  const font = useAtomValue(fontAtom);
  const [showAllNfts, setShowAllNfts] = useAtom(showAllNftsAtom);
  const [donations, setDonations] = useAtom(enableDonationsAtom);
  const [payments, setPayments] = useAtom(enablePaymentsAtom);
  const lightMode = json.lightMode;
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    // console.log(json)
    if (isOpen) {
      if (lightMode === true && colorMode === "dark") {
        toggleColorMode();
        // console.log('toggledColor');
      }

      if (lightMode === false && colorMode === "light") {
        toggleColorMode();
        // console.log('toggledColor');
      }
      setIsStyled(true);
    } else {
      if (colorMode !== colorM) {
        toggleColorMode();
      }
    }
  }, [isOpen, lightMode]);

  return (
    <>
      <DarkMode>
        <Button
          gap={2}
          borderRadius={12}
          onClick={onOpen}
          className={notMobile ? "designDesktop" : "design"}
          colorScheme={"gray"}
          color={'white'}
          w={"100%"}
          flexDirection={"column"}
          height="72px"
        >
          <LinkIcon type="RiEyeLine" size="28" />
          Preview
        </Button>
      </DarkMode>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={mobileView ? "md" : "fullscreen"}
        scrollBehavior="outside"
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.800"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent>
          <ModalBody
            p={0}
            mt={notMobile ? 10 : 0}
            mb={!notMobile ? 10 : 0}
            w={"100%"}
          >
            <>
              <Preview
                json={json}
                key={`preview-modal-${json.name}`}
                w={mobileView ? "md" : ["sm", "sm", "lg", "lg", "xl", "2xl"]}
              />
              <Flex
                gap={2}
                position={"fixed"}
                justifyContent={"space-between"}
                width={"100%"}
                display={"flex"}
                zIndex={1000}
                top={notMobile ? 0 : "inherit"}
                bottom={!notMobile ? 0 : "inherit"}
                left={0}
                p={3}
                backgroundColor={"blackAlpha.600"}
                backdropFilter="blur(12px)"
              >
                <ButtonGroup isAttached={!notMobile}>
                  <Menu>
                    <MenuButton as={Button}>Styles</MenuButton>
                    <MenuList
                      p={3}
                      width={"360px"}
                      maxH={"90vh"}
                      overflow={"auto"}
                      bg={
                        colorMode === "light"
                          ? "var(--lightGrey)"
                          : "var(--dark)"
                      }
                    >
                      <ManageStylesBox />
                    </MenuList>
                  </Menu>
                  <Menu>
                    <MenuButton as={Button} gap={2}>
                      Layout
                    </MenuButton>
                    <MenuList
                      p={3}
                      width={"360px"}
                      borderRadius={12}
                      bg={
                        colorMode === "light"
                          ? "var(--lightGrey)"
                          : "var(--dark)"
                      }
                    >
                      <ManageLayoutBox />
                    </MenuList>
                  </Menu>

                  {/* <Menu>
                      <MenuButton as={Button}>options</MenuButton>
                      <MenuList
                        py={0}
                        width={'300px'}
                        borderRadius={12}
                        bg={colorMode === 'light' ? 'var(--lightGrey)' : 'var(--dark)'}>
                        <SettingsButton
                          title="NFT Gallery"
                          value={showAllNfts}
                          setValue={setShowAllNfts}
                          top
                        />
                        <SettingsButton
                          title="Enable Donations"
                          value={donations}
                          setValue={setDonations}
                        />
                        <SettingsButton
                          title="Enable Payments"
                          value={payments}
                          setValue={setPayments}
                          bottom
                        />
                      </MenuList>
                    </Menu> */}
                </ButtonGroup>
                <Flex gap={2}>
                  {notMobile && (
                    <Tooltip
                      borderRadius={4}
                      label={
                        <Text p={2}>
                          {mobileView ? "Desktop View" : "Mobile View"}
                        </Text>
                      }
                      hasArrow
                      color="white"
                      bgColor={"black"}
                    >
                      <IconButton
                        aria-label="mobile-desktop-view"
                        onClick={() => {
                          setMobileView(!mobileView);
                        }}
                      >
                        {mobileView ? <RiComputerLine /> : <RiSmartphoneLine />}
                      </IconButton>
                    </Tooltip>
                  )}
                  <Button
                    gap={2}
                    onClick={() => {
                      onClose();
                      onSave();
                    }}
                  >
                    <LinkIcon type="RiUploadLine" size="24" />
                    Save
                  </Button>
                  <IconButton aria-label="close-design-modal" onClick={onClose}>
                    <RiCloseLine />
                  </IconButton>
                </Flex>
              </Flex>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewModal;
