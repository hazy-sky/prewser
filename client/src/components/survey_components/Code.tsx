import { Box, Text } from "@chakra-ui/react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button, KIND } from "baseui/button";
import { Tab, Tabs } from "baseui/tabs-motion";
import { Paragraph3 } from "baseui/typography";
import React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";

if (typeof navigator !== "undefined") {
  require("codemirror/mode/clike/clike");
  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/display/panel");
  require("codemirror/addon/search/match-highlighter");
  require("codemirror/addon/hint/show-hint");
  require("codemirror/addon/display/fullscreen");
  require("codemirror/addon/edit/closebrackets");
  require("codemirror/mode/javascript/javascript");
}

interface CodeProps {
  varient?: "small" | "regular";
}

export const Code: React.FC<CodeProps> = () => {
  // const {
  //   connectors: { drag },
  // } = useNode();
  const [css, theme] = useStyletron();
  // const {
  //   connectors: { drag },
  // } = useNode();

  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <Block
      // ref={drag}
      width="70%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }: { activeKey: any }) => {
          setActiveKey(activeKey);
        }}
        activateOnFocus
      >
        <Tab title="Code">
          <Block position="relative">
            <CodeMirror
              value='System.out.println("Hello, World!"); '
              options={{
                fullscreen: true,
                mode: "text/x-java",
                autocompletion: true,
                highlightSelectionMatches: true,
                styleActiveLine: true,
                autoCloseTags: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                theme: "3024-day",
                lineNumbers: true,
              }}
              onChange={(editor, data, value) => {
                console.log(value);
              }}
              editorDidMount={(editor) => {
                editor.setSize("100%", 400);
              }}
            />
            <Block
              position="absolute"
              bottom="0"
              right="0"
              marginBottom="10px"
              marginRight="10px"
              vertical-align="text-bottom"
              z-index="3"
            >
              <Button kind={KIND.secondary} shape="circle">
                <FontAwesomeIcon icon={faPlay} style={{ marginLeft: "3px" }} />
              </Button>
            </Block>
          </Block>
        </Tab>
        <Tab title="Output">
          <Block
            overflow-wrap="break-word"
            word-wrap="break-word"
            backgroundColor={theme.colors.inputFill}
            height="400px"
            overflow-y="scroll"
          >
            <div style={{ overflow: "scroll", height: "100%" }}>
              <Paragraph3 margin="0" padding="12px">
                asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
              </Paragraph3>
            </div>
          </Block>
        </Tab>
      </Tabs>
    </Block>
  );
};
