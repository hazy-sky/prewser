import axios from "axios";
import { Block } from "baseui/block";
import { Button, SIZE } from "baseui/button";
import { H1, Label1, Label2 } from "baseui/typography";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Viewer } from "../components/viewer";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Spinner } from "baseui/spinner";
import { readString } from "react-papaparse";
import { Layout } from "../components/Layout";
import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  NumericalColumn,
  StringColumn,
  COLUMNS,
  NUMERICAL_FORMATS,
} from "baseui/data-table";
import { Table } from "../components/Table";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import { Player } from "../components/Player";

const idsComps: any = {
  "1": "Multiple Choices",
  "2": "Short Text",
  "3": "Long Text",
  "4": "Code",
  "5": "Statement",
  "6": "Email",
};

const Submissions: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [surveyState, setSurveyState] = useState<any>([
    { name: "Page 0", components: [] },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const answers = {};
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any>();
  const [cols, setCols] = useState<any>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [code, setCode] = useState("");

  let query = router.asPath.split("?")[1];
  let id = null;
  if (query !== undefined) {
    id = query.substr(7);
  }

  useEffect(() => {
    if (!query) return;
    if (!id) setError(true);

    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(
        `https://survey-manager-v1.herokuapp.com/api/Surveys/${id}/answers`,
        config
      )
      .then((res) => {
        console.log(res);
        let columns = [];
        let myrows = [];
        if (res.data.length == 0) {
          return;
        }

        columns.push(
          StringColumn({
            title: "#",
            mapDataToValue: (data) => data[0],
          })
        );
        let ccounter = 0;
        for (let index = 0; index < res.data[0].answers.length; index++) {
          const answer = res.data[0].answers[index];
          if ((answer as any).question.typeId === 4) {
            columns.push(
              CustomColumn({
                title: "Code",
                mapDataToValue: (data) => data[index + 1],
                renderCell: function Cell(props) {
                  return (
                    <Block alignItems="center" width="100%">
                      <Button
                        size={SIZE.mini}
                        onClick={() => {
                          setIsOpen(true);
                          setCode(props.value);
                          console.log(props);
                        }}
                      >
                        Code
                      </Button>
                    </Block>
                  );
                },
              })
            );
            ccounter += 1;
          } else {
            columns.push(
              StringColumn({
                title: (answer as any).question.title,
                mapDataToValue: (data) => data[index + 1],
              })
            );
            ccounter += 1;
          }
        }

        let rcounter = 0;
        for (const submission of res.data) {
          let counter = 0;
          let sub = [];
          sub.push(`${rcounter}`);

          for (const answer of (submission as any).answers) {
            sub.push(answer.text);
          }
          myrows.push(sub);
          rcounter++;
        }

        console.log(myrows);
        setCols(columns);
        // let newarray = (results.data as any).splice(1, results.data.length - 2);
        setRows(myrows.map((r) => ({ id: String(r[0]), data: r })));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  function close() {
    setIsOpen(false);
  }

  return !error ? (
    !loading ? (
      <Layout size="100%">
        <Modal
          overrides={{
            Dialog: {
              style: {
                width: "80vw",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
              },
            },
          }}
          onClose={close}
          isOpen={isOpen}
        >
          <ModalHeader>Play the Code</ModalHeader>
          <ModalBody style={{ flex: "1 1 0" }}>
            <Player code={code} />
          </ModalBody>
          <ModalFooter>
            <ModalButton kind="tertiary" onClick={close}>
              Cancel
            </ModalButton>
          </ModalFooter>
        </Modal>
        <Block width="60%" margin="0 auto">
          <Table drows={rows} cols={cols} />
        </Block>
      </Layout>
    ) : (
      <Layout>
        <Block marginBottom="15%" width="60%" margin="0 auto">
          <Block text-align="center">
            <Spinner size={96} />
          </Block>
        </Block>
      </Layout>
    )
  ) : (
    <Block marginTop="8%" width="60%" margin="0 auto">
      <Block text-align="center" marginTop="0">
        <H1>No submissions yet</H1>
      </Block>
    </Block>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Submissions);
