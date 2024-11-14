import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import PostVote from 'components/PostComponents/PostVote';
import { AiOutlineMore } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { GoPrimitiveDot } from 'react-icons/go';
import { WarningTwoIcon, EditIcon } from '@chakra-ui/icons';
import { ImageIcon } from 'components/Common/ImageIcon';
import { PostFeedback } from './PostFeedback';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';
import DeletePostModal from 'components/Posts/DeletePostModal';
import MDEditor from '@uiw/react-md-editor';
import { CardDiscussionContainer } from 'themes/commonTheme';
import { useNavigate } from 'react-router-dom';
import { Earth } from 'assets/icons/createpost';
import EditPost from './EditPost/EditPost';
import useDidMountEffect from 'hooks/useDidMountEffect';
import { TagType } from 'Schema/Schema';
import { combineTag } from 'utils/combineTag';

export const CardDiscussion = (props: any) => {
  const { post: userPost, setUserPosts, userPosts } = props;

  const [content, setContent] = useState<string>(userPost.content);
  const [title, setTitle] = useState<string>(userPost.title);
  const [tags, setTags] = useState<string>('');
  const [tagEntered, setTagEntered] = useState<TagType[]>([]);

  useDidMountEffect(() => {
    let selectedTag = userPost.tags.map((data: any) => {
      return { tagId: data?.id, tagName: data?.name };
    });
    setTagEntered(selectedTag);
    setTags(combineTag(selectedTag));
  }, []);

  const loggedInUserId = useSelector(selectUser).id;
  const posterId = userPost.user.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const navigate = useNavigate();
  dayjs.extend(relativeTime);

  const voteNumber = userPost.upVotesCount - userPost.downVotesCount;
  const createdPostDate = dayjs(dayjs(userPost?.createdAt).format()).fromNow();

  return (
    <>
      <Box
        position="relative"
        style={CardDiscussionContainer}
        _hover={{ boxShadow: '5px 5px 15px #00000029 !important' }}>
        <Grid templateColumns="repeat(15, 1fr)" gap={2}>
          <GridItem colSpan={1} gap={7}>
            <Avatar name={userPost.user.name} size="md" />
            <PostVote
              postId={userPost.id}
              voteNumber={voteNumber}
              isVotedType={userPost.votes.type}
            />
          </GridItem>

          <GridItem colSpan={13}>
            <a href={`/post/${userPost.id}`}>
              <Text color="secondary.500" fontSize="16px" mt="5px">
                <span style={{ fontWeight: 600 }}>
                  {userPost.user.name}&nbsp;
                </span>
                shared a {userPost.type}
              </Text>
              <Flex alignItems="center" fontSize="sm" color="secondary.500">
                <Text>{createdPostDate}</Text>
                <Icon as={GoPrimitiveDot} w="15px" h="15px" p={0.5} />
                <ImageIcon size="20px" src={Earth} opacity={0.4} />
              </Flex>
            </a>
            <Box overflow="auto" h="auto" data-color-mode="light">
              <Text as="span">{title}</Text>
              <Text
                as="span"
                noOfLines={3}
                onClick={() => navigate(`/post/${userPost.id}`)}
                cursor="pointer">
                <MDEditor.Markdown source={content} />
              </Text>
            </Box>
            <Text color="primary.700" fontSize="14px">
              {tags}
            </Text>
          </GridItem>

          <GridItem colSpan={1}>
            <Flex maxW="10px" align="center">
              <Menu>
                <MenuButton
                  as={Button}
                  pe={5}
                  bg="none"
                  rightIcon={<AiOutlineMore />}
                />
                <MenuList>
                  {posterId === loggedInUserId && (
                    <MenuItem onClick={onEditOpen}>
                      <EditIcon />
                      <span>&nbsp;Edit</span>
                    </MenuItem>
                  )}
                  <MenuItem>
                    <WarningTwoIcon />
                    <span>&nbsp;Report</span>
                  </MenuItem>
                  {posterId === loggedInUserId && (
                    <MenuItem onClick={onOpen}>
                      <BiTrash />
                      <span>&nbsp;Delete</span>
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      <EditPost
        tagEntered={tagEntered}
        setTagEntered={setTagEntered}
        tags={tags}
        setTags={setTags}
        setContent={setContent}
        setPostTitle={setTitle}
        postId={userPost.id}
        postContent={userPost.content}
        postTitle={userPost.title}
        postType={userPost.type}
        postTeams={userPost.teams}
        onEditClose={onEditClose}
        isEditOpen={isEditOpen}
      />
      <DeletePostModal
        isOpen={isOpen}
        onClose={onClose}
        postId={userPost.id}
        deletedFrom="feed"
        setUserPosts={setUserPosts}
        userPosts={userPosts}
      />
      <PostFeedback post={userPost} />
    </>
  );
};
