import React, { useRef, useState } from 'react';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';
import { searchTag } from 'api/tag';
import useClickOutside from '../../hooks/useClickOutside';

type searchData = {
  items?: Item[];
};

type Item = {
  id?: string;
  name?: string;
  createdAt?: Date;
  deletedAt?: null;
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState<searchData | null>();
  const [onSuggestion, setOnSuggestion] = useState<boolean>(false);

  const toogle = useRef<any>(null);
  useClickOutside(toogle, () => {
    if (onSuggestion) setOnSuggestion(!onSuggestion);
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value === '' ? ' ' : e.currentTarget.value;
    searchTag({ tagName: value, limit: 3, page: 1 }).then((res) => {
      setSuggestion(res.data.data as searchData);
    });
  };

  return (
    <>
      <Box
        ref={toogle}
        position="absolute"
        bg="white"
        width={{ base: '263px', md: '50%' }}
        top="13px"
        zIndex={4}>
        <InputGroup border="white">
          <InputLeftElement
            ml={0}
            border="none"
            pointerEvents="none"
            children={<IoSearchOutline />}
          />

          <Input
            pl={8}
            pr={1}
            _hover={{
              borderColor: 'secondary.100',
            }}
            type="text"
            placeholder="Search team member and tags"
            onChange={onChange}
            onClick={() => setOnSuggestion(!onSuggestion)}
            onBlur={() => setOnSuggestion(onSuggestion)}
          />
        </InputGroup>
        <Flex
          flexDirection={'column'}
          position="absolute"
          w="100%"
          borderRadius="8"
          boxShadow={'0px 1px 15px #00000029'}>
          {onSuggestion &&
            suggestion?.items?.map((searchdata: any) => {
              return (
                <Text
                  px="5"
                  py="2"
                  key={searchdata.id}
                  borderRadius="8"
                  w="100%"
                  bg="white"
                  color="secondary.500"
                  _hover={{ bg: 'secondary.100' }}
                  onClick={() => navigate(`/tag/${searchdata.id}`)}>
                  {searchdata?.name}
                </Text>
              );
            })}
        </Flex>
      </Box>
    </>
  );
};
export default SearchBar;
