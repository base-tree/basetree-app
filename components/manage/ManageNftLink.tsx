"use client";
import {
  Button,
  Flex,
  Text,
  Textarea,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import AddNFTAvatar from "./AddNFTAvatar";
import SelectOptionButton from "./SelectOptionButton";
import SettingsButton from "./SettingButton";
import { OPENSEA_URL } from "@/core/utils/constants";
import NftLink from "../Profile/NftLink";
import { Styles } from "@/types";

interface Props {
  type: string;
  url: string;
  setUrl?: any;
  content?: string;
  title?: string;
  image?: string;
  styles?: Styles;
  setStyles?: any;
  setContent: any;
}

export default function ManageNftLink({
  type,
  title,
  content,
  styles,
  setStyles,
  url,
  setUrl,
  image,
  setContent,
}: Props) {
  const { colorMode } = useColorMode();
  console.log(content);
  return (
    <>
      {(!content || content === "") && (
        <AddNFTAvatar defaultType="nft" key="add-nft-modal" />
      )}
      {content && (
        <>
          <SelectOptionButton
            options={["sm", "md", "lg"]}
            value={String(styles?.size)}
            setValue={(e: any) => setStyles({ ...styles, size: e })}
            title="Size"
          />

          <SettingsButton
            title="Explorer Link"
            top
            bottom
            value={styles?.scanLink ?? false}
            setValue={(e: any) => setStyles({ ...styles, scanLink: e })}
          />

          <SettingsButton
            title="Hide View Button"
            top
            bottom
            value={styles?.nolink ?? false}
            setValue={(e: any) => setStyles({ ...styles, nolink: e })}
          />

          <NftLink
            url={String(image)}
            link={url}
            title={String(title)}
            styles={styles}
            address={String(content)}
            alt={title}
            color={colorMode === "light" ? "dark" : "white"}
          />
        </>
      )}
    </>
  );
}
