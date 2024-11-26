import { useColorMode } from "@chakra-ui/react";
import { Styles } from "types";
import SelectOptionButton from "./SelectOptionButton";
import { useAtomValue } from "jotai";
import { connectedAccountAtom } from "core/atoms";
import SelectColor from "./SelectColor";
import SettingsButton from "./SettingButton";
import ManageSimpleLink from "./ManageSimpleLink";
import TokenChartModal from "../Profile/TokenChartModal";
import SelectOption from "./SelectOption";
import { capFirstLetter } from "@/core/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectSlider from "./SelectSlider";

interface Props {
  title: string;
  url?: string;
  type: string;
  content: string;
  setUrl: any;
  styles: Styles;
  setStyles: any;
  setContent: any;
  preview?: boolean;
}

interface CoinData {
  tsyms: {
    [currency: string]: any;
  };
}

type InputData = {
  [coin: string]: CoinData;
};

export default function ManageTokenChart({
  title,
  type,
  url,
  styles,
  content,
  setStyles,
  setContent,
  setUrl,
  preview,
}: Props) {
  const { colorMode } = useColorMode();

  const connectedAccount = useAtomValue(connectedAccountAtom);
  const [tokenData, setTokenData] = useState<any[]>();
  const tokenChart = content
    ? JSON.parse(content)
    : { symbols: [], changeMode: "percent-only", type: "area" };

  const generateSymbolPairs = (
    data: InputData,
    exchange: string = "COINBASE",
    timeframe: string = "1D"
  ): string[] => {
    const pairs: any[] = [];

    for (const [coin, { tsyms }] of Object.entries(data)) {
      for (const currency of Object.keys(tsyms)) {
        pairs.push({
          value: `${exchange}:${coin}${currency}|${timeframe}`,
          label: `${coin}${currency}`,
        });
      }
    }

    console.log(pairs);
    return pairs;
  };

  useEffect(() => {
    async function getList() {
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/v4/all/exchanges?e=coinbase&api_key=${process.env.NEXT_PUBLIC_DATA_API}`
      );
      if (data.Response === "Success") {
        setTokenData(
          generateSymbolPairs(
            data.Data.exchanges.Coinbase.pairs,
            "COINBASE",
            "1D"
          )
        );
      }
    }

    if (!tokenData) {
      getList();
    }
  }, []);

  return (
    <>
      <>
        <SelectOptionButton
          options={["modal", "direct"]}
          value={String(styles?.type)}
          setValue={(e: any) => setStyles({ ...styles, type: e })}
          title="Type"
        />

        <SelectOptionButton
          options={["sm", "md", "lg"]}
          value={String(styles?.size)}
          setValue={(e: any) => setStyles({ ...styles, size: e })}
          title="Size"
        />

        {tokenData && (
          <SelectOption
            options={tokenData}
            value={tokenChart.symbols}
            isMulti={true}
            setValue={(e: any) =>
              setContent(JSON.stringify({ ...tokenChart, symbols: e }))
            }
            title="Tokens"
          />
        )}

        <SelectOption
          options={[
            "price-and-percent",
            "price-only",
            "percent-only",
            "no-values",
          ].map((item) => {
            return {
              value: item,
              label: capFirstLetter(item.replaceAll("-", " ")),
            };
          })}
          value={tokenChart.changeMode}
          isMulti={false}
          setValue={(e: any) =>
            setContent(JSON.stringify({ ...tokenChart, changeMode: e }))
          }
          title="Show Changes"
        />

        <SelectSlider
          value={Number(styles?.height)}
          setValue={(e: any) => setStyles({ ...styles, height: e })}
          title="Height"
        />

        <SelectColor
          value={String(styles?.bg)}
          setValue={(e: any) => setStyles({ ...styles, bg: e })}
          title="BG Color"
          top
          bottom
        />
      </>
      {preview && (
        <>
          {styles.type && content && title && (
            <TokenChartModal
              title={title}
              content={content}
              type={"type"}
              styles={styles}
              key={"swap-modal-" + title.replaceAll(" ", "-")}
            />
          )}
        </>
      )}
    </>
  );
}
