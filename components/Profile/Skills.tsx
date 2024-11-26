import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Tag,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Avatar from "./Avatar";
import AvatarSvg from "./AvatarSvg";
import { BG_COLORS_SAMPLE } from "core/utils/constants";
import {
  checkGradientBrightness,
  getColor,
  getColorSchemeName,
} from "core/utils";
import { useAtomValue } from "jotai";
import {
  buttonBgColorAtom,
  lightModeAtom,
  roundAtom,
  variantAtom,
} from "@/core/atoms";
import AnimateScale from "../animate/AnimateScale";

interface Props {
  data: string[];
  color?: string;
}

export default function Skills({ data, color = "#ffffff77" }: Props) {
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const light = useAtomValue(lightModeAtom);

  return (
    <Center rounded={"2xl"} w={"100%"}>
      <Wrap gap={3} align={"center"} justify={"center"}>
        {data.map((item, ind) => {
          return (
            <WrapItem key={`skill-wrap-box-${ind}`}>
              <AnimateScale delay={ind * 0.2 + 0.7}>
                <Button
                  key={`skill-tag-${ind}`}
                  cursor={"default"}
                  color={getColor(
                    variant.includes("border") || variant.includes("outline")
                      ? "outline"
                      : "solid",
                    getColorSchemeName(buttonBg),
                    light
                  )}
                  size={"md"}
                  variant={
                    variant.includes("border") || variant.includes("outline")
                      ? "outline"
                      : "solid"
                  }
                  rounded={"full"}
                  colorScheme={buttonBg}
                >
                  {item}
                </Button>
              </AnimateScale>
            </WrapItem>
          );
        })}
      </Wrap>
    </Center>
  );
}
