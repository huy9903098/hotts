import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack
} from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const [keyword, setKeyword] = useState(null as null | string);
  const handleChange = (event: any) =>
    setKeyword(event.target.value ? event.target.value : "");
  return (
    <Stack>
      <InputGroup size="md">
        <Input
          value={keyword ? keyword : ""}
          onChange={handleChange}
          pr="4.5rem"
          placeholder="Enter keyword"
        />
        <InputRightElement>
          <NextLink
            href={keyword ? "/search/[key]": '/'}
            as={keyword ? `/search/${encodeURI(keyword)}` : `/`}
          >
            <IconButton as={Link} icon="search" aria-label="Edit Post" />
          </NextLink>
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
};
