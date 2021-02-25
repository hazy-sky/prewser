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

export const MultipleChoice = ({
  label,
  extra,
  answers,
  id,
}: {
  label: string;
  extra: any;
  answers?: any;
  id?: any;
}) => {
  const [value, setValue] = React.useState("1");
  // const {
  //   connectors: { drag },
  // } = useNode();

  const choices = extra.Choices.split(",");

  console.log();
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
        {choices.map((element, key) => {
          return <Radio value={`${parseInt(key)}`}>{element}</Radio>;
        })}
      </RadioGroup>
    </Block>
  );
};
