import { Heading } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostsDisplay } from "../../components/PostsDisplay";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Search = ({}) => {
  const router = useRouter();
  const keyword =
    typeof router.query.key === "string" ? decodeURI(router.query.key) : null;
  return (
    <Layout>
      <>
        <Heading mb={10} textAlign="center">
          Search by key word "{keyword}"
        </Heading>
        <PostsDisplay keyword={keyword} />
      </>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Search);
