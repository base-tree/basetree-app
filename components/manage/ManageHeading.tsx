import { Text, Textarea, useColorMode } from "@chakra-ui/react";
import { Styles } from "types";
import { capFirstLetter } from "core/utils";
import WalletInput from "./WalletInput";
import Donate from "components/Profile/Donate";
import Pay from "components/Profile/Pay";
import SelectOptionButton from "./SelectOptionButton";
import AddressInput from "./AddressInput";
import { useAtomValue } from "jotai";
import { connectedAccountAtom } from "core/atoms";
import SelectOption from "./SelectOption";
import SelectColor from "./SelectColor";
import SettingsButton from "./SettingButton";
import { Link } from "../Profile";
import SelectSlider from "./SelectSlider";

interface Props {
  title: string;
  url?: string;
  type: string;
  setUrl: any;
  styles?: Styles;
  setStyles: any;
  preview?: boolean;
}

export default function ManageHeading({
  title,
  type,
  url,
  styles,
  setStyles,
  setUrl,
  preview,
}: Props) {
  const { colorMode } = useColorMode();

  const connectedAccount = useAtomValue(connectedAccountAtom);

  return (
    <>
      <>
        <SelectOptionButton
          options={["sm", "md", "lg", "xl", "2xl"]}
          value={String(styles?.size)}
          setValue={(e: any) => setStyles({ ...styles, size: e })}
          title="Size"
        />

        <SelectSlider
          value={Number(styles?.gap)}
          setValue={(e: any) => setStyles({ ...styles, gap: e })}
          min={0}
          max={20}
          title="Space"
        />
      </>
      {preview && (
        <>
          {title && (
            <Link type={type} title={title} url={url ?? ""} styles={styles} />
          )}
        </>
      )}
    </>
  );
}
