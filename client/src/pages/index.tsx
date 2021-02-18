import { Block } from "baseui/block";
import { H1 } from "baseui/typography";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useStyletron } from "baseui";
import { Gradient } from "react-gradient";
import { Code } from "../components/survey_components/Code";
import { useRouter } from "next/router";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: { limit: 10 },
  });
  const router = useRouter();
  const [css] = useStyletron();
  console.log(router);
  return (
    <Layout>
      {/* <NextLink href="/create-post">
        <Link>Create Post</Link>
      </NextLink> */}

      <Block>
        <Gradient
          gradients={[["#A0BFF9", "#5B91F4"]]}
          property="background"
          duration={3000}
          angle="45deg"
        >
          <H1
            $style={{
              textAlign: "center",
              height: "100px",
              paddingTop: "45px",
            }}
          >
            Create surveys with ease
          </H1>
        </Gradient>
      </Block>
      {fetching && !data ? <div>Loading...</div> : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
