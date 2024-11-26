import { Box, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { LinkIcon } from 'components/logos';
import { socialsArrayAtom } from 'core/atoms';
import SocialLink from './SocialLink';
import { capFirstLetter, getIconColor, withHttps } from 'core/utils';
import { ObjectItem } from 'types';
import AnimateScale from 'components/animate/AnimateScale';
import { getSocialTitle } from 'core/utils/constants';

interface Props {
  json: any;
  color?: string;
  title?: string;
  onlyIcons?: boolean;
}

export default function Socials({ json, color, onlyIcons, title }: Props) {
  const [socialsArray, setSocialsArray] = useState<ObjectItem[]>([]);
  const _onlyIcons = onlyIcons ? onlyIcons : false;

  useEffect(() => {
    let _socials: ObjectItem[] = [];
    for (const k in json.socials) {
      json.socials[k] && _socials.push({ key: k, value: json.socials[k] });
    }

    if (_socials.length !== socialsArray.length && !title) {
       
      setSocialsArray(_socials);
    }

    // console.log(_socials);
  }, []);

  return (
    <>
      <Box as={_onlyIcons ? Wrap : Flex} flexDirection={_onlyIcons ? 'row' : 'column'} gap={3} key={`social-${title}-links-${_onlyIcons ? 'icons' : 'buttons'}-box`} align={'center'} justify={'center'}>
        {(title ? json.socials : socialsArray).map(
          //@ts-ignore
          (item,ind) =>
            item.key && (
              <WrapItem key={`social-box-${ind}-${item.key}`} as={_onlyIcons ? WrapItem : Box} w={_onlyIcons ? 'auto' : '100%'}>
              <AnimateScale delay={(ind * 0.2) + 1} key={`animate-box-${ind}-${item.key}`}>
              <SocialLink
                key={`item-${item.key}-${title}-${ind}`}
                title={title ? item.key : String(getSocialTitle(item.key))}
                onlyIcon={_onlyIcons}
                color={color ? color : undefined}
                url={String(item.value)}
              />
              </AnimateScale>
              </WrapItem>
            )
        )}
      </Box>
    </>
  );
}
