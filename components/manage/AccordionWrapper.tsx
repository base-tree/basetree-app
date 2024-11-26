import {
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  Button,
  Flex,
  AccordionIcon,
  AccordionPanel,
  useColorMode,
  Tooltip,
  IconButton,
  useMediaQuery,
  Center,
} from '@chakra-ui/react';
import { LinkIcon } from '../logos';
import { ReactElement } from 'react';
import { useAtomValue } from 'jotai';
import { fontAtom, lightModeAtom } from '@/core/atoms';
import { Styles } from '@/types';

interface Props {
  title: string | ReactElement
  tooltip?: string | ReactElement
  defaultOpen?: boolean;
  icon?: string;
  children: JSX.Element;
  styles?: Styles;
}

export default function AccordionWrapper({title, defaultOpen, icon, children, tooltip, styles}: Props) {
  const { colorMode } = useColorMode();
  const font = useAtomValue(fontAtom);
  const lightMode = useAtomValue(lightModeAtom);

  return (
    <Accordion
      allowToggle
      allowMultiple={false}
      defaultIndex={!defaultOpen ? undefined : [0]}
      borderRadius={10}
      width={'100%'}
      size="lg"
      backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      display={'flex'}>
      <AccordionItem border={0} borderRadius={10} width={'100%'}>
        <AccordionButton
          minWidth={'100%'}
          as={Button}
          size="lg"
          height={'68px'}
          bgColor={colorMode === 'dark' ? 'whiteAlpha.50' : 'blackAlpha.50'}
          _hover={{bgColor : colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}}
          _expanded={{ bgColor: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100' }}>
          <Flex gap={2} alignItems={'center'} textAlign="left" width={'100%'}>
            {icon && <LinkIcon type={icon} size={'26px'}/>}
            <Flex fontWeight={'bold'} w={'100%'} fontSize={styles?.size ? styles.size : 'xl'} textAlign={'center'}>
              {title}
            </Flex>
            <AccordionIcon />
          </Flex>
        </AccordionButton>

        <AccordionPanel py={4} minWidth="100%">
          <Stack gap={4}>
            {children}
          </Stack>
          {tooltip && <Center pt={4}> {tooltip}</Center>}
        </AccordionPanel>
       </AccordionItem>
     </Accordion>
  );
}
