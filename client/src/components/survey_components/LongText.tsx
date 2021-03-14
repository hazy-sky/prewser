import { Block } from "baseui/block";
import { Textarea, TextareaProps } from "baseui/textarea";
import { Label3 } from "baseui/typography";
import React from "react";

export const LongText = ({
  label,
  answers,
  changeAnswers,
  id,
  setAnswers,
}: {
  label: string;
  answers?: any;
  changeAnswers?: any;
  setAnswers?: any;
  id?: any;
}) => {
  // const {
  //   connectors: { drag },
  // } = useNode();
  const [value, setValue] = React.useState("");

  return (
    <Block
      // ref={drag}
      width="70%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <Label3 $style={{ marginBottom: "10px" }}>{label}</Label3>
      <Textarea
        value={value}
        onChange={(e) => {
          setValue((e.target as TextareaProps).value as string);
          let nanswers = { ...answers };
          nanswers[id] = (e.target as TextareaProps).value as string;
          setAnswers({ ...nanswers });
        }}
        clearOnEscape
      />
    </Block>
  );
};
