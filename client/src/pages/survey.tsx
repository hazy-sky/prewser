import { Block } from "baseui/block";
import { H1 } from "baseui/typography";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Dashboard: React.FC<{}> = ({}) => {
  return (
    <Block
      marginTop="8%"
      width="60%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      margin="0 auto"
    >
      <Block text-align="center">
        <H1>Survey</H1>
      </Block>
    </Block>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Dashboard);
