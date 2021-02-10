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
  require("codemirror/addon/search/match-highlighter");
  require("codemirror/addon/hint/show-hint");
  require("codemirror/addon/display/fullscreen");
  require("codemirror/addon/edit/closebrackets");
  require("codemirror/mode/javascript/javascript");
}

export const Code: NextPage = () => {
  const [edit, setEdit] = useState(false);
  const [output, setOutput] = useState(``);
  const [doc, setDoc] = useState("");
  const [viewd, setViewd] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [socketId, setSocketId] = useState("");
  const [running, setRunning] = useState(false);
  const [containerId, setContainerId] = useState("");
  const [language, setLanguage] = useState("java");
  const canvas = useRef();

  useEffect(() => {
    if (edit) return;

    // socket.on("connection:sid", function (socketId: string) {
    //   setSocketId(socketId);
    // });

    const state = EditorState.create({
      doc: doc,
      extensions: [
        basicSetup,
        python(),
        oneDark,
        autocompletion(),
        tooltips(),
        rectangularSelection(),
      ],
    });

    // let editorview = new EditorView({
    //   state,
    //   parent: document.querySelector("#editor") as Element,
    // });

    // setViewd(editorview);
    // viewd.state.create({ doc: "123" });
    setEdit(true);
  }, []);

  let code = `public class main {
    public static void main(String[] args) {
      System.out.println("Hello world..!!!");
    }
  }`;

  const run = () => {
    // runCode();
    console.log(viewd.viewState?.state);
  };

  const drawRect = (rect) => {
    let image = new Image();
    image.width = rect.width;
    image.height = rect.height;
    image.src = "data:image/png;base64," + rect.image;
    image.onload = () => {
      canvas.current.drawImage(rect.x, rect.y, rect.width, rect.height);
    };
  };

  const addMouseHandler = (cb) => {
    let state = 0;
    canvas.current.addEventListener(
      "mousedown",
      (e) => {
        state = 1;
        cb.call(null, e.pageX, e.pageY, state);
        e.preventDefault();
      },
      false
    );
    canvas.current.addEventListener(
      "mouseup",
      (e) => {
        state = 0;
        cb.call(null, e.pageX, e.pageY, state);
        e.preventDefault();
      },
      false
    );
    canvas.current.addEventListener("mousemove", (e) => {
      cb.call(null, e.pageX, e.pageY, state);
      e.preventDefault();
    });
  };

  const addKeyboardHandlers = (cb) => {
    document.addEventListener(
      "keydown",
      (this._onkeydown = function (e) {
        cb.call(null, e.keyCode, e.shiftKey, 1);
        e.preventDefault();
      }),
      false
    );
    document.addEventListener(
      "keyup",
      (this._onkeyup = function (e) {
        cb.call(null, e.keyCode, e.shiftKey, 0);
        e.preventDefault();
      }),
      false
    );
  };

  const removeHandlers = () => {
    document.removeEventListener("keydown", this._onkeydown);
    document.removeEventListener("keyup", this._onkeyup);
    canvas.removeEventListener("mouseup", this._onmouseup);
    canvas.removeEventListener("mousedown", this._onmousedown);
    canvas.removeEventListener("mousemove", this._onmousemove);
  };

  const runCode = () => {
    setIsLoading(true);
    setRunning(true);
    let javaCode = viewd.viewState.state.doc.text;
    axios
      .post("http://localhost:3000/session", {
        sessid: "asasdfsdfff",
        code: javaCode,
        socketId: socketId,
        language: "Python",
        languageExt: "py",
      })
      .then((res) => {
        if (res.data === "done") {
          setRunning(false);
        }
        setIsLoading(false);
      });

    setOutput("");
    let outputs = [""];
    socket.on("output", (msg) => {
      setIsLoading(false);
      outputs.push(msg);
      setTimeout(() => setOutput(output + outputs.join("")), 100);
    });

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
      <div className="run-cont">
        <Button
          isLoading={isLoading}
          colorScheme={running ? "red" : "green"}
          onClick={running ? stop : run}
          variant="solid"
        >
          {running ? "Stop" : "Run"}
        </Button>
      </div>
      <div style={{ margin: "20px" }}>
        <p style={{ fontSize: "18px" }}>Code:</p>
        <div style={{ outline: "none" }} id="editor">
          <CodeMirror
            value="<h1>I ♥ react-codemirror2</h1>"
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
          />
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <p style={{ fontSize: "18px" }}>Output:</p>
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
        <Checkbox style={{ margin: "20px" }}>Uses Graphics</Checkbox>
      </div>
      <canvas
        ref={canvas}
        style={{
          margin: "20px",
          backgroundColor: "white",
          width: "400px",
          height: "400px",
        }}
      ></canvas>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Code);
