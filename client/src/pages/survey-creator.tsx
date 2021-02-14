import { Block } from "baseui/block";
import { Breadcrumbs } from "baseui/breadcrumbs";
import { Button } from "baseui/button";
import { List } from "baseui/dnd-list";
import { FormControl } from "baseui/form-control";
import { ChevronDown, ChevronRight, Plus } from "baseui/icon";
import { Input } from "baseui/input";
import { StyledLink } from "baseui/link";
import { StatefulMenu } from "baseui/menu";
import { PLACEMENT, StatefulPopover } from "baseui/popover";
import { Tab, Tabs } from "baseui/tabs";
import {
  TreeLabel,
  TreeLabelProps,
  TreeNode,
  TreeView,
} from "baseui/tree-view";
import { Label2 } from "baseui/typography";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Code } from "../components/survey_components/Code";
import { Email } from "../components/survey_components/Email";
import { LongText } from "../components/survey_components/LongText";
import { MultipleChoice } from "../components/survey_components/MutlipleChoice";
import { PlainText } from "../components/survey_components/PlainText";
import { ShortText } from "../components/survey_components/ShortText";
import { createUrqlClient } from "../utils/createUrqlClient";

const availableComps = [
  { label: "Code" },
  { label: "Email" },
  { label: "Long Text" },
  { label: "Short Text" },
  { label: "Multiple Choices" },
  { label: "Plain Text" },
];

function move(
  arr: Array<string | undefined>,
  old_index: number,
  new_index: number
) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length;
    while (k-- + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

const CustomDragHandle = (props) => {
  useEffect(() => {}, []);

  let newob = JSON.parse(props.$value);
  let element = null;
  switch (newob.type) {
    case "Email":
      element = <Email label={newob.label} defaults={newob.default} />;
      break;
    case "Plain Text":
      element = <PlainText label={newob.label} />;
      break;
    case "Multiple Choices":
      element = <MultipleChoice label={newob.label} />;
      break;
    case "Short Text":
      element = <ShortText label={newob.label} />;
      break;
    case "Long Text":
      element = <LongText label={newob.label} />;
      break;
    case "Code":
      element = <Code />;
      break;
  }

  return <>{element}</>;
};

const CustomLabel = (node: TreeNode) => {
  const Tag = "label";

  const style = node.selected ? { textDecoration: "underline" } : null;
  return <Tag style={style}>{node.label}</Tag>;
};

const CustomTreeLabel = (props: TreeLabelProps) => {
  return (
    <TreeLabel
      {...props}
      label={CustomLabel}
      overrides={{
        CollapseIcon: {
          component: ChevronDown as any,
          props: {
            size: (5 - props.node.depth) * 10,
          },
        },
        ExpandIcon: {
          component: ChevronRight as any,
          props: {
            size: (5 - props.node.depth) * 10,
          },
        },
      }}
    />
  );
};

const SurveyCreator: React.FC<{}> = ({}) => {
  const router = useRouter();
  const survey = {};
  const [activeItemId, setActiveItemId] = React.useState("#primary");
  const [surveyState, setSurveyState] = React.useState<any>([
    { name: "page 0", components: [] },
  ]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentElement, setCurrentElemenet] = React.useState<
    number | undefined
  >(undefined);
  const [activeKey, setActiveKey] = React.useState("0");

  const [expandedState, setExpandedState] = useState({ "0": false });
  const [selectedState, setSelectedState] = useState({ "0": false });

  const clear = () => {
    const n = {};
    n[`${currentPage}-${currentElement}`] = false;
    n[`${currentPage}`] = false;

    setSelectedState({ ...surveyState, ...n });
  };

  const deletePage = () => {
    // console.log(currentPage);
    // console.log(currentElement);
    if (surveyState.length === 1) {
      return;
    }
    const newState = [...surveyState];
    newState.splice(currentPage, 1);
    if (currentPage == 0) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 1);
    }
    setSurveyState(newState);
  };

  const mapState = (state) => {
    let newState = [];
    // { name: "page 0", components: [] },
    for (let i = 0; i < state.length; i++) {
      let newChildren = [];
      if (expandedState[`${i}`] == undefined) {
        const n = {};
        n[`${i}`] = false;
        setExpandedState({ ...expandedState, ...n });
      }

      if (selectedState[`${i}`] == undefined) {
        const n = {};
        n[`${i}`] = false;
        setSelectedState({ ...selectedState, ...n });
      }

      for (let j = 0; j < state[i].components.length; j++) {
        if (expandedState[`${i}-${j}`] == undefined) {
          const n = {};
          n[`${i}-${j}`] = false;
          setExpandedState({ ...expandedState, ...n });
        }

        if (selectedState[`${i}-${j}`] == undefined) {
          const n = {};
          n[`${i}-${j}`] = false;
          setSelectedState({ ...selectedState, ...n });
        }

        newChildren.push({
          id: `${i}-${j}`,
          label: `${JSON.parse(state[i].components[j]).label} (${
            JSON.parse(state[i].components[j]).type
          })`,
          isExpanded: expandedState[`${i}-${j}`],
          selected: selectedState[`${i}-${j}`],
        });
      }
      newState.push({
        id: `${i}`,
        label: state[i].name,
        children: newChildren,
        isExpanded: expandedState[`${i}`],
        selected: selectedState[`${i}`],
      });
    }

    return newState;
  };

  return (
    <Block>
      <NavBar />
      <Block
        position="fixed"
        left="0"
        marginLeft="0px"
        marginTop="0"
        width="240px"
        overflow-wrap="break-word"
        word-wrap="break-word"
        height="100%"
        overflow="scroll"
        overflow-y="scroll"
        overflow-x="hidden"
      >
        <StatefulPopover
          focusLock
          placement={PLACEMENT.bottomRight}
          content={({ close }) => (
            <StatefulMenu
              items={[{ label: "Add page" }, { label: "Add component" }]}
              onItemSelect={async (item) => {
                if (item.item.label === "Add page") {
                  setSurveyState([
                    ...surveyState,
                    { name: "page " + currentPage + 1, components: [] },
                  ]);
                  setCurrentPage(currentPage + 1);
                }
              }}
              overrides={{
                List: { style: { height: "72px", width: "138px" } },
                Option: {
                  props: {
                    getChildMenu: (item: { label: string }) => {
                      if (item.label === "Add component") {
                        return (
                          <StatefulMenu
                            items={availableComps}
                            onItemSelect={async (item) => {
                              await setSurveyState([
                                ...surveyState.slice(0, currentPage),
                                {
                                  ...surveyState[currentPage],
                                  components: [
                                    ...surveyState[currentPage].components,
                                    JSON.stringify({
                                      type: item.item.label,
                                      label: "Label",
                                      default: "",
                                      extra: "",
                                      selected: false,
                                    }),
                                  ],
                                },
                                ...surveyState.slice(currentPage + 1),
                              ]);
                            }}
                          />
                        );
                      }
                    },
                  },
                },
              }}
            />
          )}
        >
          <Button
            style={{ width: "calc(100%)" }}
            startEnhancer={() => <Plus size={24} />}
          >
            Add Element
          </Button>
        </StatefulPopover>
      </Block>
      <Block
        position="fixed"
        left="0"
        marginLeft="0px"
        marginTop="52px"
        width="240px"
        overflow-wrap="break-word"
        word-wrap="break-word"
        height="100%"
        overflow="scroll"
        overflow-y="scroll"
        overflow-x="hidden"
      >
        <Block>
          <Tabs
            onChange={({ activeKey }) => {
              setActiveKey(activeKey);
            }}
            activeKey={activeKey}
          >
            <Tab title="Hierarchy">
              {" "}
              <TreeView
                data={mapState(surveyState)}
                onToggle={async (node) => {
                  if (node.label.includes("page")) {
                    const n = {};
                    n[`${currentPage}`] = false;
                    n[`${currentPage}-${currentElement}`] = false;
                    n[`${node.id}`] = true;
                    setSelectedState({ ...selectedState, ...n });
                    setCurrentElemenet(undefined);
                    setCurrentPage(parseInt(node.id));
                  } else {
                    const n = {};
                    n[
                      `${node.id.split("-")[0]}-${node.id.split("-")[1]}`
                    ] = true;
                    n[`${node.id.split("-")[0]}`] = true;
                    n[`${currentPage}`] = false;
                    n[`${currentPage}-${currentElement}`] = false;
                    setSelectedState({ ...selectedState, ...n });
                    console.log(selectedState);
                    setCurrentElemenet(parseInt(node.id.split("-")[1]));
                    setCurrentPage(parseInt(node.id.split("-")[0]));
                    setActiveKey("1");
                  }
                  const n = {};
                  n[node.id as number] = !expandedState[node.id as number];
                  setExpandedState({ ...expandedState, ...n });
                }}
                overrides={{
                  TreeLabel: CustomTreeLabel,
                }}
              />
            </Tab>
            <Tab title="Properties">
              <Block>
                <Label2>Page:</Label2>

                <FormControl
                  label={() => "Page Name:"}
                  error={() => ""}
                  caption={() => ""}
                >
                  <Input
                    value={surveyState[currentPage].name}
                    onChange={(e) => {
                      setSurveyState([
                        ...surveyState.slice(0, currentPage),
                        {
                          ...surveyState[currentPage],
                          name: e.target.value,
                        },
                        ...surveyState.slice(currentPage + 1),
                      ]);
                    }}
                  />
                </FormControl>
                {currentElement != undefined && currentElement >= 0 ? (
                  <>
                    <Label2>Selected Component:</Label2>
                    <FormControl
                      label={() => "Label: "}
                      error={() => ""}
                      caption={() => ""}
                    >
                      <Input
                        value={
                          currentElement != undefined
                            ? JSON.parse(
                                surveyState[currentPage].components[
                                  currentElement
                                ]
                              ).label
                            : ""
                        }
                        onChange={(e) => {
                          if (currentElement === null || currentElement < 0) {
                            return;
                          }
                          let newElement = JSON.parse(
                            surveyState[currentPage].components[currentElement]
                          );
                          newElement.label = e.target.value;
                          setSurveyState([
                            ...surveyState.slice(0, currentPage),
                            {
                              ...surveyState[currentPage],
                              components: [
                                ...surveyState[currentPage].components.slice(
                                  0,
                                  currentElement
                                ),
                                JSON.stringify(newElement),
                                ...surveyState[currentPage].components.slice(
                                  (currentElement as number) + 1
                                ),
                              ],
                            },
                            ...surveyState.slice(currentPage + 1),
                          ]);
                        }}
                      />
                    </FormControl>
                    <FormControl
                      label={() => "Default: "}
                      error={() => ""}
                      caption={() => ""}
                    >
                      <Input
                        value={surveyState[currentPage].name}
                        onChange={(e) => {
                          setSurveyState([
                            ...surveyState.slice(0, currentPage),
                            {
                              ...surveyState[currentPage],
                              name: e.target.value,
                            },
                            ...surveyState.slice(currentPage + 1),
                          ]);
                        }}
                      />
                    </FormControl>
                  </>
                ) : null}
              </Block>
            </Tab>
          </Tabs>
        </Block>
      </Block>

      <StyledLink
        style={{
          position: "fixed",
          right: "0",
          marginRight: "70px",
          marginTop: "50px",
          color: "red",
        }}
        onClick={() => {
          deletePage();
        }}
      >
        Delete Page
      </StyledLink>

      <Block
        marginTop="35px"
        width="70%"
        display="flex"
        justifyContent="center"
        margin="0 auto"
      >
        <Breadcrumbs>
          {surveyState.map((p, index) => {
            return index == currentPage ? (
              <span>{p.name}</span>
            ) : (
              <StyledLink
                onClick={() => {
                  const n = {};
                  n[`${currentPage}`] = false;
                  n[`${currentPage}-${currentElement}`] = false;
                  n[`${index}`] = true;
                  setSelectedState({ ...selectedState, ...n });
                  setCurrentElemenet(undefined);
                  setCurrentPage(index);
                }}
                id={index}
              >
                {p.name}
              </StyledLink>
            );
          })}
        </Breadcrumbs>
      </Block>

      <Block
        width="60%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        margin="0 auto"
      >
        <List
          items={surveyState[currentPage].components}
          removable
          removableByMove
          overrides={{
            Label: {
              component: CustomDragHandle,
            },
          }}
          onChange={({ oldIndex, newIndex }) => {
            console.log(oldIndex, newIndex, currentElement);
            if (currentElement == oldIndex) {
              console.log("f");
              setCurrentElemenet(newIndex);
            }
            setSurveyState([
              ...surveyState.slice(0, currentPage),
              {
                ...surveyState[currentPage],
                components: [
                  ...move(
                    surveyState[currentPage].components,
                    oldIndex,
                    newIndex
                  ),
                ],
              },
              ...surveyState.slice(currentPage + 1),
            ]);
          }}
        />
      </Block>
    </Block>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(SurveyCreator);
