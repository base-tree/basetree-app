import {
  Button,
  ButtonGroup,
  Center,
  Collapse,
  Flex,
  IconButton,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { buttonBgColorAtom, roundAtom, variantAtom } from "core/atoms";
import { BG_COLORS, BG_COLORS_SAMPLE } from "core/utils/constants";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import ReactGPicker from "react-gcolor-picker";

interface Props {
  title?: string;
  value: string;
  setValue: any;
  options?: any;
  withTitle?: boolean;
  top?: boolean;
  bottom?: boolean;
  reff?: boolean;
  defaultMode?: string;
}
export default function SelectColor({
  title,
  value,
  setValue,
  options,
  withTitle = true,
  top,
  bottom,
  defaultMode = "solid",
  reff,
}: Props) {
  // const bgColor = useAtomValue(buttonBgColorAtom);
  // const variant = useAtomValue(variantAtom);
  // const round = useAtomValue(roundAtom);
  const refContainer = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [width, setWidth] = useState(380);
  useEffect(() => {
    if (refContainer.current) {
      //@ts-ignore
      setWidth(refContainer.current.offsetWidth);
    }
  }, [reff, refContainer, isOpen]);

  return (
    <Flex
      gap={2}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >

      {withTitle && (
        <Button
          size="lg"
          px={4}
          onClick={isOpen ? onClose : onOpen}
          width={"100%"}
         // @ts-ignore 
          ref={refContainer}
          roundedBottom={bottom ? 'lg' : 'none'}
          roundedTop={top ? 'lg' : 'none'}
          justifyContent="space-between"
        >
          <Text fontSize={"lg"}>{title}</Text>
          <IconButton
            size={"sm"}
            aria-label="bg-color-picker"
            bg={value}
          ></IconButton>
        </Button>
      )}
      <Collapse startingHeight={0} in={withTitle ? isOpen : true}>
        <Center pt={2} pb={4}>
          <ReactGPicker
            value={value}
            defaultActiveTab={defaultMode}
            onChange={setValue}
            defaultColors={BG_COLORS_SAMPLE}
            popupWidth={width}
            format="hex"
            gradient
            solid
            showAlpha
            {...options}
          />
        </Center>
      </Collapse>
    </Flex>
  );
}
