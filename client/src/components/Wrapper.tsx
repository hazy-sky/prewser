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
      width="40%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
      marginTop="15%"
    >
      {children}
    </Block>
  );
};
