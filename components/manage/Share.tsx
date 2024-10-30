import { openWindow } from "@/core/utils";
import { Button, DarkMode, useColorMode } from "@chakra-ui/react";
import { LinkIcon } from "components/logos";
import { SITE_URL, SITE_PROFILE_URL } from "core/utils/constants";
import { RiShareLine } from "react-icons/ri";

export default function ShareButton({
  name,
  type = "blue",
  url,
  isDisabled = false,
}: {
  name: string;
  type: "blue" | "gray";
  url: string;
  isDisabled?: boolean;
}) {
  const shareProfile = async () => {
    let hashtags = "Basetree,Base";
    let text = `🚀 Just claimed my testnet .bst domain with BaseTree on Base!!%0a%0a✅ check it out : ${name} %0a%0a🔥 Explore the alpha app and claim your unique basetree profile via @basetree_xyz!%0a%0a`;
    let href = `https://twitter.com/intent/tweet?original_referer=${SITE_URL}&text=${text}&hashtags=${hashtags}&url=${url}`;
    openWindow(href,null);
    //window.open(href);
  };
  const { colorMode } = useColorMode();

  return (
    <>
      {type === "blue" ? (
        <DarkMode>
          <Button
            gap={2}
            flexDirection={"column"}
            height="72px"
            w={"100%"}
            className="share"
            isDisabled={isDisabled}
            borderRadius={12}
            colorScheme={"gray"}
            onClick={shareProfile}
          >
            <LinkIcon type="x" />
            Share
          </Button>
        </DarkMode>
      ) : (
        <Button
          gap={2}
          className="share"
          variant={'outline'}
          bgColor={"dark.600"}
          onClick={shareProfile}
        >
          <LinkIcon type="x" size={22} />
          Share
        </Button>
      )}
    </>
  );
}
