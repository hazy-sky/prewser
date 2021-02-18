import React from "react";
import { Block } from "baseui/block";
import { MultipleChoice } from "./survey_components/MutlipleChoice";
import { ShortText } from "./survey_components/ShortText";
import { LongText } from "./survey_components/LongText";
import { Code } from "./survey_components/Code";
import { PlainText } from "./survey_components/PlainText";
import { Email } from "./survey_components/Email";
import { Label1 } from "baseui/typography";

interface ViewerProps {
  state: Array<any>;
  answers: Array<any>;
}

export const Viewer: React.FC<ViewerProps> = ({ state, answers }) => {
  const getComp = (
    type: string,
    label: string,
    defaults: string,
    extra: string
  ) => {
    const compsIds: any = {
      "Multiple Choices": <MultipleChoice label={label} />,
      "Short Text": <ShortText label={label} />,
      "Long Text": <LongText label={label} />,
      Code: <Code />,
      Statement: <PlainText label={label} />,
      Email: <Email label={label} defaults={defaults} />,
    };
    return compsIds[type];
  };

  return (
    <Block
      display="flex"
      flexDirection="column"
      text-align="center"
      justifyContent="center"
      margin="0 auto"
      marginTop="5%"
    >
      <Label1 $style={{ textAlign: "center", marginBottom: "50px" }}>
        {(state as any).name}
      </Label1>
      {(state as any).components.map((element) => {
        return (
          <Block marginBottom="40px">
            {getComp(
              JSON.parse(element).type,
              JSON.parse(element).label,
              JSON.parse(element).default,
              JSON.parse(element).extra
            )}
          </Block>
        );
      })}
    </Block>
  );
};
