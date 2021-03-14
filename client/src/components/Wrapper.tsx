import React from "react";
import { Block } from "baseui/block";

interface WrapperProps {
  varient?: "small" | "regular" | "home";
  size?: any;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  varient = "regular",
  size,
}) => {
  return (
    <Block
      width={size == undefined ? "60%" : size}
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
