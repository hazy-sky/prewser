import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import { Checkbox } from "@chakra-ui/react";
import { autocompletion } from "@codemirror/autocomplete";
import { basicSetup, EditorState, EditorView } from "@codemirror/basic-setup";
import { python } from "@codemirror/lang-python";
import { rectangularSelection } from "@codemirror/rectangular-selection";
import { oneDark } from "@codemirror/theme-one-dark";
import { tooltips } from "@codemirror/tooltip";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { Tabs, Tab } from "baseui/tabs-motion";
import { Block } from "baseui/block";
import { Button, SHAPE, KIND } from "baseui/button";
import { Upload } from "baseui/icon";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyletron } from "baseui";
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
import { Layout } from "../Layout";

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

export const Code: React.FC<CodeProps> = ({
  children,
  varient = "regular",
}) => {
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
        onChange={({ activeKey }) => {
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

  return (
    <Box>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#2c313a",
            padding: "8px",
          }}
        >
          <Text style={{ marginTop: "7px", marginLeft: "13px" }} fontSize="lg">
            Code ....
          </Text>
          <div style={{ display: "flex" }}>
            <Text
              style={{ marginTop: "6px", marginRight: "10px" }}
              fontSize="lg"
            >
              Time: 100000
            </Text>
            <Button size="md" border="2px" borderColor="green.500">
              Run
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div id="editor" style={{ width: "calc(50%)" }}>
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
                theme: "dracula",
                lineNumbers: true,
              }}
              onChange={(editor, data, value) => {
                console.log(value);
              }}
              editorDidMount={(editor) => {
                editor.setSize("100%", 400);
              }}
            />
          </div>
          <div
            style={{
              width: "calc(50%)",
              marginLeft: "4px",
              height: "400px",
              padding: "20px",
              color: "white",
              border: "none",
              backgroundColor: "#2c313a",
              overflow: "scroll",
            }}
          >
            <p></p>
          </div>
        </div>
      </div>
    </Box>
  );
};
