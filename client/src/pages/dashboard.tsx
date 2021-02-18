import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import { Table } from "baseui/table-semantic";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { ButtonGroup } from "baseui/button-group";
import { Label2, Label3 } from "baseui/typography";
import { StatefulPopover } from "baseui/popover";
import { NestedMenus, StatefulMenu } from "baseui/menu";
import { Plus } from "baseui/icon";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import axios from "axios";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";

const Dashboard: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [surveys, setSurveys] = useState<any>([]);
  const [numS, setNumS] = useState<any>(0);
  const [privacy, setPrivacy] = React.useState(false);

  useIsAuth();

  useEffect(() => {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("https://survey-manager-v1.herokuapp.com/api/Surveys/GetAll", config)
      .then((response) => {
        const newState = [];
        setNumS(response.data.length - 1);
        for (let i = 0; i < response.data.length; i++) {
          // console.log(response.data[i].share);
          newState.push([
            <Label2 $style={{ textAlign: "center", paddingTop: "10px" }}>
              {response.data[i].title}
            </Label2>,
            <Label2 $style={{ textAlign: "center", paddingTop: "10px" }}>
              {response.data[i].description}
            </Label2>,
            <Label2 $style={{ textAlign: "center", paddingTop: "10px" }}>
              {response.data[i].shareUsers.length}
            </Label2>,
            <Block>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    console.log(response.data[i]);
                    // router.push(
                    //   "/survey-creator?survey=" +
                    //     response.data[i].share.uniqueId
                    // );
                  }}
                >
                  View
                </Button>
                <Button
                  onClick={() => {
                    router.push(
                      "/survey-creator?survey=" + response.data[i].id
                    );
                  }}
                >
                  Edit
                </Button>
                <Button>Remove</Button>
              </ButtonGroup>
            </Block>,
          ]);
        }
        setSurveys(newState);
        console.log(response);
      });
  }, [numS]);

  return (
    <Layout>
      <Block>
        <StatefulPopover
          content={({ close }) => (
            <Block padding={"30px"}>
              <Formik
                onSubmit={async (value) => {
                  let config = {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  };
                  const response = await axios
                    .post(
                      "https://survey-manager-v1.herokuapp.com/api/Surveys",
                      {
                        title: value.surveyname,
                        description: value.description,
                      },
                      config
                    )
                    .catch((error) => console.log(error));
                  setNumS(numS + 1);
                  close();
                }}
                initialValues={{ surveyname: "", description: "" }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField label="Name of the survey:" name="surveyname" />
                    <InputField label="Description:" name="description" />

                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      $style={{ marginTop: "10px" }}
                    >
                      Create
                    </Button>
                    <Checkbox
                      checked={privacy}
                      onChange={(e) => {
                        setPrivacy((e.target as any).checked);
                      }}
                      labelPlacement={LABEL_PLACEMENT.right}
                    >
                      Private
                    </Checkbox>
                  </Form>
                )}
              </Formik>
            </Block>
          )}
          returnFocus
          autoFocus
        >
          <Button $style={{ width: "100%" }}>Create a survey</Button>
        </StatefulPopover>
      </Block>
      <Table
        columns={["Name", "description", "Number of Submissions", "Actions"]}
        data={[...surveys]}
      />
      <Block marginTop="40px" marginBottom="200px">
        <Table
          columns={["Templates", "Actions"]}
          data={[
            [
              <Label2 $style={{ textAlign: "center", paddingTop: "10px" }}>
                Exam
              </Label2>,
              <Button>Use</Button>,
            ],
          ]}
        />
      </Block>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Dashboard);
