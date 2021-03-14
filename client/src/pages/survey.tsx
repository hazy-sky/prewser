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
import { jsonToCSV } from "react-papaparse";

const Survey: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [surveyState, setSurveyState] = useState<any>([
    { name: "Page 0", components: [] },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

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

    const newState = [];

    axios
      .get(`https://survey-manager-v1.herokuapp.com/api/Surveys/Get?uid=${id}`)
      .then((spage) => {
        console.log("spage");
        console.log(spage);
        setName((spage as any).data.title);
        setDescription((spage as any).data.description);

        (spage as any).data.pages.forEach((page: any) => {
          newState.push({ name: page.title, components: [] });
          console.log("gg");
          console.log(page);
          if (page.questions)
            page.questions.forEach((question) => {
              newState[parseInt(page.order)].components.push(
                JSON.stringify({
                  type: idsComps[`${question.typeId}`],
                  label: question.title,
                  default: "",
                  extra: JSON.parse(question.answerSchema),
                  selected: false,
                  id: question.id,
                })
              );
            });
        });

        setLoading(false);

        if (newState.length > 0) {
          setSurveyState(newState);
        } else {
          return [{ name: "Page 0", components: [] }];
        }
      })
      .catch((err) => setError(true));
  }, []);

  const submit = () => {
    // {
    //   "answers": [
    //     {
    //       "questionId": 0,
    //       "text": "string"
    //     }
    //   ],
    //   "extraDetails": "string",
    //   "email": "user@example.com",
    //   "uid": "string"
    // }

    const banswers = [];

    for (const [key, value] of Object.entries(answers)) {
      banswers.push({
        questionId: parseInt(key),
        text: JSON.stringify(value),
      });
    }

    const requestb = { answers: banswers, extraDetails: "string", uid: id };
    console.log(requestb);

    axios
      .post(
        "https://survey-manager-v1.herokuapp.com/api/Surveys/results",
        requestb
      )
      .then((res) => {
        console.log(res);
        setDone(true);
      });
  };

  return !error ? (
    !loading ? (
      !done ? (
        <Block marginTop="5%" width="79%" margin="0 auto">
          <Block text-align="center" marginTop="0">
            <Block>
              {currentPage == 0 ? <H1>{name}</H1> : null}
              {currentPage == 0 ? <Label1>{description}</Label1> : null}
            </Block>
            <Viewer
              setAnswers={setAnswers}
              answers={answers}
              state={surveyState[currentPage]}
            ></Viewer>

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
                onClick={submit}
              >
                Submit
              </Button>
            </Block>
          </Block>
        </Block>
      ) : (
        <Block marginTop="8%" width="60%" margin="0 auto">
          <Block text-align="center" marginTop="0">
            <H1>Thanks for the submission</H1>
          </Block>
        </Block>
      )
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
