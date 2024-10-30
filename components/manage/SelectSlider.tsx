import {
  Button,
  ButtonGroup,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { buttonBgColorAtom, roundAtom, variantAtom } from "core/atoms";
import { useAtomValue } from "jotai";
import { useState } from "react";
interface Props {
  title?: string;
  value: number;
  setValue: Function;
  min?:number;
  max?:number;
}
export default function SelectSlider({
  title,
  value,
  setValue,
  min = 0,
  max = 100
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <Stack w={"100%"} gap={3} mb={4}>
      <Text fontWeight={"bold"}>{title}</Text>
      <Slider
        id="slider"
        defaultValue={value ? value : 0}
        min={min}
        max={max}
        colorScheme="blue"
        onChange={(v) => setValue(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={0} mt="2" fontSize="sm">
          Auto
        </SliderMark>
        <SliderMark value={max/2} mt="2" ml="-6" fontSize="sm">
        {`${max * 5}px`}
        </SliderMark>
        <SliderMark value={max} mt="2" ml="-12" fontSize="sm">
        {`${max * 10}px`}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="blackAlpha.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={value === 0 || !value ? `Auto` : `${value * 10}px`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Stack>
  );
}
