import React from 'react';
import {
  Box,
  Text,
  Center,
  Flex,
  Icon,
  Popover,
  Menu,
  PopoverTrigger,
  MenuButton,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
import { BsBookmark } from 'react-icons/bs';
import { FaCommentDots } from 'react-icons/fa';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { PostFeedbackProps } from 'Schema/UserFeedSchema';
import { IconType } from 'react-icons';
import { ImageIcon } from 'components/Common/ImageIcon';
import { Earth } from 'assets/icons/createpost';

type Icon1Props = {
  img: IconType;
  size: string;
  opacity?: number;
};

const Icon1 = (props: Icon1Props) => {
  const { img, size, opacity } = props;
  return (
    <Icon
      mr={1}
      as={img}
      opacity={opacity}
      w={size}
      h={size}
      color="secondary.450"
    />
  );
};

const postLink = (id: number) => {
  return `https://app.gamify.dev.diagonal.solutions/post/${id}`;
};

export const PostFeedback = (props: PostFeedbackProps) => {
  const { post: userPost } = props;
  return (
    <Center position="relative" w="100%" mb="40px">
      <Flex
        position="absolute"
        w={{ base: '265px', sm: '330px' }}
        h="40px"
        bg="white"
        justify="space-between"
        align="center"
        px="15px"
        borderRadius="55px"
        boxShadow="0px 1px 15px #00000029"
        color="secondary.500"
        fontSize="sm"
        textTransform="uppercase">
        <Center>
          <Icon1 img={FaCommentDots} size="18px" />
          <Text>{userPost?.commentsCount} Comments</Text>
        </Center>
        <Center>
          <Icon1 img={BsBookmark} size="15px" />
          <Text>Save</Text>
        </Center>
        <Center>
          <Popover arrowSize={15}>
            <Menu>
              <PopoverTrigger>
                <MenuButton bg="none">
                  <Center>
                    <ImageIcon
                      size="20px"
                      opacity={0.4}
                      src={Earth}
                      padRight="2px"
                    />
                    <Text as="span" fontSize="sm" textTransform="uppercase">
                      Share
                    </Text>
                  </Center>
                </MenuButton>
              </PopoverTrigger>
              <PopoverContent w="fit-content" boxShadow="dark-lg">
                <PopoverBody>
                  <Flex justify="space-between" gap={2}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${postLink(
                        userPost.id
                      )}`}>
                      <FacebookIcon size={32} round />
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://twitter.com/intent/tweet?text=${postLink(
                        userPost.id
                      )}`}>
                      <TwitterIcon size={32} round />
                    </a>
                  </Flex>
                </PopoverBody>
                <PopoverArrow />
              </PopoverContent>
            </Menu>
          </Popover>
        </Center>
      </Flex>
    </Center>
  );
};
