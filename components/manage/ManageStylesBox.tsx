import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import BgPicker from "./BgPicker";
import ButtonColorPicker from "./ButtonColorPicker";
import ButtonRoundPicker from "./ButtonRoundPicker";
import ButtonVarianticker from "./ButtonVariantPicker";
import AvatarShapePicker from "./AvatarShapePicker";
import FontPicker from "./FontPicker";
import SelectColor from "./SelectColor";
import { useAtom, useSetAtom } from "jotai";
import { bgColorAtom, headerColorAtom, lightModeAtom } from "@/core/atoms";
import { checkGradientBrightness } from "@/core/utils";
import SettingsButton from "./SettingButton";

export default function ManageStylesBox() {
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const [headerColor, setHeaderColor] = useAtom(headerColorAtom);

  const setBg = (color: string) => {
    setBgColor(color);
    if (checkGradientBrightness(color) === "light") {
      setLightMode(true);
    } else if (checkGradientBrightness(color) === "dark") {
      setLightMode(false);
    }
  };

  return (
    <Box>
      <SelectColor
        title="Background Color"
        withTitle
        top
        value={bgColor}
        defaultMode="gradient"
        setValue={setBg}
      />
      <SelectColor
        title="Header Color"
        withTitle
        value={headerColor}
        setValue={setHeaderColor}
      />
      <SettingsButton
        title="Light Mode"
        value={lightMode}
        setValue={setLightMode}
      />
      {/* <NftBgPicker /> */}
      <ButtonColorPicker />
      <ButtonRoundPicker />
      <ButtonVarianticker />
      <FontPicker />
    </Box>
  );
}
