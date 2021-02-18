import axios from "axios";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { H1, Label1, Label2 } from "baseui/typography";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Viewer } from "../components/viewer";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Spinner } from "baseui/spinner";

const Survey: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [surveyState, setSurveyState] = useState<any>([
    { name: "Page 0", components: [] },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const answers = [];
  const [loading, setLoading] = useState(true);

  const idsComps: any = {
    "1": "Multiple Choices",
    "2": "Short Text",
    "3": "Long Text",
    "4": "Code",
    "5": "Statement",
    "6": "Email",
  };
  let query = router.asPath.split("?")[1];
  let id = null;
  console.log(query);
  if (query !== undefined) {
    id = query.substr(3);
  }

  useEffect(() => {
    if (!query) return;
    if (!id) setError(true);

    axios
      .get(`https://survey-manager-v1.herokuapp.com/api/Surveys/Get?uid=${id}`)
      .then((response) => {
        console.log(response);
        if (!response) return;
        setName(response.data.title);
        setDescription(response.data.description);
        setLoading(false);
        let counter = 0;
        const newState: any = [];
        console.log(response);
        response.data.questions.forEach((question: any) => {
          if (counter > 20) {
            return;
          }
          counter += 1;
          if (newState[parseInt(question.pageNumber)] === undefined) {
            newState.push({
              name: `Page ${question.pageNumber}`,
              components: [],
            });
          }
          console.log("gg");
          newState[parseInt(question.pageNumber)].components.push(
            JSON.stringify({
              type: idsComps[`${question.typeId}`],
              label: question.title,
              default: "",
              extra: "",
              selected: false,
            })
          );
        });

        if (newState.length > 0) {
          console.log(newState);
          setSurveyState(newState);
        } else {
          return [{ name: "Page 0", components: [] }];
        }
      })
      .catch((err) => setError(true));
  }, []);

  return !error ? (
    !loading ? (
      <Block marginTop="5%" width="60%" margin="0 auto">
        <Block text-align="center" marginTop="0">
          <Block>
            {currentPage == 0 ? <H1>{name}</H1> : null}
            {currentPage == 0 ? <Label1>{description}</Label1> : null}
          </Block>
          <Viewer answers={answers} state={surveyState[currentPage]}></Viewer>

          <Block
            display="flex"
            marginTop="4%"
            justifyContent="space-around"
            marginBottom="100px"
          >
            <Button
              $style={{
                display: currentPage > 0 ? "block" : "none",
              }}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Prev
            </Button>
            <Button
              $style={{
                display:
                  surveyState.length - 1 <= currentPage ? "none" : "block",
              }}
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </Button>
            <Button
              $style={{
                display:
                  surveyState.length - 1 != currentPage ? "none" : "block",
              }}
              onClick={() => {}}
            >
              Submit
            </Button>
          </Block>
        </Block>
      </Block>
    ) : (
      <Block marginBottom="15%" width="60%" margin="0 auto">
        <Block text-align="center">
          <Spinner size={96} />
        </Block>
      </Block>
    )
  ) : (
    <Block marginTop="8%" width="60%" margin="0 auto">
      <Block text-align="center" marginTop="0">
        <H1>Wrong place :(</H1>
      </Block>
    </Block>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Survey);
