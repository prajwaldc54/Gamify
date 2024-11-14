import React from 'react';
import {
  Box,
  Divider,
  Text,
  Image,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import reply from '../../assets/icons/reply.svg';
import { Reply as ReplySchema } from 'Schema/PostSchema';
import { useState, useEffect } from 'react';
import DeleteCommentReply from 'components/Posts/DeleteCommentReply';
import { ReplyInput } from 'components/Posts/ReplyInput';
export const Reply: React.FC<ReplySchema> = (props) => {
  const {
    id,
    content,
    createdAt,
    deletedAt,
    user,
    setReply,
    loggedInUser,
    setReplyValue,
    teamMembers,
    users,
    setReplyInputValue,
    postReply,
    replyInputValue,
    refetchReplies,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  dayjs.extend(relativeTime);
  const [userName, setUserName] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  useEffect(() => {
    setUserName(user!.name.replace(/\s/g, ''));
  }, [user]);
  const display = () => {
    if (content?.includes('@')) {
      let array1 = content?.split(' ');
      let arr = array1.map((array) => {
        let userId = array.match(/(@[[0-9]+])/gm);
        let userName = array.match(/(@[[a-zA-Z]+])/gm);

        let mentionIds =
          userId?.map((sym) => {
            return sym.match(/([0-9]+)/g)![0];
          }) || '';
        let mentionName =
          userName?.map((sym) => {
            return sym.match(/(@[[a-zA-Z]+])/gm)![0];
          }) || '';
        let mentionedUser = teamMembers?.filter((men: any) => {
          if (men.userId === mentionIds[0]) {
            return men.user.name;
          }
        });

        if (array.includes('@')) {
          let mention = mentionedUser![0]?.user.name;
          return (
            <Text color="blue" display="inline" as="span" key={id}>
              {mention !== undefined
                ? '@' + mention + ' '
                : mentionName[0] === array
                ? ''
                : array + ' '}
            </Text>
          );
        } else {
          return (
            <Text display="inline" as="span" key={id}>
              {array + ' '}
            </Text>
          );
        }
      });
      return arr;
    } else {
      return content;
    }
  };

  return (
    <Box>
      <Divider></Divider>
      <Box paddingTop={2} paddingLeft={10}>
        {!edit ? (
          <Text>
            {display()} -
            <Text color="#3069FE" as="span" paddingLeft={1}>
              {user?.name}
            </Text>
            {` ${dayjs(createdAt).format('MMM DD,YYYY')} at
                    ${dayjs(createdAt).format('hh:mm a')}`}
          </Text>
        ) : (
          <ReplyInput
            users={users}
            setReplyInputValue={setReplyInputValue}
            setReply={setReply}
            postReply={postReply}
            replyInputValue={content + replyInputValue}
            edit={edit}
            setEdit={setEdit}
            id={id}
            refetchReplies={refetchReplies}
          />
        )}
        <Flex cursor="pointer">
          <Flex
            onClick={() => {
              setReply(true);
              setReplyValue!(`@[${userName}] (@[${user!.id}])`);
            }}>
            <Image src={reply} transform="scaleX(-1)" opacity="0.3"></Image>
            <Text paddingRight={2} _hover={{ color: 'primary.300' }}>
              reply
            </Text>
          </Flex>
          {loggedInUser === user?.id && (
            <Box>
              <Text
                paddingRight={2}
                color="#707070"
                _hover={{ color: 'primary.300' }}
                as="span"
                onClick={onOpen}>
                delete
              </Text>
              <Text
                paddingRight={2}
                color="#707070"
                _hover={{ color: 'primary.300' }}
                as="span"
                onClick={() => {
                  setEdit(true);
                }}>
                edit
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
      <DeleteCommentReply
        isOpen={isOpen}
        onClose={onClose}
        commentId=""
        replyId={id}
        refetchReplies={refetchReplies}
      />
    </Box>
  );
};
