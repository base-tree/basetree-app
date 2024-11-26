import { openWindow } from "@/core/utils";
import {
  Button,
  Center,
  DarkMode,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { LinkIcon } from "components/logos";
import { SITE_URL, SITE_PROFILE_URL } from "core/utils/constants";
import { RiShareLine } from "react-icons/ri";

export default function ShareButton({
  name,
  url,
  isDisabled = false,
}: {
  name: string;
  url: string;
  isDisabled?: boolean;
}) {
  const shareProfile = async (social: string) => {
    let hashtags = "Basetree,Base";
    let text = `🚀 Just launched my new Basetree profile! 🎉
%0a%0a
It’s now easier than ever to explore my links, projects, and more, all in one place. Check it out and let me know what you think! 👇

%0a%0aget yours @basetree${social === "x" ? "_xyz" : ""}! %0a%0a`;

    let href = "";

    switch (social) {
      case "x":
        href = `https://twitter.com/intent/tweet?original_referer=${SITE_URL}&text=${text}&hashtags=${hashtags}&url=${url}`;
        break;

      case "farcaster":
        href = `https://warpcast.com/~/compose??original_referer=${SITE_URL}&text=${text}&hashtags=${hashtags}&embeds[]=${url}`;
        break;

      default:
        href = ``;
        break;
    }

    openWindow(href, null);
    //window.open(href);
  };
  const { colorMode } = useColorMode();

  return (
    <DarkMode>
      <Menu>
        <MenuButton
          className="share"
          variant={"outline"}
          bgColor={"dark.600"}
          as={Button}
        >
          <Center gap={2}>
            <LinkIcon type="RiShareLine" />
            <Text>Share</Text>
          </Center>
        </MenuButton>

        <MenuList
          p={0}
          bgColor={colorMode === "light" ? "white" : "var(--dark)"}
        >
          <MenuItem
            height={"48px"}
            bgColor={
              colorMode === "light" ? "whiteAlpha.400" : "blackAlpha.400"
            }
            sx={{
              textDecoration: "none",
              _hover: {
                textDecoration: "none",
                bgColor:
                  colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.300",
              },
            }}
            gap={2}
            onClick={() => shareProfile("farcaster")}
            borderBottomRadius={0}
          >
            <LinkIcon type="farcaster" size={"24px"} /> on Farcaster
          </MenuItem>
          <MenuItem
            height={"48px"}
            bgColor={
              colorMode === "light" ? "whiteAlpha.400" : "blackAlpha.400"
            }
            sx={{
              textDecoration: "none",
              _hover: {
                textDecoration: "none",
                bgColor:
                  colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.300",
              },
            }}
            gap={2}
            onClick={() => shareProfile("x")}
            borderBottomRadius={0}
          >
            <LinkIcon type="x" size={"24px"} /> on X
          </MenuItem>
        </MenuList>
      </Menu>
    </DarkMode>
  );
}
