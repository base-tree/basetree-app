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
import { Timeline } from "react-twitter-widgets";

interface Props {
  title?: string;
  icon?: JSX.Element;
  url: string;
  styles?: Styles;
}
export default function TwitterTimelineLink({ title, icon, url, styles }: Props) {
  const { colorMode } = useColorMode();
  const round = styles?.round ?? useAtomValue(roundAtom);
  const [isLoading, setIsLoading] = useState(true);
  const lightMode = useAtomValue(lightModeAtom);
  const username = url && url.split("/")[3].split("?")[0];

  return (
    <Center w={"100%"}>
      <Box
        w={"100%"}
        borderRadius={round === "none" ? 0 : round === "md" ? 8 : 16}
        maxW={["default", "550px"]}
      >
        {username && <Timeline
          dataSource={{sourceType: 'profile', screenName: username}}
          onLoad={() => setIsLoading(false)}
          options={{
            theme: lightMode ? "light" : "dark",
            width: "100%",
            height: styles?.size === "sm" ? "300px" : styles?.size === "md" ? "480px" : "720px",
          }}
        />}
        {isLoading && (
          <Skeleton width={"100%"} rounded={"lg"} height={"400px"} />
        )}
      </Box>
    </Center>
  );
}
