import { Button, Checkbox } from "@chakra-ui/react";
import { autocompletion } from "@codemirror/autocomplete";
import { basicSetup, EditorState, EditorView } from "@codemirror/basic-setup";
import { python } from "@codemirror/lang-python";
import { rectangularSelection } from "@codemirror/rectangular-selection";
import { oneDark } from "@codemirror/theme-one-dark";
import { tooltips } from "@codemirror/tooltip";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useRef, useState } from "react";
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

export const Code: NextPage = () => {
  const [edit, setEdit] = useState(false);
  const [output, setOutput] = useState(``);
  const [viewd, setViewd] = useState<any>();
  const [, setIsLoading] = useState(false);
  const [socketId] = useState("");
  const [, setRunning] = useState(false);

  useEffect(() => {
    if (edit) return;

    setEdit(true);
  }, []);

  // const runCode = () => {
  //   setIsLoading(true);
  //   setRunning(true);
  //   let javaCode = viewd.viewState.state.doc.text;
  //   axios
  //     .post("http://localhost:3000/session", {
  //       sessid: "asasdfsdfff",
  //       code: javaCode,
  //       socketId: socketId,
  //       language: "Python",
  //       languageExt: "py",
  //     })
  //     .then((res) => {
  //       if (res.data === "done") {
  //         setRunning(false);
  //       }
  //       setIsLoading(false);
  //     });

  //   setOutput("");
  //   let outputs = [""];
  //   socket.on("output", (msg) => {
  //     setIsLoading(false);
  //     outputs.push(msg);
  //     setTimeout(() => setOutput(output + outputs.join("")), 100);
  //   });

    // socket.emit("init", {
    //   host: "localhost",
    //   port: 5901,
    //   password: "vncpassword",
    // });

    socket.on("error", (msg) => {
      setIsLoading(false);
      outputs.push(msg);
      setTimeout(() => setOutput(output + outputs.join("")), 100);
    });
    socket.on("running", (msg) => {
      setIsLoading(false);
    });
  };

  const stop = () => {
    axios
      .post("http://localhost:3000/stop", {
        sessid: "asasdfsdf",
      })
      .then(() => {
        setIsLoading(false);
        setRunning(false);
      });
  };

  return (
    <div className="App">
      {/* <div className="run-cont">
        <Button
          isLoading={isLoading}
          colorScheme={running ? "red" : "green"}
          onClick={running ? stop : run}
          variant="solid"
        >
          {running ? "Stop" : "Run"}
        </Button>
      </div> */}
      <div
        style={{
          display: "inline-flex",
          width: "100%",
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
              instance = editor;
            }}
          />
        </div>
        <div style={{ width: "calc(50%) " }}>
          <div
            style={{
              padding: "20px",
              color: "white",
              border: "none",
              backgroundColor: "#2c313a",
            }}
          >
            <p>{output}</p>
          </div>
        </div>
      </div>

      {/* <canvas
        ref={canvas}
        style={{
          margin: "20px",
          backgroundColor: "white",
          width: "400px",
          height: "400px",
        }}
      ></canvas> */}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Code);
