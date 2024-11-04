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
import { AVAILABLE_LINKS } from "core/utils/constants";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Styles } from "types";
import { Tweet } from "react-twitter-widgets";

interface Props {
  title?: string;
  icon?: JSX.Element;
  type: string;
  url: string;
  styles?: Styles;
}
export default function TweetLink({ title, icon, url, styles, type }: Props) {
  const { colorMode } = useColorMode();
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? "";
  const round = styles?.round ?? useAtomValue(roundAtom);
  const [isLoading, setIsLoading] = useState(true);
  const lightMode = useAtomValue(lightModeAtom);

  return (
    <Center w={"100%"}>
      <Box
        w={"100%"}
        borderRadius={round === "none" ? 0 : round === "md" ? 8 : 16}
        maxW={["default", "550px"]}
      >
        <Tweet
          tweetId={String(url.match(reg)?.at(2))}
          onLoad={() => setIsLoading(false)}
          options={{
            theme: styles?.color ? styles.color : lightMode ? "light" : "dark",
            width: "100%",
            height: styles?.size === "sm" ? "300px" : styles?.size === "md" ? "480px" : "720px",
          }}
        />
        {isLoading && (
          <Skeleton width={"100%"} rounded={"lg"} height={styles?.size === "sm" ? "300px" : styles?.size === "md" ? "480px" : "720px"} />
        )}
      </Box>
    </Center>
  );
}
