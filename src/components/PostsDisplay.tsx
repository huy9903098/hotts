import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { usePostsQuery } from "../generated/graphql";
import { differentDate } from "../utils/differentDate";
import { EditDeletePostButton } from "./EditDeletePostButton";
import { UpdootSection } from "./UpdootSection";

interface PostsDisplayProps {
  exceptionId?: number;
  keyword?: string | null;
  creatorId?: number | null;
}

export const PostsDisplay: React.FC<PostsDisplayProps> = ({
  exceptionId,
  keyword,
  creatorId,
}) => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
    keyword,
    creatorId: null as null | number,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (fetching && !data) {
    return <div>You got no post for some reason</div>;
  }

  if (keyword || creatorId) {
    useEffect(() => {
      setVariables({
        limit: variables.limit,
        cursor: null,
        keyword: keyword ? keyword : null,
        creatorId: creatorId ? creatorId : null,
      });
    }, [keyword, creatorId]);
  }

  return (
    <>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8} pb={10}>
          {data!.posts.posts.length > 0
            ? data!.posts.posts.map((p) => {
                return p && p.id !== exceptionId ? (
                  <Flex
                    bg="white"
                    key={p.id}
                    shadow="md"
                    p={5}
                    borderWidth="1px"
                  >
                    <UpdootSection
                      post={{
                        id: p.id,
                        voteStatus: p.voteStatus,
                        points: p.points,
                      }}
                    />
                    <Box flex={1}>
                      <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                        <Link>
                          <Heading fontSize="xl">{p.title}</Heading>
                        </Link>
                      </NextLink>
                      <Text fontSize={14} color="gray.500">
                        ({differentDate(p.createdAt)})
                      </Text>

                      <Text>
                        posted by{" "}
                        <NextLink
                          href="/user/[id]"
                          as={`/user/${p.creator.id}`}
                        >
                          <Link>
                            <b>{p.creator.username}</b>
                          </Link>
                        </NextLink>
                      </Text>

                      <Flex align="center">
                        <Text mt={1}>{p.textSnippet}</Text>

                        <Box ml="auto">
                          <EditDeletePostButton
                            id={p.id}
                            creatorId={p.creator.id}
                          />
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                ) : null;
              })
            : null}
        </Stack>
      )}
      {data && data.posts.posts && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
                keyword,
                creatorId: null,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={4}
            backgroundColor="#5c9dc0"
            color="white"
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </>
  );
};
