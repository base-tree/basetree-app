import {
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  Button,
  Flex,
  AccordionIcon,
  AccordionPanel,
  useColorMode,
  Tooltip,
  IconButton,
  useMediaQuery,
  Center,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { LinkIcon } from "../logos";
import { ReactElement } from "react";
import { useAtomValue } from "jotai";
import {
  buttonBgColorAtom,
  fontAtom,
  lightModeAtom,
  variantAtom,
} from "@/core/atoms";
import { Styles } from "@/types";
import { getColor, getColorSchemeName, getIconColor } from "@/core/utils";

interface Props {
  title: string | ReactElement;
  tooltip?: string | ReactElement;
  defaultOpen?: boolean;
  icon?: string;
  children: JSX.Element;
  styles?: Styles;
  isProfile?: boolean;
}

export default function AccordionWrapper({
  title,
  defaultOpen,
  icon,
  children,
  tooltip,
  styles,
  isProfile,
}: Props) {
  const { colorMode } = useColorMode();
  const font = useAtomValue(fontAtom);
  const lightMode = isProfile
    ? useAtomValue(lightModeAtom)
    : colorMode === "light";
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);

  return (
    <Accordion
      allowToggle
      allowMultiple={false}
      defaultIndex={!defaultOpen ? undefined : [0]}
      borderRadius={10}
      width={"100%"}
      size="lg"
      backgroundColor={!lightMode ? "whiteAlpha.100" : "blackAlpha.100"}
      display={"flex"}
    >
      <AccordionItem border={0} borderRadius={10} width={"100%"}>
        {({ isExpanded }) => (
          <>
            <AccordionButton
              minWidth={"100%"}
              as={Button}
              size="lg"
              height={"68px"}
              bgColor={!lightMode ? "whiteAlpha.50" : "blackAlpha.50"}
              _hover={{
                bgColor: !lightMode ? "whiteAlpha.100" : "blackAlpha.100",
              }}
              _expanded={{
                bgColor: !lightMode ? "whiteAlpha.100" : "blackAlpha.100",
              }}
            >
              <Flex
                gap={2}
                alignItems={"center"}
                textAlign="left"
                width={"100%"}
              >
                {icon && (
                  <>
                    {icon.includes("%") ? (
                      <CircularProgress
                        max={100}
                        size={"40px"}
                        thickness={'14px'}
                        value={Number(icon.slice(0, icon.indexOf("%")))}
                        isIndeterminate={icon.slice(0, icon.indexOf("%")) === "x"}
                        color={lightMode ? '#232323' : '#ffffff'}
                        trackColor={lightMode ? '#23232333' : '#ffffff33'}
                      >
                        <CircularProgressLabel fontWeight={"bold"} fontSize={'sm'}>
                          {icon.slice(0, icon.indexOf("%"))}
                        </CircularProgressLabel>
                      </CircularProgress>
                    ) : (
                      <LinkIcon
                        type={icon}
                        color={getIconColor(lightMode)}
                      />
                    )}
                  </>
                )}
                <Flex
                  fontWeight={"bold"}
                  w={"100%"}
                  fontSize={styles?.size ? styles.size : "xl"}
                  textAlign={"center"}
                >
                  {title}
                </Flex>
                <AccordionIcon />
              </Flex>
            </AccordionButton>
            <AccordionPanel py={4} minWidth="100%">
              <Stack gap={4}>{children}</Stack>
              {tooltip && <Center pt={4}> {tooltip}</Center>}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
