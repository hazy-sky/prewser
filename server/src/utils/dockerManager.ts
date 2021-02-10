import process from "child_process";
import fs from "fs";

const createFile = (
  language: string,
  sessid: string,
  languageExtension: string,
  code: string
) => {
  fs.mkdir(
    `src/containers/${language}/src/${sessid}`,
    { recursive: true },
    (x) => {
      fs.writeFile(
        `src/containers/${language}/src/${sessid}/main.${languageExtension}`,
        code,
        (err) => {
          if (err) console.log(err);
        }
      );
    }
  );
};

const createDockerContainer = (
  language: string,
  sessid: string,
  name: string
) => {
  process.exec(
    `docker build -f src/${language}/Dockerfile -t ${sessid} . --build-arg sessid=${sessid}`,
    (error, stdout, stderr) => {
      if (error) {
        return stderr;
        console.log(error);
      } else {
        console.log("hello");
        const javaRun = process.spawn(
          `docker run --name ${name} --memory="256m" -v asdfasdfqwe:/home ${sessid}`,
          [],
          { shell: true }
        );
        // if (req.body.socketId) {
        //   io.to(req.body.socketId).emit("running", true);
        // }

        javaRun.stderr.on("data", function (data) {
          //   if (req.body.socketId) {
          //     // console.log(data.toString());
          //     io.to(req.body.socketId).emit("output", data.toString());
          //   }
        });

        // if (req.body.socketId) {
        //   io.sockets.in(req.body.socketId).on("input", (input) => {
        //     console.log(input);
        //   });
        // }

        // javaRun.stdout.on("data", function (data) {
        //   if (req.body.socketId) {
        //     io.to(req.body.socketId).emit("output", data.toString());
        //   }
        // });

        // javaRun.on("close", () => {
        //   res.send("done");
        //   return;
        // });
      }
    }
  );
};
