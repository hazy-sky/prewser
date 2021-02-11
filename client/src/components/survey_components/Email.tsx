import React from "react";
import { Box } from "@chakra-ui/react";
import { useNode } from "@craftjs/node";

interface EmailProps {
  varient?: "small" | "regular";
}

export const Email: React.FC<EmailProps> = ({
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
