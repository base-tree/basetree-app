"use client";
import { Styles } from "types";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Box, Flex } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { roundAtom } from "@/core/atoms";


export default function Block({ title, content, style }) {
  const editor = useCreateBlockNote({ initialContent: content ? JSON.parse(content) : [ {type : 'paragraph'}], defaultStyles: {borderRadius : '16px'}});
  const bg = style?.bg ? style?.bg : 'transparent';
  const round = style?.round ? style?.round : useAtomValue(roundAtom);
  return (
    <>
      <Box w={'100%'} rounded={round} p={3} bg={bg} key={`block-box-${bg}-${content ? content.length : 'empty'}`}>
        <BlockNoteView
          data-block-view
          editor={editor}
          key={`block-box-${bg}-${content ? content.length : 'empty'}`}
          editable={false}
          theme={'dark'}
        />
      </Box>
    </>
  );
}
