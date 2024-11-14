import React, { useEffect, useState } from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { comment, answered } from '../../assets/icons/index';
import { ImageIcon } from 'components/Common/ImageIcon';
import { BsDot } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';
import { RelatedPostDetails } from 'Schema/RelatedPostSchema';

interface PostListItemProps {
  postData: RelatedPostDetails;
}

const PostListItem = (props: PostListItemProps) => {
  const { postData } = props;
  dayjs.extend(relativeTime);
  let navigate = useNavigate();

  const [isAnswered, setIsAnswered] = useState(false);

  const navigateToPost = () => {
    navigate(`/post/${postData.id}`);
  };

  useEffect(() => {
    postData.comments?.length && setIsAnswered(true);
  }, [postData]);

  return (
    <HStack
      direction="row"
      w="100%"
      gap="5px"
      onClick={navigateToPost}
      _hover={{
        cursor: 'pointer',
      }}>
      <Flex
        w="30px"
        h="30px"
        outline="1px solid"
        justifyContent="center"
        alignItems="center"
        outlineColor={isAnswered ? 'success.500' : 'secondary.500'}
        borderRadius="4px">
        <Text
          color={isAnswered ? 'success.500' : 'secondary.500'}
          fontWeight="medium">
          {postData?.upVotesCount - postData?.downVotesCount}
        </Text>
      </Flex>

      <Flex direction="column">
        <Box>
          <Text color="secondary.500">{postData.title}</Text>
          <HStack mt="5px">
            {postData?.tags?.map((tag) => (
              <Text key={tag.id} color="primary.400" fontSize="12px">
                #{tag.name}
              </Text>
            ))}
          </HStack>
        </Box>
        <HStack
          fontSize="12px"
          mt="15px"
          spacing="10px"
          color="secondary.500"
          alignItems="center">
          <HStack>
            {isAnswered && (
              <>
                <Text color="success.500">
                  <ImageIcon src={answered} />
                  Answered
                </Text>
                <BsDot />
              </>
            )}
          </HStack>
          <HStack>
            <Text>
              <ImageIcon src={comment} />
              {postData?.commentCount}
            </Text>
            <BsDot />
          </HStack>
          <HStack>
            <Text> {dayjs(postData.createdAt).fromNow()}</Text>
          </HStack>
        </HStack>
      </Flex>
    </HStack>
  );
};

export default PostListItem;
