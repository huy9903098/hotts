import { Box, Button, Flex, Heading, IconButton, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { SearchBar } from "./SearchBar";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;
  if (fetching) {
    body = null;
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Button variant="outline" borderColor="#5c9dc0" color="#5c9dc0" mr={4}>
          <NextLink href="/login">
            <Link>Login</Link>
          </NextLink>
        </Button>

        <Button backgroundColor="#02699c" color="white">
          <NextLink href="/register">
            <Link>Register</Link>
          </NextLink>
        </Button>
      </>
    );
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button
            variant="outline"
            borderColor="#5c9dc0"
            color="#5c9dc0"
            as={Link}
            mr={4}
          >
            create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          color="#02699c"
          variant="link"
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      mb={8}
      zIndex={1}
      position="sticky"
      top={0}
      style={{ borderBottom: "1px solid #edeff1" }}
      bg="white"
      p={4}
    >
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading fontSize={28}>
              <IconButton
                aria-label="Search database"
                size="lg"
                icon="chat"
                backgroundColor="#02699c"
                color="white"
                isRound
              />{" "}
              HOTTS
            </Heading>
          </Link>
        </NextLink>
        <Box ml="auto">
          <SearchBar />
        </Box>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
