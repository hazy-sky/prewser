import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import { Button, Checkbox } from "@chakra-ui/react";
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
          }}
        >
          <Text style={{ marginTop: "10px" }} fontSize="lg">
            Code....
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
            <p>
              {
                "asdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdfasdfdasdf"
              }
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};
