import { Block } from "baseui/block";
import { Textarea } from "baseui/textarea";
import { Label3 } from "baseui/typography";
import React from "react";

export const LongText = ({ label }) => {
  // const {
  //   connectors: { drag },
  // } = useNode();
  const [value, setValue] = React.useState("Hello");

  return (
    <Block
      // ref={drag}
      width="70%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <Label3 style={{ marginBottom: "10px" }}>{label}</Label3>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled Input"
        clearOnEscape
      />
    </Block>
  );
};
