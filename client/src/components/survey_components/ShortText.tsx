import React from "react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Block } from "baseui/block";
import { useNode } from "@craftjs/core";

export const ShortText = ({ label }) => {
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
