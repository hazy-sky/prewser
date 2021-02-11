import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Editor, Frame, Canvas, Selector } from "@craftjs/core";
import { LongText } from "../components/survey_components/LongText";
import { Code } from "../components/survey_components/Code";

const SurveyCreator: React.FC<{}> = ({}) => {
  const router = useRouter();

  return (
    <div>
      <Code style={{ width: "500px" }}></Code>
      <header>Some fancy header or whatever</header>
      <Editor>
        // Editable area starts here
        <Frame resolver={{ LongText }}>
          <Canvas>
            <LongText text="I'm already rendered here" />
          </Canvas>
        </Frame>
      </Editor>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(SurveyCreator);
