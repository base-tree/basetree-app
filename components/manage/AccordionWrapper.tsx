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
} from '@chakra-ui/react';
import { LinkIcon } from '../logos';

interface Props {
  title: string;
  defaultOpen?: boolean;
  icon?: string;
  children: JSX.Element;
}

export default function AccordionWrapper({title, defaultOpen, icon, children}: Props) {
  const { colorMode } = useColorMode();

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
          _expanded={{ bgColor: 'blackAlpha.50' }}>
          <Flex gap={2} alignItems={'center'} textAlign="left" width={'100%'}>
            {icon && <LinkIcon type={icon} size={22}/>}
            <Text fontWeight={'bold'} display={'flex'} flex={1} fontSize={'xl'}>
              {title}
            </Text>
            <AccordionIcon />
          </Flex>
        </AccordionButton>

        <AccordionPanel py={4} minWidth="100%">
          <Stack gap={4}>
            {children}
          </Stack>
        </AccordionPanel>
       </AccordionItem>
     </Accordion>
  );
}
