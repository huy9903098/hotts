import { Box, Flex, IconButton, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";
import { useDeleteCommentMutation, useMeQuery } from "../generated/graphql";
import { differentDate } from "../utils/differentDate";

interface CommentDisplayProps {
  comment: any;
}

export const CommentDisplay: React.FC<CommentDisplayProps> = ({ comment }) => {
  const [readMore, setReadMore] = useState(true);
  const [readMoreButton, setReadMoreButton] = useState(false);
  const [{ data: meData }] = useMeQuery();
  const [, deleteComment] = useDeleteCommentMutation();
  return (
    <Flex>
      <Box flex={1}>
        <Box mb={4}>
          <Text fontSize={26}>
            <NextLink href="/user/[id]" as={`/user/${comment.user.id}`}>
              <Link>
                <b>{comment.user.username}</b>
              </Link>
            </NextLink>
          </Text>
          <Text color="gray.500">({differentDate(comment.createdAt)})</Text>
        </Box>

        <Flex align="center">
          <Box>
            <Text
              pr={15}
              ref={(element) => {
                if (!element) return;
                const { clientHeight, scrollHeight } = element;
                if (scrollHeight > clientHeight) {
                  setReadMore(true);
                  setReadMoreButton(true);
                }
              }}
              style={
                readMore
                  ? {
                      whiteSpace: "pre-line",
                      maxWidth: "100%",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }
                  : { whiteSpace: "pre-line" }
              }
            >
              {comment.text}
            </Text>
            {readMoreButton && (
              <Link
                color="blue.400"
                onClick={() => {
                  setReadMore(!readMore);
                }}
              >
                {readMore ? "Show more" : "Hide"}
              </Link>
            )}
          </Box>

          <Box ml="auto">
            {meData?.me?.id === comment.userId && (
              <IconButton
                icon="delete"
                aria-label="Delete Comment"
                onClick={() => {
                  deleteComment({ id: comment.id });
                }}
              />
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
