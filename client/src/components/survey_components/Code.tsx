import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
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
import { Spinner } from "baseui/spinner";

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
  label?: any;
  extra?: any;
  answers?: any;
  id?: any;
}

export const Code: React.FC<CodeProps> = ({ label, extra, answers, id }) => {
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
  const [fullscreen, setFullscreen] = useState(false);
  const [running, setRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sessid = v4();

  useEffect(() => {
    socket.on("connection:sid", function (socketId) {
      setSocketId(socketId);
    });
  }, []);

  const stop = () => {
    axios
      .post("http://140.82.47.62/stop", {
        sessid: sessid,
      })
      .then(() => {
        setIsLoading(false);
        setRunning(false);
      });
  };

  const start = () => {
    setIsLoading(true);
    setRunning(true);
    setOutput("");
    axios
      .post("http://140.82.47.62/session", {
        sessid: sessid,
        code: code,
        socketId: socketId,
        language: "Java",
        languageExt: "java",
      })
      .then((res) => {
        if (res.data === "done") {
          setRunning(false);
        }
        setIsLoading(false);
      });

    let outputs = [""];
    socket.on("output", (msg) => {
      console.log(msg);
      outputs.push(msg);
      setTimeout(() => setOutput(output + outputs.join("")), 100);
    });

    socket.on("error", (msg) => {
      setIsLoading(false);
      outputs.push(msg);
      setTimeout(() => setOutput(output + outputs.join("")), 100);
    });

    socket.on("running", (msg) => {
      setIsLoading(false);
    });
  };

  return (
    <Block
      // ref={drag}

      width={!fullscreen ? "70%" : "100%"}
      display={!fullscreen ? "flex" : "block"}
      flexDirection={!fullscreen ? "column" : "initial"}
      justifyContent="center"
      margin="0 auto"
    >
      <Block>
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
          onChange={(editor, data, value) => {
            setCode(value);
          }}
          editorDidMount={(editors) => {
            editors.setValue("asdf");
            const codeRecorder = new CodeRecord(editors);
            editors.setOption("fullScreen", fullscreen);
            codeRecorder.listen();

            // setInterval(() => {
            //   let records = codeRecorder.getRecords();
            //   // console.log(records);
            // }, 1000);
          }}
        />
        <Block
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
            onClick={running ? stop : start}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <FontAwesomeIcon
                icon={running ? faStop : faPlay}
                style={{ marginLeft: "3px" }}
              />
            )}
          </Button>
        </Block>
      </Block>
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
    </Block>
  );
};
