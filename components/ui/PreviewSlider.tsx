import React, { useEffect } from "react";
import { Flex, Text, keyframes } from "@chakra-ui/react";
import { Autoplay, EffectFlip } from "swiper/modules";
import { SwiperSlide, Swiper} from "swiper/react";
import { Link } from "components/Profile";
import { LinkIcon } from "components/logos";
import PreviewCard from "components/Profile/PreviewCard";
import { BG_COLORS_SAMPLE } from "core/utils/constants";
import 'swiper/css';
import 'swiper/css/effect-flip';
export const PreviewSlider = () => {
  return (
    <Flex w={'100%'}>
      <Swiper
        className="preview-swiper"
        style={{ height: "300px", width: "100%", borderRadius: '24px' }}
        loop
        grabCursor
        effect={"flip"}
        autoplay={{ delay: 2500 }}
        direction={"vertical"}
        modules={[EffectFlip, Autoplay]}
        slidesPerView={1}
      >
        <SwiperSlide style={{ height: "300px" , width : '100%'}}>
        <PreviewCard title="John Due" subtitle="Base User" name="john.bst" avatarColor={BG_COLORS_SAMPLE[7]} bg="#434343" font="Poppins"/>
        </SwiperSlide>
        <SwiperSlide style={{ height: "300px" , width : '100%'}}>
        <PreviewCard title="Sam" subtitle="Base User" name="scoop.bst" avatarColor={BG_COLORS_SAMPLE[1]} bg={BG_COLORS_SAMPLE[16]} font="Poppins"/>
        </SwiperSlide>
        <SwiperSlide style={{ height: "300px" , width : '100%'}}>
        <PreviewCard title="Jackson" subtitle="Base User" name="jack.bst" avatarColor={BG_COLORS_SAMPLE[6]} bg={BG_COLORS_SAMPLE[20]} font="Poppins"/>
        </SwiperSlide>
        <SwiperSlide style={{ height: "300px" , width : '100%'}}>
        <PreviewCard title="Lizzie" subtitle="Base User" name="lizz.bst" avatarColor={BG_COLORS_SAMPLE[4]} bg={BG_COLORS_SAMPLE[17]} font="Poppins"/>
        </SwiperSlide>
        <SwiperSlide style={{ height: "300px" , width : '100%'}}>
        <PreviewCard title="Ram Des" subtitle="Base User" name="raam.bst" avatarColor={BG_COLORS_SAMPLE[12]} bg={BG_COLORS_SAMPLE[29]} font="Poppins"/>
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
