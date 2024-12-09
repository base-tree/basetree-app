import {
  Button,
  useColorMode,
  Text,
  Link as ChakraLink,
  Flex,
  useMediaQuery,
  Box,
  Heading,
  Stack,
  Tooltip,
  IconButton,
  Center,
} from "@chakra-ui/react";
import {
  avatarAtom,
  avatarShapeAtom,
  avatarSizeAtom,
  buttonBgColorAtom,
  fontAtom,
  headerColorAtom,
  headerModeAtom,
  lightModeAtom,
  nameAtom,
  passportAtom,
  roundAtom,
  showDomainAtom,
  subtitleAtom,
  titleAtom,
  variantAtom,
} from "core/atoms";
import { getColor, getColorSchemeName, withHttps } from "core/utils";
import { AVAILABLE_LINKS } from "core/utils/constants";
import { useAtomValue } from "jotai";
import { Styles, TalentPassport } from "types";
import AnimateOnScroll from "../animate/AnimateOnScroll";
import Avatar from "./Avatar";
import { LinkIcon } from "../logos";

interface Props {
  _title?: string;
  _subtitle?: string;
  _avatar?: string;
  _avatarShape?: string;
  _avatarSize?: string;
  _username?: string;
  _lightMode?: boolean;
  _showDomain?: boolean;
  _headerMode?: boolean;
  _headerColor?: string;
  _font?: string;
  _styles?: any;
  _passport?: any;
}
export default function ProfileInfo({
  _title,
  _subtitle,
  _avatar,
  _avatarShape,
  _avatarSize,
  _username,
  _lightMode,
  _showDomain,
  _headerMode,
  _headerColor,
  _font,
  _styles,
  _passport,
}: Props) {
  const { colorMode } = useColorMode();
  const headerMode =
    _headerMode ?? _styles ? _styles?.headerMode : useAtomValue(headerModeAtom);
  const headerColor =
    _headerColor ?? _styles
      ? _styles?.headerColor
      : useAtomValue(headerColorAtom);
  const avatar = _avatar ?? useAtomValue(avatarAtom);
  const title = _title ?? useAtomValue(titleAtom);
  const subtitle = _subtitle ?? useAtomValue(subtitleAtom);
  const username = _username ?? useAtomValue(nameAtom);
  const passport: TalentPassport = _passport ?? useAtomValue(passportAtom);
  const showDomain =
    _showDomain ?? _styles ? _styles?.showDomain : useAtomValue(showDomainAtom);
  const avatarShape =
    _avatarShape ?? _styles
      ? _styles?.avatarShape
      : useAtomValue(avatarShapeAtom);
  const avatarSize =
    _avatarSize ?? _styles ? _styles?.avatarSize : useAtomValue(avatarSizeAtom);
  const lightMode =
    _lightMode ?? _styles ? _styles?.lightMode : useAtomValue(lightModeAtom);
  const font = _font ?? _styles ? _styles?.font : useAtomValue(fontAtom);
  const [notMobile] = useMediaQuery("(min-width: 992px)");
  const [notMobileH] = useMediaQuery("(min-height: 896px)");
  const [desktop] = useMediaQuery("(min-width: 1280px)");

  return (
    <Flex
      gap={4}
      align={"center"}
      justify={"center"}
      w={"100%"}
      flexDir={headerMode ? "row" : "column"}
      bg={headerColor}
      rounded={"2xl"}
      mt={4}
      py={headerMode ? 2 : 4}
    >
      <AnimateOnScroll
        delay={0.3}
        x={-200}
        y={0}
        styles={{ overflow: "visible" }}
      >
        <Box
          maxW={
            avatarSize === "sm"
              ? "80px"
              : avatarSize === "md"
              ? "140px"
              : "200px"
          }
        >
          <Avatar
            url={avatar !== '' ? avatar : passport ? passport.passport_profile.image_url : ''}
            key={`avatar-${avatar.slice(-20)}`}
            maxH={
              avatarSize === "sm"
                ? "80px"
                : avatarSize === "md"
                ? "140px"
                : "200px"
            }
            alt={username + "avatar image"}
            shape={avatarShape}
            shadow="none"
            noanimate
          />
        </Box>
      </AnimateOnScroll>

      <Stack
        textAlign={headerMode ? "left" : "center"}
        w={headerMode ? "auto" : "auto"}
        gap={headerMode ? 1 : 3}
        pb={1}
      >
        <AnimateOnScroll
          delay={0.6}
          x={notMobile ? 200 : 0}
          y={notMobile ? 0 : 50}
          styles={{ overflow: "visible", width: "100%" }}
        >
          <Center gap={2} justifyContent={headerMode ? 'start' : 'center'}>
            <Heading
              fontWeight="bold"
              fontSize={headerMode ? "2xl" : "3xl"}
              fontFamily={font}
            >
              {title !== '' ? title : passport ? passport.passport_profile.display_name : ''}
            </Heading>
            {title.length > 0 && passport && (
              <Tooltip
                borderRadius={4}
                label={
                  <Text p={2}>
                    {passport && passport.verified
                      ? "This user has at least one proof of humanity credential"
                      : "This user does NOT have any proof of humanity credential"}
                  </Text>
                }
                color="white"
                bgColor={"black"}
                fontFamily={font}
                placement="top"
                hasArrow
              >
                <IconButton
                  variant="outline"
                  border={0}
                  aria-label={"verified-icon"}
                  key={"is-verified-icon-" + (lightMode ? "light" : "dark")}
                >
                  <LinkIcon
                    type={
                      passport && passport.verified ? "RiVerifiedBadgeFill" : "RiErrorWarningFill"
                    }
                  />
                </IconButton>
              </Tooltip>
            )}
          </Center>
        </AnimateOnScroll>
        <AnimateOnScroll
          delay={0.8}
          x={notMobile ? 200 : 0}
          y={notMobile ? 0 : 50}
          styles={{ overflow: "visible", width: "100%" }}
        >
          <Heading fontWeight="normal" fontSize="xl" fontFamily={font} my={1}>
            {subtitle !== '' ? subtitle : passport ? passport.passport_profile.location : ''}
          </Heading>
        </AnimateOnScroll>
        {showDomain && (
          <AnimateOnScroll
            delay={1}
            x={notMobile ? 200 : 0}
            y={notMobile ? 0 : 50}
            styles={{ overflow: "visible", width: "100%" }}
          >
            <Center gap={2} justifyContent={headerMode ? 'start' : 'center'}>
              <Heading
                fontWeight="bold"
                fontSize="lg"
                fontFamily={font}
                opacity={0.7}
                my={1}
              >
                {username.replace(".bst", "")}
              </Heading>
              {title.length === 0 && (
                <Tooltip
                  borderRadius={4}
                  label={
                    <Text p={2}>
                      {passport && passport.verified
                        ? "This user has at least one proof of humanity credential."
                        : "This user does NOT have any proof of humanity credential."}
                    </Text>
                  }
                  color="white"
                  bgColor={"black"}
                  fontFamily={font}
                  placement="top"
                  hasArrow
                >
                  <IconButton
                    variant="outline"
                    border={0}
                    aria-label={"verified-icon"}
                    key={"is-verified-icon-" + (lightMode ? "light" : "dark")}
                  >
                    <LinkIcon
                      type={
                        passport && passport.verified ? "RiVerifiedBadgeFill" : "RiErrorWarningFill"
                      }
                    />
                  </IconButton>
                </Tooltip>
              )}
            </Center>
          </AnimateOnScroll>
        )}
      </Stack>
    </Flex>
  );
}
