"use client";
import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { Avatar, Link, Links, Socials } from "components/Profile";
import NextLink from "next/link";
import { openModalAtom } from "core/atoms";
import { useAtom, useSetAtom } from "jotai";
import {
  BG_COLORS_SAMPLE,
  DOCS_URL,
  SOCIALS,
  TWITTER_FOLLOW_URL,
} from "core/utils/constants";
import { LinkIcon, Logo, LogoIcon } from "components/logos";
import AnimateOnScroll from "components/animate/AnimateOnScroll";
import { LinksSlider } from "components/ui/LinksSlider";
import PSNProfile from "components/Profile/PSNProfile";
import { PreviewSlider } from "components/ui/PreviewSlider";
import Lottie from "react-lottie";
import * as animationData from "assets/animations/page-design.json";
import IconCloud from "../ui/icon-cloud";
import HyperText from "../ui/hyper-text";
import { MatrixText } from "../ui/MatrixText";
import CanvasLightEffect from "../ui/CanvasLightEffect";
import { BlocksSlider } from "../ui/BlocksSlider";
import Footer from "../Layout/Footer";

export default function FeaturesSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  const [small] = useMediaQuery("(min-width: 580px)");
  const [_open, _setOpen] = useAtom(openModalAtom);

  return (
    <Box id="features" w={"100%"}>
      <Container
        w={"100%"}
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
      >
        <Center
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
        >
          <Flex
            flexDir={"column"}
            justify={"center"}
            bg={"blackAlpha.400"}
            gap={8}
            align={"center"}
            minH={"100vh"}
            w={"100%"}
            px={6}
            py={36}
          >
            
            <AnimateOnScroll delay={0.1}>
              

              <Heading
                as={"h3"}
                fontWeight="bold"
                fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                textAlign={["center", "center", "center"]}
              >
                BUILD YOUR SPACE
              </Heading>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <Text textAlign={"center"} fontSize={["2xl", "2xl", "4xl"]}>
                Bring your own vibe
              </Text>
            </AnimateOnScroll>
            <Center rounded={"2xl"} p={[0, 4]}>
                <Flex w={["90vw", "sm", "md", "lg"]} position={"relative"}>
                  <AnimateOnScroll
                    delay={0.5}
                    y={-50}
                    styles={{ width: "100%", overflow: "visible" }}
                  >
                    <PreviewSlider />
                  </AnimateOnScroll>
                </Flex>
              </Center>
            <AnimateOnScroll delay={0.8}>
              <Text
                textAlign={"center"}
                fontSize={["lg", "lg", "2xl"]}
                maxW={"container.md"}
                px={4}
              >
                Whether showcasing NFTs or integrating crypto payments, Basetree
                gives you full control over your digital profile
              </Text>
            </AnimateOnScroll>
            <AnimateOnScroll delay={1}>
              <Center flexDirection={["column", "column", "row"]} gap={6}>
                <Button
                  size={"lg"}
                  colorScheme="light"
                  w={["100%", "xs"]}
                  as={NextLink}
                  passHref
                  href={DOCS_URL}
                >
                  {t("Templates (soon)")}
                </Button>
                <Button
                  as={NextLink}
                  passHref
                  href="#components"
                  size={"lg"}
                  w={["100%", "xs"]}
                >
                  Explore Components
                </Button>
              </Center>
            </AnimateOnScroll>
          </Flex>
          <Stack w={"100%"} gap={0} id="components">
            
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              h={"100vh"}
              bg={"whitwAlpha.200"}
              w={"100vw"}
            >
              <Center rounded={"2xl"} p={[4, 4, 12]} flexDir={"column"}>
                <AnimateOnScroll
                  delay={0.3}
                  styles={{ width: "100%", overflow: "visible" }}
                >
                  <Center gap={4}>
                    <LinkIcon type="add" size={notMobile ? "60px" : "40px"} />
                    <Text
                      textAlign={"center"}
                      fontWeight="bold"
                      fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                    >
                      {t("Add")}
                    </Text>
                  </Center>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5} x={-200} y={0}>
                  <Text
                    textAlign={"center"}
                    fontWeight="bold"
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Blocks")}
                  </Text>
                </AnimateOnScroll>
              </Center>
              <Center rounded={"2xl"} p={[0, 4, 12]} py={4}>
                <Flex w={["100%", "100%", "lg"]} position={"relative"}>
                  {" "}
                  <AnimateOnScroll
                    delay={0.7}
                    styles={{ width: "100%", overflow: "visible" }}
                  >
                    <BlocksSlider />
                    
                  </AnimateOnScroll>
                </Flex>
              </Center>
            </Flex>
            {/* <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              bg={"whiteAlpha.100"}
              h={"100vh"}
              w={"100vw"}
              py={12}
            >
              <Center rounded={"2xl"} gap={10} p={12} flexDir={"column"}>
                <AnimateOnScroll
                  delay={0.2}
                >
                  <Text
                    fontWeight="black"
                    textAlign={"center"}
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Social Media")}
                  </Text>
                </AnimateOnScroll>
                <AnimateOnScroll
                  delay={0.3}
                  styles={{ width: "100%", overflow: "visible" }}
                >
                  <Flex w={["100%", "100%", "lg"]} position={"relative"}>
                    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
                      <IconCloud
                        iconSlugs={SOCIALS.map((s) => s.key.toLowerCase())}
                      />
                    </div>
                  </Flex>
                </AnimateOnScroll>
              </Center>
            </Flex>
           <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              h={"100vh"}
              w={"100vw"}
            >
              <Center rounded={"2xl"} p={12} flexDir={"column"}>
                <AnimateOnScroll delay={0.3} x={-200} y={0}>
                  <Text
                    textAlign={"center"}
                    fontWeight="black"
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Simple")}
                  </Text>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5} x={-200} y={0}>
                  <Text
                    textAlign={"center"}
                    fontWeight="bold"
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Buttons")}
                  </Text>
                </AnimateOnScroll>
              </Center>
              <Center rounded={"2xl"} py={12}>
                <Flex w={["100%", "100%", "lg"]} position={"relative"}>
                  <AnimateOnScroll
                    delay={0.7}
                    x={notMobile ? 200 : 0}
                    y={notMobile ? 0 : 50}
                    styles={{ width: "100%", overflow: "visible" }}
                  >
                    <LinksSlider />
                  </AnimateOnScroll>
                </Flex>
              </Center>
            </Flex> 
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              bg={"blackAlpha.400"}
              w={"100vw"}
              h={"100vh"}
            >
              <Center rounded={"2xl"} p={[4, 4, 12]}>
                <Flex
                  w={["90vw", "420px", "lg", "xl", "2xl"]}
                  position={"relative"}
                  overflow={'hidden'}
                >
                  <AnimateOnScroll
                    delay={0.3}
                    x={-200}
                    y={0}
                    styles={{ width: "100%", overflow: "visible" }}
                  >
                    <Link
                      type="nft slider"
                      title=""
                      url=""
                      styles={{
                        effect: "cards",
                        mode: "slider",
                        color: "#ffffff77",
                        nav: true,
                        navColor: "#ffffff",
                        size: notMobile ? "md" : "sm",
                        position: "fill",
                        type: "collection",
                        eth: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
                        slides: 2,
                        centered: true,
                        auto: true,
                        network: "ethereum",
                      }}
                      color={"dark"}
                    />
                  </AnimateOnScroll>
                </Flex>
              </Center>
              <Center rounded={"2xl"} p={12} flexDir={"column"}>
                <AnimateOnScroll
                  delay={0.5}
                  x={notMobile ? 200 : 0}
                  y={notMobile ? 0 : 50}
                >
                  <Text
                    fontWeight="black"
                    textAlign={"center"}
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("NFT Image")}
                  </Text>
                </AnimateOnScroll>
                <AnimateOnScroll
                  delay={0.7}
                  x={notMobile ? 200 : 0}
                  y={notMobile ? 0 : 50}
                >
                  <Text
                    fontWeight="bold"
                    textAlign={"center"}
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Galleries")}
                  </Text>
                </AnimateOnScroll>
              </Center>
            </Flex>*/}
            <CanvasLightEffect bgColor={["#0063cc", "#001325"]}>
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              h={"100vh"}
              w={"100%"}
            >
              <Center
                rounded={"2xl"}
                p={[4, 8, 12]}
                flexDir={"column"}
                gap={12}
              >
                <AnimateOnScroll delay={0.3}>
                  <Flex w={["100%"]} position={"relative"}>
                    <Heading
                      as={"h3"}
                      fontWeight="bold"
                      fontSize={["4xl", "4xl", "5xl", "5xl"]}
                      textAlign={["center", "center", "center"]}
                    >
                      Get Your Basetree
                    </Heading>
                  </Flex>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5}>
                  <Text fontSize={["xl", "xl", "2xl"]} textAlign={"center"} maxW={['xs','sm','100%']}>
                    Join the growing community and start building your
                    profile.
                  </Text>
                </AnimateOnScroll>
                <Center gap={6} flexDir={["column", "column", "column"]}>
                 
                  <AnimateOnScroll
                    delay={0.7}
                    styles={{ width: notMobile ? "inherit" : "100%" , overflow: 'visible'}}
                  >
                    <Button
                      h={"54px"}
                      size={"lg"}
                      rounded={"full"}
                      variant={'pop'}
                      colorScheme="light"
                      minW={"320px"}
                      w={["100%", "xs"]}
                      as={NextLink}
                      href={"/app"}
                      passHref
                    >
                      {t("Get Started")}
                    </Button>
                  </AnimateOnScroll>
                  <AnimateOnScroll
                    delay={0.9}
                    styles={{ width: notMobile ? "320px" : "100%" , overflow: 'visible'}}
                  >
                   <Footer />
                  </AnimateOnScroll>
                </Center>
              </Center>
            </Flex>
            </CanvasLightEffect>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
