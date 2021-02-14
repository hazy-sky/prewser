import React from "react";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import {
  Label1,
  Label2,
  Label3,
  Label4,
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
} from "baseui/typography";
import { Block } from "baseui/block";
import { Navigation } from "baseui/side-navigation";
import { Canvas, useNode } from "@craftjs/core";

export const MultipleChoice = ({ label }: { label: string }) => {
  const [value, setValue] = React.useState("2");
  // const {
  //   connectors: { drag },
  // } = useNode();

  return (
    <Block
      width="70%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <Label3 $style={{ marginBottom: "10px" }}>{label as string}</Label3>
      <RadioGroup
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="number"
        align={ALIGN.vertical}
      >
        <Radio value="1">One</Radio>
        <Radio value="2" description="This is a radio description">
          Two
        </Radio>
        <Radio value="3">Three</Radio>
      </RadioGroup>
    </Block>
  );
};
