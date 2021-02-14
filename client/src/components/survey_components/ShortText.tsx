import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import React from "react";

export const ShortText = ({ label: any }) => {
  // const {
  //   connectors: { drag },
  // } = useNode();

  return (
    <Block
      width="70%"
      display="flex"
      // ref={drag}
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <FormControl
        label={() => {
          label;
        }}
        error={() => ""}
        caption={() => ""}
      >
        <Input />
      </FormControl>
    </Block>
  );
};
