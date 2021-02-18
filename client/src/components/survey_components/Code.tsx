import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Button, KIND } from "baseui/button";
import { Tab, Tabs } from "baseui/tabs-motion";
import { Paragraph3 } from "baseui/typography";
import React, { useEffect, useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { isServer } from "../../utils/isServer";
import socketIOClient from "socket.io-client";
import { v4 } from "uuid";

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

const endpoint = "http://140.82.47.62/";
const socket = socketIOClient(endpoint);

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

  let records = useState<any>("");
  const [socketId, setSocketId] = useState("");

  const [activeKey, setActiveKey] = React.useState("0");
  const [recorder, setRecorder] = useState<any>("");
  const [output, setOutput] = useState(``);
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.on("connection:sid", function (socketId) {
      setSocketId(socketId);
    });
  }, []);

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
              value={code}
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
                setCode(value);
              }}
              editorDidMount={(editors) => {
                const codeRecorder = new CodeRecord(editors);
                codeRecorder.listen();
                // setInterval(() => {
                //   let records = codeRecorder.getRecords();
                //   // console.log(records);
                // }, 1000);
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
              <Button
                kind={KIND.secondary}
                shape="circle"
                onClick={() => {
                  axios
                    .post("http://140.82.47.62/session", {
                      sessid: v4(),
                      code: code,
                      socketId: socketId,
                      language: "Java",
                      languageExt: "java",
                    })
                    .then((response) => {
                      console.log(response);
                    });

                  setOutput("");
                  let outputs = [""];
                  socket.on("output", (msg) => {
                    console.log(msg);
                    outputs.push(msg);
                    setTimeout(() => setOutput(output + outputs.join("")), 100);
                  });
                }}
              >
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
                {output}
              </Paragraph3>
            </div>
          </Block>
        </Tab>
      </Tabs>
    </Block>
  );
};
