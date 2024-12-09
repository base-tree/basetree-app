import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { AVAILABLE_LINKS, EXAMPLE_LINK_URLS } from "core/utils/constants";
import SelectOptionButton from "./SelectOptionButton";
import { Styles } from "types";
import { capFirstLetter } from "core/utils";
import { useState } from "react";
import { LinkIcon } from "components/logos";
import IconPicker from "./IconPicker";
import SelectSlider from "./SelectSlider";
import SettingsButton from "./SettingButton";
import SelectColor from "./SelectColor";

interface Props {
  type: string;
  url: string;
  setUrl?: any;
  styles?: Styles;
  setStyles?: any;
}

export default function ManageSimpleLink({
  type,
  url,
  styles,
  setStyles,
  setUrl,
}: Props) {
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? "";

  return (
    <>
      <InputGroup mt={2}>
        <Input
          size="lg"
          value={url}
          placeholder={`Enter ${capFirstLetter(type)} URL`}
          onChange={(e) => setUrl(e.currentTarget.value)}
          //onChange={(e) => setUrl(title.toLowerCase(),e.currentTarget.value)}
        />
        <InputRightElement>
          <Tooltip
            borderRadius={4}
            label={<Text p={2}>Paste</Text>}
            hasArrow
            color="white"
            bgColor={"black"}
          >
            <IconButton
              mt={2}
              aria-label="paste-url"
              mr={2}
              onClick={() =>
                navigator.clipboard.readText().then((text) => setUrl(text))
              }
            >
              <LinkIcon type="RiFileCopy2Line" />
            </IconButton>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
      {EXAMPLE_LINK_URLS[type.toLowerCase().replace(" ", "")] && (
        <Box pt={2}>
          <Text>Example {capFirstLetter(type)}</Text>
          <Text color={"gray"}>
            {EXAMPLE_LINK_URLS[type.toLowerCase().replace(" ", "")]}
          </Text>
        </Box>
      )}

      {type.includes("youtube") && RegExp(reg, "i").test(url) && (
        <SelectSlider
          value={Number(styles?.height)}
          setValue={(e: any) => setStyles({ ...styles, height: e })}
          title="Height"
        />
      )}

      {type.includes("cast") && <SelectColor
        value={String(styles?.bg)}
        setValue={(e: any) => setStyles({ ...styles, bg: e })}
        title={`${capFirstLetter(type)} BG Color`}
        defaultMode="solid"
        options={{gradient : false}}
        top
        bottom
      />}

      {(type.includes("soundcloud") ||
        type.includes("simple link") ||
        type.includes("image link") ||
        type.includes("embed") ||
        type.includes("token chart")) &&
        RegExp(reg, "i").test(url) && (
          <SelectOptionButton
            options={["sm", "md", "lg"]}
            value={String(styles?.size)}
            setValue={(e: any) => setStyles({ ...styles, size: e })}
            title="Size"
          />
        )}

      {(type === "simple link" ||
        (type.includes("embed") && styles?.type === "modal") ||
        (type.includes("token chart") && styles?.type === "modal") ||
        type.includes("gallery")) && (
        <IconPicker
          value={styles?.icon}
          setValue={(e: any) => setStyles({ ...styles, icon: e })}
        />
      )}

      {type === "simple link" && (
        <SettingsButton
          title="Open in Pop Up"
          value={styles?.popup ?? false}
          setValue={(e: any) =>
            setStyles({ ...styles, popup: e, type: "modal" })
          }
          top
          bottom
        />
      )}
    </>
  );
}
