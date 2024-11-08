import Link from "./Link";
import { Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { LinkIcon } from "components/logos";
import { linksArrayAtom } from "core/atoms";
import { capFirstLetter, setOrderInCustomLinks } from "core/utils";
import { CustomLink } from "types";
import { IPFS_IMAGE_URI } from "core/utils/constants";
import AnimateOpacity from "components/animate/AnimateOpacity";
import AnimateOnScroll from "components/animate/AnimateOnScroll";

interface Props {
  json: any;
  color?: string;
  title?: string;
}

export default function Links({ json, color, title }: Props) {
  const [linksArray, setLinksArray] = useAtom(linksArrayAtom);
  useEffect(() => {
    let _links: CustomLink[] = [];
    if (json?.links) {
      json?.links.map((link: CustomLink) => {
        _links.push({
          type: link.type,
          title: link.title,
          url: link.url,
          image: link.image,
          content: link.content,
          styles: link.styles,
        });
      });
    }

    if (_links.length > 0 && !title) {
      setLinksArray(setOrderInCustomLinks(_links));
    }
  }, []);
  

  return (
    <>
      {((linksArray.length > 0 && !title) || (json?.links && title)) && (
        <Stack gap={3} w={"100%"} align={"center"}>
          {/* @ts-ignore */}
          {(title && json.links ? json.links : linksArray).map((item, ind) => (
            <AnimateOnScroll
              styles={{overflow : 'visible', width:'100%'}}
              delay={ind * 0.2 + 2.5}
              key={`item-animate-${item.type}-${item.title}`}
            >
              <Link
                key={`item-${item.type}-${item.title}`}
                title={capFirstLetter(item.title)}
                url={String(item.url)}
                type={item.type}
                color={color ? color : "default"}
                icon={
                  <LinkIcon
                    type={item.styles?.icon ?? item.type}
                    line
                    size={
                      String(item.styles?.icon).includes(IPFS_IMAGE_URI)
                      ? item.styles?.size
                      : item.styles?.size === "sm"
                      ? "24px"
                      : item.styles?.size === "lg"
                      ? "36px"
                      : "28px"
                    }
                  />
                }
                image={item.image}
                content={item.content}
                styles={item.styles}
              />
            </AnimateOnScroll>
          ))}
        </Stack>
      )}
    </>
  );
}
