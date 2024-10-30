"use client";
import { Text, Textarea, useColorMode, useToast } from "@chakra-ui/react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { upload } from "thirdweb/storage";
import { client } from 'components/walletConnect';
import { IPFS_IO_URL, MAX_FILE_UPLOAD } from "@/core/utils/constants";

export default function ManageBlock({
  type,
  title,
  content,
  styles,
  setStyles,
  setContent,
}) {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const editor = useCreateBlockNote({
    initialContent: content ? JSON.parse(content) : [{ type: "paragraph" }],
    uploadFile: async (file)=> {
      console.log('uploading',file)
      if (file.size > MAX_FILE_UPLOAD) {
        toast({
          status: 'warning',
          title: 'File is too big',
          description:
            'Maximum upload file size is 5 MB. please select an smaller file',
          isClosable: true,
        });
        return undefined;
      }
      const formData = [file];
      const uris = await upload({ client, files: formData});
      const hash = uris.toString().slice(7);
      return (IPFS_IO_URL + hash);
    }
  });

  return (
    <>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          // Saves the document JSON to state.
          setContent(
            JSON.stringify(
              editor.document.map((item) => {
                return {
                  type: item.type,
                  content: item.content,
                  props: item.props,
                };
              })
            )
          );
        }}
      />
    </>
  );
}