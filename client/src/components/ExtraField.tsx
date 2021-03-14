import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
// import {
//   Box,
//   FormLabel,
//   FormErrorMessage,
//   Textarea,
//   Input,
//   FormControl,
// } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type ExtraFieldProps = {
  label: string;
  value: string | Array<string>;
  change: any;
};

export const ExtraField: React.FC<ExtraFieldProps> = ({
  label,
  value,
  change,
  ...props
}) => {
  return (
    <FormControl label={() => "Default: "} error={() => ""} caption={() => ""}>
      <Input
        value={value as string}
        onChange={(e) => {
          setSurveyState([
            ...surveyState.slice(0, currentPage),
            {
              ...surveyState[currentPage],
              name: (e.target as InputProps).value,
            },
            ...surveyState.slice(currentPage + 1),
          ]);
        }}
      />
    </FormControl>
  );
};
