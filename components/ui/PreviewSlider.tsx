import React, { useEffect } from "react";
import { Flex, Text, keyframes } from "@chakra-ui/react";
import { Autoplay, EffectFlip } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

import { TEMPLATES } from "@/core/utils/templates";
import Preview from "../Profile/Preview";
export const PreviewSlider = () => {
  return (
    <Flex w={"100%"}>
      <Swiper
        className="preview-swiper"
        style={{ height: "600px", width: "100%", borderRadius: "24px" }}
        grabCursor
        effect={"flip"}
        autoplay={{ delay: 6500 }}
        modules={[EffectFlip, Autoplay]}
      >
        <SwiperSlide style={{ height: "580px", width: "100%" }}>
          <Preview key={TEMPLATES[0].name} json={TEMPLATES[0]} isStatic />
        </SwiperSlide>
        <SwiperSlide style={{ height: "580px", width: "100%" }}>
          <Preview key={TEMPLATES[1].name} json={TEMPLATES[1]} isStatic />
        </SwiperSlide>
        <SwiperSlide style={{ height: "580px", width: "100%" }}>
          <Preview key={TEMPLATES[2].name} json={TEMPLATES[2]} isStatic />
        </SwiperSlide>
        <SwiperSlide style={{ height: "580px", width: "100%" }}>
          <Preview key={TEMPLATES[3].name} json={TEMPLATES[3]} isStatic />
        </SwiperSlide>
        <SwiperSlide style={{ height: "580px", width: "100%" }}>
          <Preview key={TEMPLATES[4].name} json={TEMPLATES[4]} isStatic />
        </SwiperSlide>
        <SwiperSlide style={{ height: "580px", width: "100%" }}>
          <Preview key={TEMPLATES[5].name} json={TEMPLATES[5]} isStatic />
        </SwiperSlide>
        <SwiperSlide style={{ height: "580px", width: "100%" }}>
          <Preview key={TEMPLATES[6].name} json={TEMPLATES[6]} isStatic />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
