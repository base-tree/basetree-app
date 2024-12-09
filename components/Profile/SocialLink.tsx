import { PassportSocial, TalentPassport } from "@/types";
import {
  Button,
  Tooltip,
  IconButton,
  useColorMode,
  Text,
  Link as ChakraLink,
  useMediaQuery,
  Flex,
  Avatar,
  Stack,
  Center,
  Box,
} from "@chakra-ui/react";
import { LinkIcon } from "components/logos";
import {
  buttonBgColorAtom,
  fontAtom,
  lightModeAtom,
  passportAtom,
  roundAtom,
  showSocialProfilesAtom,
  useLineIconsAtom,
  variantAtom,
} from "core/atoms";
import {
  areUrlsEquivalent,
  formatNumberCount,
  getColor,
  getIconColor,
  getIconInButtonColor,
  getUrl,
} from "core/utils";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  url: string;
  onlyIcon: boolean;
  color?: string;
  passport?: TalentPassport;
}

export default function SocialLink({ title, url, onlyIcon, color, passport }: Props) {
  const lightMode = useAtomValue(lightModeAtom);
  const lineMode = useAtomValue(useLineIconsAtom);
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const round = useAtomValue(roundAtom);
  const showSocialProfiles = useAtomValue(showSocialProfilesAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const font = useAtomValue(fontAtom);
  const _passport = passport ? passport : useAtomValue(passportAtom);
  const [hover, setHover] = useState(false);
  const [verified, setVerified] = useState<boolean>();
  const [profile, setProfile] = useState<PassportSocial>();
  const finalUrl = getUrl(title.toLowerCase(), url);

  useEffect(() => {
    if (!_passport) return;
    _passport.passport_socials &&
    _passport.passport_socials.map((pass_social: any) => {
        if (pass_social.source === title.toLowerCase()) {
          if (
            areUrlsEquivalent(
              pass_social.profile_url.toLowerCase(),
              finalUrl.toLowerCase()
            )
          ) {
            setVerified(true);
            setProfile(pass_social);
          } else {
            setVerified(false);
          }
        }
      });
  }, [_passport]);

  const getTooltip = () => {
    if (profile && showSocialProfiles && profile.follower_count) {
      return (
        <Flex p={6} gap={6} w={'100%'} flexDir={'column'}>
          <Flex gap={2} align={'center'}>
          <LinkIcon type="RiVerifiedBadgeFill" />
          <Stack gap={1}>
          <Text fontWeight={'bold'} fontSize={'lg'}>{url}</Text>
          {/* <Text>{profile.profile_bio}</Text> */}
          </Stack>
          </Flex>
          <Center gap={6}>
          <Stack>
            <Text fontSize={'2xl'} fontWeight={'bold'}>{formatNumberCount(profile.follower_count)}</Text>
            <Text>Followers</Text>
          </Stack>
          <Stack>
            <Text fontSize={'2xl'} fontWeight={'bold'}>{formatNumberCount(profile.following_count)}</Text>
            <Text>Followings</Text>
          </Stack>
          </Center>
        </Flex>
      );
    } else {
      return (
        <Flex align={"center"} p={2} gap={2}>
          <Text>{title}</Text>
          {verified && <LinkIcon type="RiVerifiedBadgeFill" />}
        </Flex>
      );
    }
  };

  return (
    <>
      {onlyIcon ? (
        <ChakraLink
          href={finalUrl}
          target="_blank"
          id={`Base-domains-${title}-link`}
        >
          <Tooltip
            borderRadius={4}
            label={getTooltip()}
            color="white"
            bgColor={"black"}
            fontFamily={font}
            placement="top"
            hasArrow
          >
            <IconButton
              variant="outline"
              border={0}
              aria-label={title + "-link"}
              key={title + "-link" + (lightMode ? "light" : "dark")}
            >
              <LinkIcon
                line={lineMode ?? false}
                type={title.toLowerCase()}
                color={color ? color : getIconColor(lightMode)}
              />
            </IconButton>
          </Tooltip>
        </ChakraLink>
      ) : (
        <ChakraLink
          href={finalUrl}
          target="_blank"
          id={`Base-domains-${title}-link`}
          _hover={{ textDecoration: "none" }}
        >
          <Button
            size={"lg"}
            fontSize={"lg"}
            height={"64px"}
            display={"flex"}
            gap={2}
            rounded={round}
            variant={variant}
            colorScheme={buttonBg}
            color={
              variant === "fill" && hover
                ? getColor("pop", buttonBg, lightMode)
                : getColor(variant, buttonBg, lightMode)
            }
            onMouseEnter={() => setHover(true)}
            onMouseMove={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            px={3}
            w={"100%"}
          >
            <LinkIcon
              line={lineMode ?? false}
              type={title.toLowerCase()}
              color={
                variant === "fill" && hover
                  ? getIconInButtonColor("pop", buttonBg, lightMode)
                  : getIconInButtonColor(variant, buttonBg, lightMode)
              }
              size={"36px"}
            />
            <Center
              onMouseEnter={() => setHover(true)}
              w={"100%"}
              gap={2}
              textAlign={"center"}
              color={
                variant === "fill" && hover
                  ? getColor("pop", buttonBg, lightMode)
                  : getColor(variant, buttonBg, lightMode)
              }
            >
              {title}
              {/* {verified && <LinkIcon type="RiVerifiedBadgeFill" size={'22px'} />} */}
            </Center>
            <LinkIcon type="RiExternalLinkLine" size={"22px"} opacity={0.5} />
          </Button>
        </ChakraLink>
      )}
    </>
  );
}
