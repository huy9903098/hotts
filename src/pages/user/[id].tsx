import { Heading } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostsDisplay } from "../../components/PostsDisplay";
import { useUserByIdQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Search = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = useUserByIdQuery({
    variables: {
      id: intId,
    },
  });

  if (fetching && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <Layout>
      <>
        <Heading mb={10} textAlign="center">
          Posted by "{data?.userById?.username}"
        </Heading>
        <PostsDisplay creatorId={intId} />
      </>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Search);
