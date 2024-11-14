import { Box, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';
import { GrBlog } from 'react-icons/gr';
import { PostType } from 'Schema/Schema';

type CustomModalFooterProps = {
  type: PostType;
  setType: (value: PostType) => void;
  onOpen?: () => void;
};

const CustomModalFooter = (props: CustomModalFooterProps) => {
  const { onOpen, type, setType } = props;

  const handleClick = (postType: PostType) => {
    setType(postType);
    if (onOpen) onOpen();
  };

  function getPostType(post: string, postType: PostType, symbol?: any) {
    return (
      <Text
        as="p"
        fontSize="14px"
        mr={5}
        cursor="pointer"
        mt={[3, 0]}
        onClick={() => handleClick(postType!)}
        color={postType === type ? '#3069FE' : '#707070'}>
        {symbol ? <Icon as={symbol} mr={1} /> : ''}
        {post}
      </Text>
    );
  }
  return (
    <Box mr={6} display={['column', 'flex']} mt={[0, 3]} color="#707070">
      {getPostType('Post Urls', 'URL', FiLink)}
      {getPostType('Post a questions', 'DISCUSSION', BsQuestionCircle)}
      {getPostType('Write a Blog', 'Write a Blog', GrBlog)}
      {getPostType('Write Wiki', 'Write Wiki')}
    </Box>
  );
};

export default CustomModalFooter;
