import React from "react";
import { Box } from "@chakra-ui/react";
import { useNode } from "@craftjs/node";

interface PlainTextProps {
  varient?: "small" | "regular";
}

export const PlainText: React.FC<PlainTextProps> = ({
  children,
  varient = "regular",
}) => {
  return (
    <Box
      maxW={varient === "regular" ? "800px" : "400px"}
      w="100%"
      mt={10}
      mx="auto"
    >
      {children}
    </Box>
  );
};
