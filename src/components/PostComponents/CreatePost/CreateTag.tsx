import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { createTag, searchTag } from 'api/tag';
import { AutoResizeTextarea } from 'components/Common/AutoResizeTextarea';
import { tagValidator } from 'utils/tagValidator';

type Item = {
  id?: string;
  name?: string;
  createdAt?: Date;
  deletedAt?: null;
};

type CreateTagProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setTagEntered: (value: any) => void;
  showSearch: string;
  setShowSearch: (value: any) => void;
};
const CreateTag = (props: CreateTagProps) => {
  const [suggestion, setSuggestion] = useState<Item[]>([]);
  const [error, setError] = useState<boolean>(false);

  const { setTagEntered, showSearch, setShowSearch } = props;

  const handleTagChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    let value = e.currentTarget.value;
    setShowSearch(value);
    if (value) {
      searchTag({
        tagName: value.substring(value.lastIndexOf('#') + 1),
        limit: 3,
        page: 1,
      }).then((res) => {
        let temp: Item[] = res.data.data.items;
        setSuggestion(temp);
      });
    } else {
      setSuggestion([]);
      setTagEntered([]);
    }
    setError(tagValidator(showSearch));
  };

  const handleClick = () => {
    setShowSearch((showSearch: string) => showSearch + `#`);
  };

  const handlePost = (e: any) => {
    if (e.key === 'Enter') {
      let tag = e.currentTarget.value;
      let name = tag.substring(tag.lastIndexOf('#') + 1);
      if (!suggestion.includes(name)) {
        createTag({ name: name }).then((res) => {
          let presentTags = showSearch;
          let response = res.data.data;
          let result =
            presentTags.replace(
              presentTags.substring(presentTags.lastIndexOf('#')),
              ''
            ) + `#${response.name} `;
          setShowSearch(result);

          setTagEntered((preV: any) => [
            ...preV,
            { tagId: response.id, tagName: response.name },
          ]);
        });
      }
    }
  };

  const suggestClick = (items: any, presentTags: string, tagId: string) => {
    let str =
      presentTags.substring(0, presentTags.lastIndexOf('#')) + `#${items} `;
    setShowSearch(str);
    setSuggestion([]);
    setTagEntered((preV: any) => [
      ...preV,
      {
        tagId: tagId,
        tagName: items,
      },
    ]);
  };

  return (
    <>
      <Box flexGrow={1}>
        <FormControl>
          <AutoResizeTextarea
            id="searchtag"
            value={showSearch}
            onChange={(event: React.FormEvent<HTMLTextAreaElement>) =>
              handleTagChange(event)
            }
            onKeyDown={handlePost}
            border="0"
            color="primary.400"
            fontSize="12px"
            isInvalid={error}
          />
          {error && <Text color="danger.500">Tag Limit has exceeded 25</Text>}
          <Flex flexDirection={'column'}>
            {suggestion?.map((tagdata) => {
              return (
                <Box
                  px="5"
                  py="2"
                  key={tagdata.id}
                  borderRadius="8"
                  w="100%"
                  bg="white"
                  color="seondary.500"
                  onClick={() => {
                    let presentTags = showSearch;
                    suggestClick(tagdata.name, presentTags, tagdata.id!);
                  }}
                  _hover={{ bg: 'secondary.100' }}>
                  {tagdata?.name}
                </Box>
              );
            })}
          </Flex>
          <Flex alignItems="flex-end">
            <Button
              variant="ghost"
              color="primary.400"
              onClick={handleClick}
              paddingInlineStart={0}
              mt={[2, 0]}>
              <FormLabel
                htmlFor="searchtag"
                fontSize="14px"
                fontWeight="normal">
                Add Hashtag
              </FormLabel>
            </Button>
            <Spacer />
          </Flex>
        </FormControl>
      </Box>
    </>
  );
};

export default CreateTag;
