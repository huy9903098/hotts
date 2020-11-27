import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CommentDisplay } from "../../components/CommentDisplay";
import { EditDeletePostButton } from "../../components/EditDeletePostButton";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { PostsDisplay } from "../../components/PostsDisplay";
import { UpdootSection } from "../../components/UpdootSection";
import {
  useCreateCommentMutation,
  useGetCommentByPostIdQuery,
  usePostQuery
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { differentDate } from "../../utils/differentDate";

const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, createComment] = useCreateCommentMutation();

  const [
    { data: commentsData, error: commentError, fetching: commentFetching },
  ] = useGetCommentByPostIdQuery({
    variables: {
      postId: intId,
      limit: 15,
      cursor: null as null | string,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>...Loading</div>
      </Layout>
    );
  }

  if (commentError) {
    return (
      <Layout>
        <Box>{commentError.message}</Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box>{error.message}</Box>
      </Layout>
    );
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <Stack mb={4} spacing={8}>
          <Flex shadow="md" p={5} borderWidth="1px">
            <UpdootSection
              post={{
                id: data.post.id,
                voteStatus: data.post.voteStatus,
                points: data.post.points,
              }}
            />

            <Box width="100%">
              <Flex alignItems="center" justifyContent="space-between">
                <Box>
                  <Heading fontSize="xl">{data.post.title}</Heading>
                  <Text fontSize={14} color="gray.500">
                    ({differentDate(data.post.createdAt)})
                  </Text>
                </Box>
                <EditDeletePostButton
                  id={data.post.id}
                  creatorId={data.post.creator.id}
                />
              </Flex>

              <Box mt={4} mb={4}>
                Posted by{" "}
                <NextLink
                  href="/user/[id]"
                  as={`/user/${data.post.creator.id}`}
                >
                  <Link>
                    <b>{data.post.creator.username}</b>
                  </Link>
                </NextLink>
              </Box>

              <Box>{data.post.text}</Box>
              <Box mt={5}>
                <Button>Comments</Button>
                <Divider />
                <Formik
                  initialValues={{ text: "", postId: intId }}
                  onSubmit={async (values, { resetForm }) => {
                    const { error } = await createComment({ input: values });
                    if (!error) {
                      router.push(`/post/${intId}`);
                      resetForm();
                    }
                  }}
                >
                  {({ isSubmitting }) => {
                    return (
                      <Form>
                        <Box mt={4}>
                          <InputField
                            textarea
                            name="text"
                            placeholder="text..."
                          />
                        </Box>

                        <Button
                          type="submit"
                          variantColor="teal"
                          mt={4}
                          isLoading={isSubmitting}
                        >
                          Add Comment
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
              <Box mt={5} backgroundColor="gray">
                {!commentsData && commentFetching ? (
                  <div>Loading ...</div>
                ) : (
                  // <Button onClick={()=>{
                  //   console.log('commentsData',commentsData?.getCommentByPostId.comments)
                  // }}>
                  //   Check data
                  // </Button>
                  <>
                    {commentsData!.getCommentByPostId.comments
                      ? commentsData!.getCommentByPostId.comments.map(
                          (comment) => (
                            <Stack
                              key={comment.id}
                              pb={5}
                              mb={5}
                              mt={5}
                              style={{
                                borderBottom: "1px solid rgb(230, 230, 230)",
                              }}
                            >
                              <CommentDisplay comment={comment} />
                            </Stack>
                          )
                        )
                      : null}
                  </>
                )}
              </Box>
            </Box>
          </Flex>
        </Stack>
        <PostsDisplay exceptionId={data.post.id} />
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
