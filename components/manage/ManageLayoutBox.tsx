import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import SettingsButton from "./SettingButton";
import { useAtom } from "jotai";
import {
  avatarShapeAtom,
  avatarSizeAtom,
  headerModeAtom,
  horizontalSocialAtom,
  lightModeAtom,
  showDomainAtom,
  showScoreAtom,
  showSkillsAtom,
  socialButtonsAtom,
  walletButtonsAtom,
} from "core/atoms";
import { capFirstLetter } from "@/core/utils";
import SelectOption from "./SelectOption";
import SelectOptionButton from "./SelectOptionButton";

export default function ManageLayoutBox() {
  const [showDomain, setShowDomain] = useAtom(showDomainAtom);
  const [headerMode, setHeaderMode] = useAtom(headerModeAtom);
  const [horizontalSocial, setHorizontalSocial] = useAtom(horizontalSocialAtom);
  const [showSkills, setShowSkills] = useAtom(showSkillsAtom);
  const [showScore, setShowScore] = useAtom(showScoreAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
  const [avatarSize, setAvatarSize] = useAtom(avatarSizeAtom);

  return (
    <Box gap={2}>
      <Heading fontSize={"xl"} py={4}>
        General Layout
      </Heading>

      <SettingsButton
        title="Show Username"
        top
        value={showDomain}
        setValue={setShowDomain}
      />

      <SettingsButton
        title="Show Builder Score"
        value={showScore}
        setValue={setShowScore}
      />

      <SettingsButton
        title="Show Skills"
        value={showSkills}
        setValue={setShowSkills}
      />

      <SettingsButton
        title="Header Mode"
        value={headerMode}
        setValue={setHeaderMode}
      />

      <SettingsButton
        title="Social Icons"
        value={horizontalSocial}
        setValue={setHorizontalSocial}
      />

      {/* <SettingsButton
        title="Wallet Buttons"
        value={walletButtons}
        setValue={setWalletButtons}
      /> */}
      <SettingsButton
        title="Social Buttons"
        value={socialButtons}
        setValue={setSocialButtons}
        bottom
      />

      <Heading fontSize={"xl"} py={4} pt={8}>
        Avatar Layout
      </Heading>
      <Stack gap={4} px={2}>
        <SelectOptionButton
          options={["sm", "md", "lg"]}
          value={String(avatarSize)}
          setValue={(e: any) => setAvatarSize(e)}
          title="Size"
        />

        <SelectOption
          options={["hex", "circle", "round", "none"].map((item) => ({
            value: item,
            label: capFirstLetter(item),
          }))}
          value={String(avatarShape)}
          isMulti={false}
          setValue={(e: any) => setAvatarShape(e)}
          title="Shape"
          size="md"
        />
      </Stack>
    </Box>
  );
}
