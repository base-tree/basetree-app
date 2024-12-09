import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Autoplay} from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "components/Profile";
import { LinkIcon } from "components/logos";

export const LinksSlider = () => {
  return (
    <Flex w={"100%"}>
      <Swiper
        className="button-swiper"
        style={{ height: "340px", width: "100%" }}
        loop
        grabCursor
        effect={"slide"}
        autoplay={{ delay: 4000 }}
        direction={"vertical"}
        modules={[Autoplay]}
        spaceBetween={"20px"}
        slidesPerView={3}
      >
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Official Website"
            url="#"
            styles={{ size: "lg", variant: "solid" }}
            icon={<LinkIcon type={"basetree"} size={"40px"} />}
            color={"dark"}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Whitepaper"
            url="https://images.template.net/wp-content/uploads/2022/07/White-Papers-PDF.pdf"
            styles={{
              size: "lg",
              variant: "solid",
              font: "Lato",
              popup: true,
              type: 'modal'
              
            }}
            icon={<LinkIcon type={"whitepaper"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="payment button"
            title="Pay Me"
            url="#"
            styles={{
              size: "lg",
              variant: "solid",
              eth: "0x046fC1185e45224325f3191140fd236462574C07",
              btc: "tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7",
            }}
            icon={<LinkIcon type={"eth"} size={"40px"} />}
            color={"dark"}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Discord Server"
            url="#"
            styles={{
              size: "lg",
              variant: "solid",
              font: "DM Sans",
            }}
            icon={<LinkIcon type={"discord"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="onCyber Space"
            url="https://oncyber.io/the-garage"
            styles={{
              size: "lg",
              variant: "solid",
              popup: true,
              type: 'modal',
              font: "Space Mono",
            }}
            icon={<LinkIcon type={"RiBox3Line"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Medium Blog"
            url="#"
            styles={{
              size: "lg",
              variant: "solid",
              font: "Playfair Display",
            }}
            icon={<LinkIcon type={"medium"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="donate button"
            title="Buy Me A Coffee"
            url="#"
            content="Thank you for that coffee!"
            styles={{
              size: "lg",
              variant: "solid",
              eth: "0x046fC1185e45224325f3191140fd236462574C07",
              btc: "tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7",
              font: "Space Mono",
            }}
            icon={<LinkIcon type={"RiCupFill"} size={"40px"} />}
          />
        </SwiperSlide>
        

        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="embed"
            title="Submit Form"
            url="https://docs.google.com/forms/d/e/1FAIpQLSfXuEzmiAzRhie_z9raFCF1BXweXgVt18o-DvBuRRgyTygL2A/viewform"
            styles={{
              size: "lg",
              variant: "solid",
              type: 'modal',
              font: "Lato",
            }}
            icon={<LinkIcon type={"RiChatCheckLine"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Opensea"
            url="https://opensea.io/collection/cryptopunks"
            styles={{
              size: "lg",
              variant: "solid",
              font: "Pixelify Sans",
            }}
            icon={<LinkIcon type={"opensea"} size={"40px"} />}
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
