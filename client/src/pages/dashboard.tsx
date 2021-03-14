import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import { Table } from "baseui/table-semantic";
import { Button, KIND } from "baseui/button";
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
        console.log(response);
        setNumS(response.data.length - 1);
        for (let i = 0; i < response.data.length; i++) {
          // console.log(response.data[i].share);
          newState.push([
            <Label2 $style={{ textAlign: "center", paddingTop: "10px" }}>
              {response.data[i].title}
            </Label2>,
            <Label2 $style={{ textAlign: "center", paddingTop: "10px" }}>
              {response.data[i].numberOfResponses}
            </Label2>,
            <Block>
              <ButtonGroup>
                {response.data[i].share !== null ? (
                  <Button
                    onClick={() => {
                      router.push(
                        "/survey?id=" + response.data[i].share.uniqueId
                      );
                    }}
                  >
                    View
                  </Button>
                ) : null}
                <Button
                  onClick={() => {
                    router.push(
                      "/survey-creator?survey=" + response.data[i].id
                    );
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    router.push("/submissions?survey=" + response.data[i].id);
                  }}
                >
                  Submissions
                </Button>
                <Button
                  onClick={() => {
                    axios
                      .delete(
                        `https://survey-manager-v1.herokuapp.com/api/Surveys/${response.data[i].id}`,
                        config
                      )
                      .then(() => {
                        setNumS(numS + 1);
                      });
                  }}
                >
                  Remove
                </Button>
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
            <Block
              $style={{ border: "1px solid" }}
              backgroundColor="white"
              padding={"30px"}
            >
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
        columns={["Survey Name", "Number of Responses", "Actions"]}
        data={[...surveys]}
      />
      <Block marginTop="40px" marginBottom="200px">
        <Table
          columns={["Templates"]}
          data={[
            [
              <Label2
                $style={{
                  textAlign: "center",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Exam
              </Label2>,
            ],
          ]}
        />
      </Block>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Dashboard);
