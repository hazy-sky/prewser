import { H1 } from "baseui/typography";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: { limit: 10 },
  });

  return (
    <Layout>
      {/* <NextLink href="/create-post">
        <Link>Create Post</Link>
      </NextLink> */}
      <H1 $style={{ textAlign: "center" }}>Create surveys with ease</H1>
      {fetching && !data ? (
        <div>Loading...</div>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
