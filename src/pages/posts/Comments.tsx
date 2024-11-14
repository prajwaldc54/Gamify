import {
  Flex,
  Text,
  Box,
  Avatar,
  useToast,
  Button,
  CloseButton,
  Divider,
  FormControl,
  useDisclosure,
} from '@chakra-ui/react';
import { getTeamMembers } from 'api/team';
import { addReply } from 'api/reply';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { Comment, Reply as Replies } from 'Schema/PostSchema';
import { ReplyInput } from 'components/Posts/ReplyInput';
import MDEditor from '@uiw/react-md-editor';
import {
  markCommentAsAnswered,
  unmarkCommentAsAnswered,
} from '../../api/comment';
import { commentsVote } from 'Schema/PostSchema';
import {
  successToastContainerStyle,
  errorToastContainerStyle,
  toastRenderContainerStyle,
} from '../../themes/toastThemes';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Reply } from './Reply';
import axios from 'utils/api';
import DeleteCommentReply from 'components/Posts/DeleteCommentReply';
import { CommentVote } from 'components/PostComponents/CommentVote';

export const Comments: React.FC<Comment> = (props) => {
  const {
    id,
    content,
    isAccepted,
    createdAt,
    deletedAt,
    user,
    postUserId,
    loggedInUser,
    postId,
    teams,
    refetchComments,
    setEdit,
    setCommentId,
    setCommentValue,
  } = props;
  const [answered, setAnswered] = useState<boolean>(isAccepted!);
  let toast = useToast({
    position: 'top',
    duration: 3000,
  });
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 0,
      userId: 0,
      teamId: 0,
      role: '',
      createdAt: '',
      deletedAt: '',
      user: {
        id: '',
        name: '',
        email: '',
      },
    },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reply, setReply] = useState<boolean>(false);
  const [replies, setReplies] = useState<Array<Replies> | []>([]);
  const [replyInputValue, setReplyInputValue] = useState<string>('');
  const [votes, setVotes] = useState<commentsVote>();
  const [viewMore, setViewMore] = useState(true);
  const [renderReply, setRenderReply] = useState<number>(3);
  const [paginateReply, setPaginateReply] = useState<number>(8);
  const [upVote, setUpVote] = useState<number>();
  const [downVote, setDownVote] = useState<number>();
  dayjs.extend(relativeTime);
  useEffect(() => {
    refetchReplies();
    getTeamMembers(teams![0].id!).then((res) => {
      let data = res.data.data;
      setTeamMembers(data);
    });
  }, [postId, id, teams]);

  function refetchReplies() {
    axios
      .get(
        `https://api.gamify.dev.diagonal.solutions/comment/replies/${postId}`
      )
      .then((res) => {
        let comment = res.data.data.filter((com: any) => {
          return com.id === id;
        });
        if (comment.length > 0) {
          setVotes(comment[0].votes);
          setUpVote(comment[0].upVotesCount);
          setDownVote(comment[0].downVotesCount);
          setReplies(comment[0].replies);
        }
      })
      .catch((err) => {
        toast({
          containerStyle: errorToastContainerStyle,
          render: ({ onClose }) => {
            return (
              <Flex style={toastRenderContainerStyle} color="white">
                <Text>{err.response?.data.message}</Text>
                <CloseButton onClick={onClose} />
              </Flex>
            );
          },
        });
      });
  }

  const users = teamMembers?.map((user) => {
    return {
      id: user.userId,
      display: user.user.name.replace(/\s/g, ''),
    };
  });
  const PostReply = (value: string) => {
    let data = {
      commentId: Number(id),
      content: value,
    };

    addReply(data).then((res) => {
      refetchReplies();
      setRenderReply(replies.length + 1);
      setViewMore(false);
    });
  };
  const handleRenderReply = () => {
    if (setViewMore) {
      setViewMore(false);
    }
    setRenderReply(replies!.length);
  };
  const renderReplies = replies?.slice(0, renderReply)?.map((reply) => {
    return (
      <Reply
        id={reply.id}
        content={reply.content}
        createdAt={reply.createdAt}
        deletedAt={reply.deletedAt}
        user={reply.user}
        key={reply.id}
        setReply={setReply}
        setReplyValue={setReplyInputValue}
        loggedInUser={loggedInUser}
        teamMembers={teamMembers}
        users={users}
        replyInputValue={replyInputValue}
        setReplyInputValue={setReplyInputValue}
        postReply={PostReply}
        refetchReplies={refetchReplies}
      />
    );
  });
  const handleMarkasAnswered = () => {
    if (!answered) {
      markCommentAsAnswered(Number(id))
        .then((res) => {
          setAnswered(true);
        })
        .catch((err) => {
          toast({
            containerStyle: errorToastContainerStyle,
            render: ({ onClose }) => {
              return (
                <Flex style={toastRenderContainerStyle} color="white">
                  <Text>
                    {err.response.status === 409
                      ? 'There is already an aswered comment'
                      : `${err.response?.data.message}Welcome`}
                  </Text>
                  <CloseButton onClick={onClose} />
                </Flex>
              );
            },
          });
        });
    } else {
      unmarkCommentAsAnswered(Number(id))
        .then((res) => {
          setAnswered(false);
        })
        .catch((err) => {
          toast({
            containerStyle: errorToastContainerStyle,
            render: ({ onClose }) => {
              return (
                <Flex style={toastRenderContainerStyle} color="white">
                  <Text>
                    {err.response.status === 409
                      ? 'There is already an aswered comment'
                      : `${err.response?.data.message}`}
                  </Text>
                  <CloseButton onClick={onClose} />
                </Flex>
              );
            },
          });
        });
    }
  };

  return (
    <Flex
      w="100%"
      minW="100%"
      direction="column"
      align="flex-start"
      paddingTop={5}
      paddingBottom={5}
      fontSize={{ base: '12px', sm: '16px' }}>
      <Flex color="secondary.500" w="100%">
        <Box>
          <Flex flexDir="column" alignItems="center">
            {votes && (
              <CommentVote
                commentId={Number(id)}
                votes={votes!}
                upVotesCount={upVote!}
                downVotesCount={downVote!}
              />
            )}
            {answered && (
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    fill: '#2A9D8F',
                  }}
                  version="1.1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24">
                  <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                </svg>
              </Box>
            )}
          </Flex>
        </Box>
        <Flex gap="20px" direction="column" data-color-mode="light" w="100%">
          {isAccepted && (
            <Flex>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="24"
                style={{
                  fill: '#F5891D',
                }}
                height="24"
                viewBox="0 0 24 24">
                <path d="M19,3A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M15.58,17L14.63,12.92L17.79,10.19L13.62,9.83L12,6L10.38,9.84L6.21,10.2L9.37,12.93L8.42,17L12,14.84L15.58,17Z" />
              </svg>
              <Text color="#F5891D">Recommended answer</Text>
            </Flex>
          )}
          <MDEditor.Markdown data-color-mode="dark" source={content} />
          <Flex justify="space-between">
            <Flex gap="10px">
              <Text
                size="sm"
                cursor="pointer"
                _hover={{ color: 'primary.300' }}>
                Share
              </Text>
              {loggedInUser === user?.id && (
                <>
                  <Text
                    size="sm"
                    cursor="pointer"
                    _hover={{ color: 'primary.300' }}
                    onClick={() => {
                      setCommentId(id!);
                      setCommentValue(content);
                      setEdit(true);
                    }}>
                    Edit
                  </Text>
                  <Text
                    size="sm"
                    cursor="pointer"
                    _hover={{ color: 'primary.300' }}
                    onClick={onOpen}>
                    Delete
                  </Text>
                </>
              )}
              {postUserId === loggedInUser &&
                (!answered ? (
                  <Text
                    size="sm"
                    cursor="pointer"
                    _hover={{ color: 'primary.300' }}
                    onClick={handleMarkasAnswered}>
                    Mark as answered
                  </Text>
                ) : (
                  <Text
                    size="sm"
                    cursor="pointer"
                    _hover={{ color: 'primary.300' }}
                    onClick={handleMarkasAnswered}>
                    Mark as Unanswered
                  </Text>
                ))}
            </Flex>
            <Flex gap="10px" direction="column">
              <Text size="sm">
                {` Answered ${dayjs(createdAt).format('MMM DD ,YYYY')} at
            ${dayjs(createdAt).format('hh:mm a')}`}
              </Text>
              <Flex gap="10px">
                <Avatar size="sm" />
                <Text size="sm">{user?.name}</Text>
              </Flex>
            </Flex>
          </Flex>
          {renderReplies}
          {!(replies.length < 4) && (
            <Flex gap={2}>
              {!(renderReply === replies!.length) && (
                <Text cursor="pointer" onClick={handleRenderReply}>
                  View more
                </Text>
              )}
              {!viewMore && (
                <Text
                  cursor="pointer"
                  onClick={() => {
                    setViewMore(true);
                    setRenderReply(3);
                  }}>
                  View less
                </Text>
              )}
            </Flex>
          )}
          <Divider></Divider>
          <Box>
            <FormControl>
              <Text
                size="sm"
                cursor="pointer"
                _hover={{ color: 'primary.300' }}
                onClick={() => {
                  setReply(true);
                }}>
                Add reply
              </Text>
              {reply && (
                <Box>
                  <ReplyInput
                    users={users}
                    replyInputValue={replyInputValue}
                    setReplyInputValue={setReplyInputValue}
                    setReply={setReply}
                    postReply={PostReply}
                  />
                </Box>
              )}
            </FormControl>
          </Box>
        </Flex>
      </Flex>
      <DeleteCommentReply
        isOpen={isOpen}
        onClose={onClose}
        commentId={id}
        replyId=""
        deletedFrom={String(postId)}
        refetchComments={refetchComments}
      />
    </Flex>
  );
};
