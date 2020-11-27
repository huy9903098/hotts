import { Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import { useVoteMutation } from "../generated/graphql";

interface PostUpdoot{
  id: number;
  voteStatus: number | null | undefined;
  points: number | null | undefined;
}

interface UpdootSectionProps {
  post: PostUpdoot;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyItems="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          setLoadingState("updoot-loading");

          await vote({
            postId: post.id,
            value: 1,
          });

          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "updoot-loading"}
        icon="chevron-up"
        aria-label="updoot post"
      />
      {post.points}
      <IconButton
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });

          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "downdoot-loading"}
        icon="chevron-down"
        aria-label="downdoot post"
      />
    </Flex>
  );
};
