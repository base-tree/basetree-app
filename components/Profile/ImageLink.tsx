import { Styles } from "@/types";
import {
  Image,
  Spinner,
  Center,
  useMediaQuery,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import { roundAtom } from "core/atoms";
import { useAtomValue } from "jotai";

interface Props {
  url: string;
  title: string;
  alt?: string;
  styles?: Styles;
  loading?: boolean;
}
const ImageLink = ({ url, title, styles, alt, loading }: Props) => {
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const round = useAtomValue(roundAtom);
  const height =
    styles?.height && styles?.height !== "0"
      ? `${Number(styles?.height) * 10}px`
      : "auto";
  const objectFit =
    styles?.position && height !== "auto" ? styles?.position : "cover";
  return (
    <>
      {url ? (
        <Box position="relative" width="100%" overflow="hidden">
          <Image
            borderRadius={round === "none" ? 0 : round === "md" ? 8 : 16}
            src={url}
            width="100%"
            // @ts-ignore
            objectFit={objectFit}
            height={height}
            alt={alt ? alt : "BaseTree Image Link"}
            textAlign="center"
          />

          {!styles?.nolink && (
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              height="100%" // Adjusted to make the overlay smaller
              bgGradient="linear(to-t, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.001) 50%)"
              borderRadius={round === "none" ? 0 : round === "md" ? 8 : 16}
              zIndex={1}
              transition="all 0.3s ease" // Smooth transition for hover effect
              _hover={{
                transition: "all 0.3s ease",
                bgGradient:
                  "linear(to-t, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.001) 50%)",
              }} // Darker on hover
            />
          )}

          {!styles?.nolink && (
            <Box
              position="absolute"
              p={2}
              bottom={0}
              zIndex={2}
              width="100%"
              textAlign="center"
            >
              <Text fontSize="lg" color="white" fontWeight={"bold"}>
                {title}
              </Text>
            </Box>
          )}
        </Box>
      ) : (
        <>
          {loading && (
            <Center width={"100%"} height={150}>
              <Spinner size="lg" />
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default ImageLink;
