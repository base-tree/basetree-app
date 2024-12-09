import {
  Button,
  useColorMode,
  Text,
  Link as ChakraLink,
  Center,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import {
  buttonBgColorAtom,
  fontAtom,
  lightModeAtom,
  roundAtom,
  variantAtom,
} from "core/atoms";
import { AVAILABLE_LINKS, SOCIAL_URLS } from "core/utils/constants";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Styles } from "types";
import { Tweet } from "react-twitter-widgets";
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";
import "react-farcaster-embed/dist/styles.css";
import { checkGradientBrightness } from "@/core/utils";

interface Props {
  title?: string;
  icon?: JSX.Element;
  type: string;
  url: string;
  styles?: Styles;
}
export default function Cast({ title, icon, url, styles, type }: Props) {
  const { colorMode } = useColorMode();
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? "";
  const round = styles?.round ?? useAtomValue(roundAtom);
  const [isLoading, setIsLoading] = useState(true);
  const lightMode = useAtomValue(lightModeAtom);
  const bg = styles?.bg ? styles?.bg : lightMode ? '#ffffff' : '#232323';
  const light = checkGradientBrightness(bg) === 'light';
  return (
    <Center w={"100%"}>
      <Box
        w={"100%"}
        color={light ? '#232323' : '#ffffff'}
        borderRadius={round === "none" ? 0 : round === "md" ? 8 : 16}
        bg={bg}
        key={`cast-box-${styles?.bg}`}
        placeContent={'center'}
        minHeight={ styles?.height ? `${Number(styles.height) * 10}px` : 'auto'}
      >
        {url.includes(SOCIAL_URLS['farcaster']) && <FarcasterEmbed
          url={url}
          options={{silentError : true}}
        />}
       
      </Box>
    </Center>
  );
}
