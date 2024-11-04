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
import ManageUpload from "./ManageUpload";
import SelectSlider from "./SelectSlider";
import SettingsButton from "./SettingButton";
import SelectColor from "./SelectColor";

interface Props {
  type: string;
  url: string;
  setUrl?: any;
  image?: string;
  setImage: any;
  styles?: Styles;
  setStyles?: any;
}

export default function ManageImageLink({
  type,
  url,
  styles,
  setStyles,
  image,
  setImage,
  setUrl,
}: Props) {
  const height =
    styles?.height && styles?.height !== "0"
      ? `${Number(styles?.height) * 10}px`
      : "auto";

  return (
    <>
      {type.includes("link") && (
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
        </>
      )}

      <ManageUpload
        type={type}
        setImage={setImage}
        image={image}
        setUrl={setUrl}
        galleryItems={0}
      />

      <SettingsButton
        title="Hide Title"
        value={styles?.nolink ?? false}
        setValue={(e: any) => setStyles({ ...styles, nolink: e })}
        top
        bottom
      />

      <SelectSlider
        value={Number(styles?.height)}
        setValue={(e: any) => setStyles({ ...styles, height: e })}
        title="Height"
      />

      <SelectColor
        value={String(styles?.bg)}
        setValue={(e: any) => setStyles({ ...styles, bg: e })}
        title={`Overlay Color`}
        options={{gradient: false}}
      />

      {height !== "auto" && (
        <SelectOptionButton
          options={["cover", "contain", "none"]}
          value={String(styles?.position)}
          setValue={(e: any) => setStyles({ ...styles, position: e })}
          title="Image Fit"
        />
      )}
    </>
  );
}
