import React from "react";
import { Block } from "baseui/block";

interface WrapperProps {
  varient?: "small" | "regular" | "home";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  varient = "regular",
}) => {
  return (
    <Block
      width="60%"
      display="flex"
      flexDirection="column"
      text-align="center"
      justifyContent="center"
      margin="0 auto"
      marginTop="12%"
    >
      {children}
    </Block>
  );
};
