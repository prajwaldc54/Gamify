import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Avatar,
  Button,
  HStack,
  Divider,
  Select,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink, useParams } from 'react-router-dom';
import { Post } from 'Schema/PostSchema';
import MDEditor from '@uiw/react-md-editor';
import { viewPost } from 'api/post';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PostVote from 'components/PostComponents/PostVote';
import { VoteTypeSchema, NOT_VOTED, TagType } from 'Schema/Schema';
import MarkAsHelpful from 'components/PostComponents/MarkAsHelpful';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';
import { CustomSpinner } from 'components/Common/CustomSpinner';
import DeletePostModal from '../../components/Posts/DeletePostModal';
import { PostNotFound } from 'components/PostComponents/PostNotFound';
import { CommentInput } from 'components/Posts/CommentInput';
import { Comments } from './Comments';
import RelatedPost from 'components/PostComponents/RelatedPost';
import { combineTag } from 'utils/combineTag';
import EditPost from 'components/PostComponents/EditPost/EditPost';

const PostDetail = () => {
  const id = useParams().id;
  const postId = id ?? '';
  dayjs.extend(relativeTime);

  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [tagEntered, setTagEntered] = useState<TagType[]>([]);

  const [postUserId, setPostUserId] = useState<number>();
  const [postDetails, setPostDetails] = useState<Post>();
  const [postCreatedDate, setPostCreatedDate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [voteNumber, setVoteNumber] = useState<number>(0);
  const [isVotedType, setIsVotedType] = useState<VoteTypeSchema>(NOT_VOTED);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const loggedInUserInformation = useSelector(selectUser);
  const loggedInUserId = loggedInUserInformation?.id;
  const [edit, setEdit] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');
  const [commentValue, setCommentValue] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  useEffect(() => {
    refetchComments();
  }, [postId]);

  const refetchComments = () => {
    viewPost(postId)
      .then((res) => {
        setLoading(false);
        setPostDetails(res.data.data);
        setContent(res.data.data?.post?.content);
        setTitle(res.data.data?.post?.title);
        setPostCreatedDate(res?.data?.data?.post?.createdAt);
        setPostUserId(res?.data?.data?.post?.user?.id);
        setVoteNumber(
          res?.data?.data?.upVotes?.count - res?.data?.data?.downVotes?.count
        );
        if (res?.data?.data?.userVoteInPost !== null) {
          setIsVotedType(res?.data?.data?.userVoteInPost?.type);
        }

        let selectedTag: any = res.data.data?.post?.tags.map((data: any) => {
          return { tagId: data?.id, tagName: data?.name };
        });
        setTagEntered(selectedTag);
        setTags(combineTag(selectedTag));
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 404) {
          setErrorMessage('Post Not Found');
        }
      });
  };
  const renderComment = postDetails?.post?.comments?.map((comment) => {
    return (
      <Comments
        id={comment.id}
        content={comment.content}
        isAccepted={comment.isAccepted}
        createdAt={comment.createdAt}
        deletedAt={comment.deletedAt}
        user={comment.user}
        key={comment.id}
        postUserId={postDetails?.post?.user?.id}
        loggedInUser={loggedInUserId}
        postId={postId}
        teams={postDetails?.post?.teams}
        refetchComments={refetchComments}
        setEdit={setEdit}
        setCommentId={setCommentId}
        setCommentValue={setCommentValue}
      />
    );
  });
  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : errorMessage !== '' ? (
        <PostNotFound showDashboardBtn={true} />
      ) : (
        <HStack
          w="100%"
          direction="row"
          p="10px"
          spacing="20px"
          align="flex-start"
          justifyContent="space-between">
          <Flex
            direction="column"
            w="100%"
            align="flex-start"
            gap="10px"
            fontSize={{ base: '12px', sm: '16px' }}>
            <Flex direction="column" gap="10px" color="secondary.500">
              <Text fontSize="xl">{title}</Text>
              <Flex gap="10px">
                <Text as="span">
                  Created{' '}
                  <Text as="span" fontWeight="medium">
                    {dayjs(postCreatedDate).fromNow()}
                  </Text>
                </Text>
                <Text as="span">
                  Viewed <Text as="span">{postDetails?.post?.views} times</Text>
                </Text>
              </Flex>
            </Flex>
            <Flex
              gap={{ base: '0px', lg: '10px' }}
              color="secondary.500"
              w="100%">
              <Flex alignItems="center" direction="column">
                <PostVote
                  postId={postId}
                  voteNumber={voteNumber}
                  isVotedType={isVotedType}
                />
                <MarkAsHelpful postDetails={postDetails!} />
              </Flex>

              <Flex
                gap="20px"
                direction="column"
                data-color-mode="light"
                w="100%">
                <MDEditor.Markdown data-color-mode="dark" source={content} />
                <Flex color="primary.400" direction="row" gap="3">
                  <Text>{tags}</Text>
                </Flex>

                <Flex justify="space-between">
                  <Flex gap="10px" direction="row">
                    <HStack>
                      <Text
                        size="sm"
                        cursor="pointer"
                        _hover={{ color: 'primary.400' }}>
                        Share
                      </Text>
                      {loggedInUserId === postUserId && (
                        <>
                          <Text
                            size="sm"
                            cursor="pointer"
                            _hover={{ color: 'primary.400' }}
                            onClick={onEditOpen}>
                            Edit
                          </Text>
                          <Text
                            size="sm"
                            cursor="pointer"
                            onClick={onOpen}
                            _hover={{ color: 'primary.400' }}>
                            Delete
                          </Text>
                        </>
                      )}
                    </HStack>
                  </Flex>
                  <Flex gap="10px" direction="column">
                    <Text fontSize={{ base: '12px', sm: '14px' }}>
                      {` Asked at ${dayjs(postCreatedDate).format('MMM DD')} at
                    ${dayjs(postCreatedDate).format('hh:mm a')}`}
                    </Text>
                    <Flex gap="10px">
                      <Avatar size="sm" />
                      <Text size="sm">{postDetails?.post?.user?.name}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <EditPost
              tagEntered={tagEntered}
              setTagEntered={setTagEntered}
              tags={tags}
              setTags={setTags}
              setContent={setContent}
              setPostTitle={setTitle}
              postId={postDetails?.post?.id!}
              postContent={content}
              postTitle={title}
              postType={postDetails?.post?.type!}
              postTeams={postDetails?.post?.teams}
              onEditClose={onEditClose}
              isEditOpen={isEditOpen}
            />
            <DeletePostModal
              isOpen={isOpen}
              onClose={onClose}
              postId={postId}
              deletedFrom="post-page"
            />
            <Divider></Divider>
            <Box>
              <Text
                paddingBottom={5}
                size="sm"
                cursor="pointer"
                _hover={{ color: 'primary.300' }}
                onClick={() => {
                  window.scrollTo(0, document.body.scrollHeight);
                }}>
                Add a comment
              </Text>
            </Box>
            <Divider></Divider>
            {!edit ? (
              <>
                <Flex
                  w="100%"
                  minW="100%"
                  justifyContent="space-between"
                  gap={5}>
                  <Text>{postDetails?.post?.comments?.length} Answers</Text>
                  <Flex
                    w="30%"
                    alignItems="center"
                    color="secondary.500"
                    gap={2}>
                    <Text display="inline-block">Sorted by:</Text>
                    <Select w="70%">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>{' '}
                  </Flex>
                </Flex>
                {renderComment}
                <Divider></Divider>

                <Flex w="100%" justifyContent="space-between">
                  <Text
                    paddingBottom={5}
                    size="sm"
                    color="#707070"
                    cursor="pointer"
                    _hover={{ color: 'primary.300' }}>
                    Add a comment
                  </Text>
                  <Text color="#F4511E" cursor="default">
                    Lock discussion
                  </Text>
                </Flex>

                <Box
                  data-color-mode="light"
                  width="100%"
                  margin="auto"
                  min-height="500px"
                  marginTop="1em">
                  <CommentInput
                    postId={Number(postId)}
                    refetchComments={refetchComments}
                  />
                </Box>
              </>
            ) : (
              <Box
                data-color-mode="light"
                width="100%"
                margin="auto"
                min-height="500px"
                marginTop="1em">
                <CommentInput
                  commentId={Number(commentId)}
                  setEdit={setEdit}
                  postId={Number(postId)}
                  commentValue={commentValue}
                  refetchComments={refetchComments}
                />
              </Box>
            )}
          </Flex>
          <Flex minWidth="450px" display={{ base: 'none', xl: 'block' }}>
            <RelatedPost id={postId} />
          </Flex>
        </HStack>
      )}
    </>
  );
};

export default PostDetail;
