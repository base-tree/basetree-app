import React from "react";
import { Box, Text } from "@chakra-ui/react"; // Assuming Chakra UI is used for styling
import AnimateOnScroll from "../animate/AnimateOnScroll";
import { TalentPassport } from "@/types";
import { useAtomValue } from "jotai";
import { passportAtom } from "@/core/atoms";

interface BioWithLinksProps {
  bio: string;
  _passport?: TalentPassport;
}

const BioWithLinks: React.FC<BioWithLinksProps> = ({
  bio,
  _passport
}) => {
  const parseBio = (text: string) => {
    const words = text.split(/(\s+)/); // Split by spaces, keeping the spaces
    return words.map((word, index) => {
      // Check if the word is a space
      if (/^\s+$/.test(word)) {
        return word; // Return spaces as is
      }

      // Remove trailing punctuation from the word
      const trimmedWord = word.replace(/[.,!?;:]$/, "");

      // Check if the word is a full URL (with or without http(s)://)
      const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\.?)(\/\S*)?$/;
      if (urlRegex.test(trimmedWord)) {
        const href = trimmedWord.startsWith("http")
          ? trimmedWord
          : "https://" + trimmedWord;
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {trimmedWord}
            {word.slice(trimmedWord.length)} {/* Add back any punctuation */}
          </a>
        );
      }

      // Return the word as is if it's not a link
      return <span key={index}> {word} </span>;
    });
  };

  const passport: TalentPassport = _passport ?? useAtomValue(passportAtom);

  return (
    <AnimateOnScroll delay={1.7} styles={{ width: "100%" }}>
      <Box
        fontWeight="normal"
        fontSize={['lg','lg','xl']}
        textAlign="center"
      >
        {bio !== '' ? parseBio(bio) : passport && passport.passport_profile && passport.passport_profile.bio ? parseBio(passport.passport_profile.bio) : ''}
      </Box>
    </AnimateOnScroll>
  );
};

export default BioWithLinks;