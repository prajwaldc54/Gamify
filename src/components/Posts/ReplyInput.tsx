import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { useState } from 'react';
import { updateReply } from 'api/reply';
interface props {
  users: {
    id: number;
    display: string;
  }[];
  setReplyInputValue: any;
  setReply: (bool: boolean) => void;
  replyInputValue: string;
  postReply: any;
  edit?: boolean;
  setEdit?: any;
  id?: string;
  refetchReplies?: any;
}
export const ReplyInput: React.FC<props> = (props) => {
  const {
    users,
    setReplyInputValue,
    setReply,
    postReply,
    replyInputValue,
    edit,
    setEdit,
    id,
    refetchReplies,
  } = props;
  const [replyValue, setReplyValue] = useState<string>(replyInputValue);
  const textAreaStyle = {
    border: '1px solid grey',
    borderRadius: '0.5em',
    minHeight: '6em',
    margin: '1em',
    color: 'black',
    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.15)',
        fontSize: '0.75em',
      },
      item: {
        padding: '1.5em 2em',
        borderBottom: '1px solid rgba(0,0,0,0.15)',

        '&focused': {
          color: 'white',
          backgroundColor: '#02A4FF',
        },
      },
    },
  };
  const handleSubmit = () => {
    if (edit) {
      updateReply(Number(id), { content: replyValue }).then((res) => {
        refetchReplies();
        setEdit(false);
        setReplyInputValue('');
        setReply(false);
      });
    } else {
      postReply(replyValue);
      setReplyInputValue('');
      setReply(false);
    }
  };
  return (
    <Box>
      <MentionsInput
        style={textAreaStyle}
        value={replyValue}
        onChange={(e) => {
          setReplyValue(e.target.value);
        }}>
        <Mention trigger="@" data={users} markup="@[__display__] (@[__id__])" />
      </MentionsInput>
      <Button bgColor="#3069FE" color="white" onClick={handleSubmit}>
        Submit
      </Button>
      <Button
        color="#707070"
        bg="transparent"
        onClick={() => {
          setReply(false);
          setReplyInputValue('');
          setEdit(false);
        }}>
        Cancel
      </Button>
    </Box>
  );
};
