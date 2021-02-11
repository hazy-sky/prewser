import React from "react";
import { Box } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";

interface LongTextProps {
  text: string;
}

export const LongText = ({ text = "" }) => {
  const {
    connectors: { drag },
  } = useNode();

  return (
    <Box
      ref={drag}
      //   maxW={varient === "regular" ? "800px" : "400px"}
      w="100%"
      mt={10}
      mx="auto"
    >
      <p>{text}</p>
    </Box>
  );
};
