import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import React, { useEffect } from "react";

export const ShortText = ({
  label,
  answers,
  id,
  setAnswers,
}: {
  label: any;
  answers?: any;
  id?: any;
  setAnswers?: any;
}) => {
  // const {
  //   connectors: { drag },
  // } = useNode();

  useEffect(() => {
    console.log(label);
  }, []);

  return (
    <Block
      width="70%"
      display="flex"
      // ref={drag}
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <FormControl label={() => label} error={() => ""} caption={() => ""}>
        <Input
          onChange={(e) => {
            let nanswers = { ...answers };
            nanswers[id] = (e.target as any).value as string;
            setAnswers({ ...nanswers });
          }}
        />
      </FormControl>
    </Block>
  );
};
