import React, { useEffect } from "react";
import { Block } from "baseui/block";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { Resizable } from "re-resizable";
import { Button } from "baseui/button";

let CodePlay = null;
let CodeRecord = null;
if (typeof navigator !== "undefined") {
  let record = require("codemirror-record");
  CodePlay = record.CodePlay;
  CodeRecord = record.CodeRecord;
  require("codemirror/mode/clike/clike");
  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/display/panel");
  require("codemirror/addon/search/match-highlighter");
  require("codemirror/addon/hint/show-hint");
  require("codemirror/addon/display/fullscreen");
  require("codemirror/addon/edit/closebrackets");
  require("codemirror/mode/javascript/javascript");
}

export const Player = ({ code }: { code: any }) => {
  useEffect(() => {
    console.log(JSON.parse(code));
  }, []);

  return (
    <Block
      display="flex"
      flexDirection="column"
      text-align="center"
      justifyContent="center"
    >
      <Resizable
        defaultSize={{
          width: 320,
          height: 1000,
        }}
      >
        Sample with default size
        <CodeMirror
          value=""
          options={{
            fullscreen: true,
            mode: "text/x-java",
            autocompletion: true,
            highlightSelectionMatches: true,
            styleActiveLine: true,
            autoCloseTags: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            theme: "bespin",
            lineNumbers: true,
          }}
          // player={(c) => {}}
          onChange={(editor, data, value) => {}}
          editorDidMount={(editors) => {
            editors.setSize(1000, 500);
          }}
        />
        <Button onClick={close}>Play</Button>
      </Resizable>
    </Block>
  );
};
