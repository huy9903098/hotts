import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { PostsDisplay } from "../components/PostsDisplay";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <>
      <Layout>
        <PostsDisplay />
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
