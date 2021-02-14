import { Block } from "baseui/block";
import { H1 } from "baseui/typography";
import React from "react";

export const PlainText = ({ label }: { label: string }) => {
  // const {
  //   connectors: { drag },
  // } = useNode();

  return (
    <Block
      width="70%"
      // ref={drag}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <H1>{label}</H1>
    </Block>
  );
};
