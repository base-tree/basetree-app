import React, { useEffect } from "react";
import { Center, Flex, Text, keyframes, useMediaQuery } from "@chakra-ui/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "components/Profile";
import { LinkIcon } from "components/logos";
import PreviewCard from "components/Profile/PreviewCard";
import { BG_COLORS_SAMPLE, SOCIALS } from "core/utils/constants";
import "swiper/css";
import "swiper/css/effect-flip";
import { TEMPLATES } from "@/core/utils/templates";
import Preview from "../Profile/Preview";
import PSNProfile from "../Profile/PSNProfile";
import "swiper/css/bundle";
import { LinksSlider } from "./LinksSlider";
import IconCloud from "./icon-cloud";

export const BlocksSlider = () => {
  const [notMobile] = useMediaQuery("(min-width: 992px)");

  return (
    <Flex w={"100%"}>
      <Swiper
        className="blocks-swiper"
        loop
        style={{
          height: "380px",
          width: notMobile ? "100%" : "300px",
          borderRadius: "24px",
          //@ts-ignore
          "--swiper-pagination-color": "#ffffff",
        }}
        grabCursor
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        }}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          scale: 1.2,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        spaceBetween={"24px"}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
      >
        <SwiperSlide
          style={{ height: "340px", width: notMobile ? "100%" : "300px" }}
        >
          <Link
            title="Featured Links"
            type="image link"
            styles={{ height: "32", bg: "#393087" }}
            url="https://zora.co"
            image="https://ipfs.io/ipfs/bafkreib3qy7f7fa7ipcl3rtvyxpczfow4yh4b5mvxih6kmb3hs6xsfuo2y"
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "340px", width: "100%" }}>
          <LinksSlider />
        </SwiperSlide>
        <SwiperSlide
          style={{ height: "340px", width: notMobile ? "100%" : "300px" }}
        >
          <Link
            title="chart"
            type="token chart"
            styles={{ size: "sm", type: "direct", bg: "#000000", height: "32" }}
            content={
              '{"symbols":[{"value":"COINBASE:ETHUSDT|1D","label":"ETHUSDT"}],"changeMode":"percent-only","type":"area"}'
            }
            url=""
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "340px", width: "100%" }}>
          <Link
            title="block"
            type="block"
            url=""
            content="ipfs://QmZ4uPaFWDyKtLn1wnbrVWCXqQAkWvN1Bj7GA7Eq4vNXD9/block"
            styles={{ size: "md", bg: "#086faa" }}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{ height: "340px", width: notMobile ? "100%" : "300px" }}
        >
          <Link
            title="tweet"
            type="tweet"
            url="https://x.com/base/status/1849150859277369436"
            styles={{ size: "sm", color: "light" }}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{ height: "340px", width: notMobile ? "100%" : "300px" }}
        >
          <Link
            title="youtube"
            type="youtube video"
            styles={{ height: "32" }}
            url="https://youtu.be/khZrWdAOirw?si=QY7RefMq8CWDRe68"
          />
        </SwiperSlide>
        {/* <SwiperSlide style={{ height: "340px", width: "100%" }}>
          <PSNProfile
            styles={{
              bg: "linear-gradient(0deg, #f5f5f5 0.00%,#fff8e2 90.00%)",
              size: "lg",
            }}
            title="PSN User"
            content={JSON.stringify({
              username: "sam_shariat",
              avatar: "https://i.psnprofiles.com/avatars/m/Ga68313504.png",
              level: 22,
              levelProgress: "75",
              comment: "2735C",
              trophies: {
                total: 52,
                platinum: 0,
                gold: 5,
                silver: 10,
                bronze: 37,
              },
              stats: {
                gamesPlayed: 13,
                completedGames: 0,
                completionRate: "18.01%",
                unearnedTrophies: 279,
                trophiesPerDay: "0.02",
                views: 22,
                worldRank: "4,228,252",
                countryRank: "1,369,697",
              },
              recentTrophies: [
                {
                  name: "Champion",
                  description: "Win the Season Championship",
                  game: "Rocket League",
                  rarity: "27.36%",
                  type: "Gold",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/5S6ca0eb.png",
                },
                {
                  name: "Stocked",
                  description: "Collect 150 Items",
                  game: "Rocket League",
                  rarity: "42.16%",
                  type: "Gold",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/2Sce14a7.png",
                },
                {
                  name: "Hot Shot, Part Two",
                  description:
                    "Win the MVP award using Backfire, Scarab, or Zippy",
                  game: "Rocket League",
                  rarity: "24.63%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/50S7dec20.png",
                },
                {
                  name: "Car Collector",
                  description: "Collect 5 Cars",
                  game: "Rocket League",
                  rarity: "50.10%",
                  type: "Silver",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/8Sd3a1b4.png",
                },
                {
                  name: "Hit the Dojo",
                  description: "Enter Practice mode",
                  game: "Mortal Kombat X",
                  rarity: "51.66%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/149d39/trophies/31Sf3139b.png",
                },
                {
                  name: "Damage Control",
                  description: "Win a Dropshot match via shutout",
                  game: "Rocket League",
                  rarity: "28.67%",
                  type: "Silver",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/74S377214.png",
                },
                {
                  name: "Break Shot",
                  description:
                    "Score a goal by hitting your opponent into the ball",
                  game: "Rocket League",
                  rarity: "58.24%",
                  type: "Silver",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/14S8fe7ab.png",
                },
                {
                  name: "Moving Up",
                  description: "Reach personal level 10 in XP",
                  game: "Mortal Kombat X",
                  rarity: "60.18%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/149d39/trophies/15S452981.png",
                },
                {
                  name: "Welcome to Los Santos",
                  description:
                    "You repo'd a car and raced it through the heart of a sun-soaked metropolis.",
                  game: "Grand Theft Auto V",
                  rarity: "89.71%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/bdb66f/trophies/2S5b0083.png",
                },
                {
                  name: "Brutal End",
                  description: "Perform 1 Brutality",
                  game: "Mortal Kombat X",
                  rarity: "48.09%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/149d39/trophies/38Sd1f4c7.png",
                },
                {
                  name: "Far, Far Away...",
                  description: "Drive a total of 50 km",
                  game: "Rocket League",
                  rarity: "45.21%",
                  type: "Gold",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/3S3b403c.png",
                },
                {
                  name: "Buck Private",
                  description:
                    "Get 10 kills in Multiplayer while playing online.",
                  game: "Call of Duty: WWII",
                  rarity: "70.37%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/79c5a1/trophies/37S62c4ab.png",
                },
              ],
              games: [
                {
                  name: "Call of Duty: Modern Warfare",
                  platform: "",
                  trophies: { total: 28, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/6e774f/Scb3483.png",
                },
                {
                  name: "Rocket League",
                  platform: "",
                  trophies: { total: 88, gold: 5, silver: 10, bronze: 26 },
                  completion: "44%",
                  rank: "B",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/Sf07239.png",
                },
                {
                  name: "FIFA 19",
                  platform: "",
                  trophies: { total: 42, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/577b51/Sea0a9c.png",
                },
                {
                  name: "Mortal Kombat X",
                  platform: "",
                  trophies: { total: 74, gold: 0, silver: 0, bronze: 7 },
                  completion: "8%",
                  rank: "D",
                  imageUrl:
                    "https://i.psnprofiles.com/games/149d39/Sdbaff1.png",
                },
                {
                  name: "The Last of Us Remastered",
                  platform: "",
                  trophies: { total: 50, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/acbfe8/S50ff88.png",
                },
                {
                  name: "Let It Die",
                  platform: "",
                  trophies: { total: 14, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/f76ac5/S79d953.png",
                },
                {
                  name: "Grand Theft Auto V",
                  platform: "",
                  trophies: { total: 78, gold: 0, silver: 0, bronze: 1 },
                  completion: "1%",
                  rank: "E",
                  imageUrl:
                    "https://i.psnprofiles.com/games/bdb66f/S686730.png",
                },
                {
                  name: "Crossout",
                  platform: "",
                  trophies: { total: 13, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/e3064b/Sc03204.png",
                },
                {
                  name: "Call of Duty: WWII",
                  platform: "",
                  trophies: { total: 91, gold: 0, silver: 0, bronze: 3 },
                  completion: "2%",
                  rank: "E",
                  imageUrl:
                    "https://i.psnprofiles.com/games/79c5a1/Sd24d1d.png",
                },
                {
                  name: "Pro Evolution Soccer 2015",
                  platform: "",
                  trophies: { total: 41, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/1036d9/S144a10.png",
                },
                {
                  name: "Alienation",
                  platform: "",
                  trophies: { total: 42, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/ba513e/Sf80477.png",
                },
                {
                  name: "Big City Stories",
                  platform: "",
                  trophies: { total: 14, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/5d5672/S958b46.png",
                },
                {
                  name: "Mafia III",
                  platform: "",
                  trophies: { total: 86, gold: 0, silver: 0, bronze: 0 },
                  completion: "0%",
                  rank: "F",
                  imageUrl:
                    "https://i.psnprofiles.com/games/c07e1a/Sbebf47.png",
                },
              ],
              rarestTrophies: [
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/6e774f/Scb3483.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/Sf07239.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/577b51/Sea0a9c.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/149d39/Sdbaff1.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/acbfe8/S50ff88.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/f76ac5/S79d953.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/bdb66f/S686730.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/e3064b/Sc03204.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/79c5a1/Sd24d1d.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/1036d9/S144a10.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/ba513e/Sf80477.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/5d5672/S958b46.png",
                },
                {
                  name: "",
                  game: "",
                  rarity: "",
                  type: "unknown",
                  imageUrl:
                    "https://i.psnprofiles.com/games/c07e1a/Sbebf47.png",
                },
                {
                  name: "White Knuckles",
                  game: "Call of Duty: WWII",
                  rarity: "7.75%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/79c5a1/trophies/51Sb47677.png",
                },
                {
                  name: "Full Course",
                  game: "Rocket League",
                  rarity: "14.53%",
                  type: "Silver",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/75S8be5b1.png",
                },
                {
                  name: "Buzzer Beater",
                  game: "Rocket League",
                  rarity: "17.71%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/60Sfa053a.png",
                },
                {
                  name: "Fast Break",
                  game: "Rocket League",
                  rarity: "19.37%",
                  type: "Bronze",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/59Sc7cefe.png",
                },
                {
                  name: "Buckminster x10",
                  game: "Rocket League",
                  rarity: "21.01%",
                  type: "Gold",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/76Sa5c7ee.png",
                },
              ],
              trophyMilestones: [
                {
                  name: "Tinkerer",
                  game: "Rocket League",
                  milestone: "First Trophy",
                  timeAgo: "7 years ago",
                  imageUrl:
                    "https://i.psnprofiles.com/games/13f789/trophies/33S4347c5.png",
                },
              ],
            })}
          />
        </SwiperSlide> */}

        {/* <SwiperSlide
          style={{
            height: "330px",
            width: "100%",
            placeContent: "start",
            placeItems: "center",
            background: "#00000077",
            borderRadius: "16px",
          }}
        >
          <Center w={["260px", "260px", "260px"]} position={"relative"}>
            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
              <IconCloud iconSlugs={SOCIALS.map((s) => s.key.toLowerCase())} />
            </div>
          </Center>
        </SwiperSlide> */}
        <SwiperSlide
          style={{
            height: "340px",
            width: "100%",
            borderRadius: "16px",
            placeContent: "center",
            backgroundColor: "#232323ee",
          }}
        >
          <Link
            type="nft gallery"
            title=""
            url=""
            styles={{
              effect: "cards",
              mode: "slider",
              color: "#ffffff77",
              nav: true,
              navColor: "#ffffff",
              size: notMobile ? "md" : "sm",
              height: notMobile ? "28" : "16",
              position: "cover",
              type: "collection",
              eth: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
              slides: 2,
              centered: true,
              auto: true,
              network: "ethereum",
            }}
            color={"dark"}
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
