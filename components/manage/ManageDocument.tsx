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

interface Props {
  type: string;
  url: string;
  setUrl?: any;
  image?: string;
  setImage: any;
  styles?: Styles;
  setStyles?: any;
}

export default function ManageDocument({
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
      <ManageUpload
        type={type}
        setImage={setImage}
        image={image}
        setUrl={setUrl}
        galleryItems={0}
      />

      <SettingsButton
        title="Open in Pop Up"
        value={styles?.popup ?? false}
        setValue={(e: any) => setStyles({ ...styles, popup: e, type: 'modal' })}
        top
        bottom
      />
    </>
  );
}
