import {
  Box,
  Button,
  Container,
  Center,
  Flex,
  HStack,
  Stack,
  Drawer,
  IconButton,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Link,
  SimpleGrid,
  LightMode,
  DrawerFooter,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { localeAtom, colorModeAtom, isConnectedAtom, chainAtom } from "core/atoms";
import { ConnectWalletButton } from "components/walletConnect";
import { useAtom, useAtomValue } from "jotai";
import { Locale } from "translations";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { LinkIcon, Logo, Base } from "components/logos";
import Footer from "./Footer";
import LogoLink from "./LogoLink";
import { DOCS_URL } from "core/utils/constants";
import { base } from "thirdweb/chains";
export default function Header() {
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const lightMode = useColorMode().colorMode === "light";
  const [notMobile] = useMediaQuery("(min-width: 992px)");
  const [small] = useMediaQuery("(min-width: 420px)");
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { pathname } = useRouter();
  const app = pathname.includes("/app") ? true : false;
  const { t } = useTranslate();
  const isConnected = useAtomValue(isConnectedAtom);
  const dashboard = pathname === "/names" ? true : false;
  const [chain, setChain] = useAtom(chainAtom);
  const isMainnet = chain === base;

  useEffect(() => {
    if (!pathname.includes("nftAddress")) {
      if (colorMode !== colorM) {
        toggleColorMode();
      }
    }
  }, [colorM, colorMode]);

  return (
    <>
      {/* <Center
        px={[4, 4, 0]}
        fontSize={["md","lg"]}
        py={2}
        bgGradient={"linear(to-r, var(--base), var(--base0))"}
        color={"white"}
      >
        
        Now Live On Base Testnet!
      </Center> */}

      <Box
        as="nav"
        position={app ? "absolute" : dashboard ? "relative" : "fixed"}
        top={0}
        zIndex={1000}
        px={0}
        m={0}
        width={"100%"}
        placeItems={"center"}
        backgroundColor={'auto'}
        backdropFilter="auto"
        backdropBlur={'8px'}
        //backgroundColor={useColorModeValue('whiteAlpha.700', 'blackAlpha.700')}
        borderBottomColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      >
        <Container maxW="100%" p={[3, 4, 4, 4]}>
          <Flex justifyContent="space-between" gap={[0, 0, 2]}>
            <LogoLink />
            {/* <HStack gap={1}>
              
              )}
            </HStack> */}

            <HStack dir="ltr" gap={[1, 1, 2]}>
             

                {notMobile && <NextLink href="/explore" passHref>
                  <Button
                    variant="ghost"
                    size={'lg'}
                    fontSize={'medium'}
                    isActive={pathname === '/explore'}
                    aria-label="explore-builders-icon"
                    rounded={'full'}
                    gap={2}
                  >
                    <LinkIcon type="RiUserSearchFill" size={24} />
                    {notMobile && <Text>{t("Explore")}</Text>}
                  </Button>
                </NextLink>}
              <Drawer onClose={onClose} isOpen={isOpen} size={'sm'}>
                <DrawerOverlay />
                  <DrawerContent
                    bg={lightMode ? "var(--white)" : "var(--dark)"}
                  >
                    <DrawerHeader
                      justifyContent={"space-between"}
                      display={"flex"}
                      alignItems={"center"}
                      p={6}
                      py={8}
                    >
                      <Flex gap={3}>
                        <LinkIcon
                          type="base"
                          size={'36px'}
                        />
                        <Stack>
                        <Text fontWeight={"bold"} cursor={"default"} w={'100%'}>
                         {isMainnet ? 'Base Mainnet' : 'Base Sepolia'}
                        </Text>
                        </Stack>
                      </Flex>
                      <IconButton
                        variant="ghost"
                        aria-label="theme"
                        onClick={onToggle}
                        icon={<LinkIcon type="close" />}
                      />
                    </DrawerHeader>
                    <DrawerBody>
                      <SimpleGrid columns={1} py={2} gap={2}>
                      <NextLink href={"/"} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            isActive={
                              pathname === "/"
                            }
                            width="100%"
                            justifyContent="left"
                          >
                            {t("Intro")}
                          </Button>
                        </NextLink>
                        <NextLink href={"/explore"} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            isActive={
                              pathname === "/explore"
                            }
                            width="100%"
                            justifyContent="left"
                          >
                            {t("Explore Builders")}
                          </Button>
                        </NextLink>
                        <NextLink href={"/app"} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            isActive={
                              pathname === "/app"
                            }
                            width="100%"
                            justifyContent="left"
                          >
                            {t("Register")}
                          </Button>
                        </NextLink>

                        {isConnected && 
                        <NextLink href={"/names"} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            isActive={
                              pathname === "/names"
                            }
                            width="100%"
                            justifyContent="left"
                          >
                            {isMainnet ? 'My Basenames' : 'My Pages'}
                          </Button>
                          </NextLink>
                        }
                        <NextLink href={"/roadmap"} passHref>
                          <Button
                            variant="ghost"
                            isActive={
                              pathname === "/roadmap"
                            }
                            onClick={onClose}
                            width="100%"
                            justifyContent="left"
                          >
                            {t("Roadmap")}
                          </Button>
                        </NextLink>
                        
                        {/* <Link href={DOCS_URL} target="_blank">
                          <Button variant="ghost" width="100%" justifyContent="left">
                            {t('Developer Docs')}
                          </Button>
                        </Link> */}

                        <NextLink href={"/terms"} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            isActive={
                              pathname === "/terms"
                            }
                            width="100%"
                            justifyContent="left"
                          >
                            {t("Terms of Use")}
                          </Button>
                        </NextLink>
                        <NextLink href={"/privacy"} passHref>
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            isActive={
                              pathname === "/privacy"
                            }
                            width="100%"
                            justifyContent="left"
                          >
                            {t("Privacy Policy")}
                          </Button>
                        </NextLink>
                      </SimpleGrid>
                    </DrawerBody>
                    <DrawerFooter>
                      <Footer />
                    </DrawerFooter>
                  </DrawerContent>
              </Drawer>

              {/* {dashboard || app ? ( */}
                <ConnectWalletButton />
              {/* ) : (
                <NextLink href={"/app"} passHref>
                  <Button
                    rounded={"full"}
                    onClick={onClose}
                    variant="solid"
                    height={"47px"}
                    fontSize={"medium"}
                    width={["168px", "192px"]}
                  >
                    {t("Alpha Access")}
                  </Button>
                </NextLink>
              )} */}
              <IconButton
                aria-label="mobile-menu"
                variant="ghost"
                onClick={onOpen}
                mx={0}
                rounded={"full"}
                size={["md", "lg"]}
              >
                <LinkIcon type="RiMenuLine" size={22} />
              </IconButton>
              
            </HStack>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
