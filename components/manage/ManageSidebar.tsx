import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  colorModeAtom,
  headerModeAtom,
  horizontalSocialAtom,
  isStyledAtom,
  lightModeAtom,
  mobileViewAtom,
  nameAtom,
  showDomainAtom,
  socialButtonsAtom,
  useLineIconsAtom,
  walletButtonsAtom,
} from "core/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import ShareButton from "./Share";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ManageStylesBox from "./ManageStylesBox";
import AccordionWrapper from "./AccordionWrapper";
import ManageLayoutBox from "./ManageLayoutBox";

interface Props {
  onSave: Function;
}

export default function ManageSidebar({ onSave }: Props) {
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [mobileView, setMobileView] = useAtom(mobileViewAtom);
  const [notMobile] = useMediaQuery("(min-width: 990px)");
  const [notMobileH] = useMediaQuery("(min-height: 896px)");
  const [desktop] = useMediaQuery("(min-width: 1280px)");
  const name = useAtomValue(nameAtom);
  const setIsStyled = useSetAtom(isStyledAtom);
  const { pathname } = useRouter();

  if (notMobile) {
    setIsStyled(true);
  }

  useEffect(() => {
    if (notMobile) {
      if (!pathname.includes("nftAddress")) {
        if (colorMode !== colorM) {
          toggleColorMode();
        }
      }
    }
  }, [colorM, colorMode]);

  return (
    <>
      <Flex
        gap={4}
        flexDir={"column"}
        borderRadius={12}
        p={3}
        my={4}
        className={desktop ? "design" : "designMob"}
        w={["100%", "md", "xs", "sm", "xs", "md"]}
        backgroundColor={colorMode === "light" ? "white" : "blackAlpha.600"}
      >
        <Flex
          flexDir="column"
          h={
            notMobileH
              ? ["93vh", "93vh", "auto", "auto", "93vh"]
              : ["92vh", "92vh", "auto", "auto", "92vh"]
          }
          overflow={["auto", "auto", "hidden", "hidden", "auto"]}
          gap={4}
          rounded={"lg"}
        >
          
          <AccordionWrapper title="Styles" icon="RiPaletteLine">
          <ManageStylesBox/>
          </AccordionWrapper>
          
          <AccordionWrapper title="Layout" icon="RiLayoutLine">
          <ManageLayoutBox />
          </AccordionWrapper>
          
          
        </Flex>
      </Flex>
    </>
  );
}
