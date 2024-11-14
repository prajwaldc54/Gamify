import React, { useEffect, useState } from 'react';
import { Box, CloseButton, Flex, Text, useToast } from '@chakra-ui/react';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import { VoteTypeSchema, UP_VOTE, DOWN_VOTE, NOT_VOTED } from 'Schema/Schema';
import { addVoteToPost, removeVoteFromPost } from 'api/vote';
import {
  successToastContainerStyle,
  errorToastContainerStyle,
  toastRenderContainerStyle,
} from '../../themes/toastThemes';

type PostVoteProps = {
  postId: string;
  voteNumber: number;
  isVotedType: VoteTypeSchema;
};

const PostVote = (props: PostVoteProps) => {
  const { postId, voteNumber, isVotedType } = props;
  const [voteType, setVoteType] = useState<VoteTypeSchema>(NOT_VOTED);
  const [totalVoteCount, setTotalVoteCount] = useState<number>(voteNumber);
  const [currentVoteCount, setCurrentVoteCount] = useState<number>(voteNumber);

  let toast = useToast({
    position: 'top',
    duration: 3000,
  });

  useEffect(() => {
    setVoteType(isVotedType);
    if (isVotedType === UP_VOTE) {
      setVoteType(UP_VOTE);
      setTotalVoteCount(voteNumber - 1);
      setCurrentVoteCount(voteNumber);
    } else if (isVotedType === DOWN_VOTE) {
      setVoteType(DOWN_VOTE);
      setTotalVoteCount(voteNumber + 1);
      setCurrentVoteCount(voteNumber);
    } else {
      setTotalVoteCount(voteNumber);
      setCurrentVoteCount(voteNumber);
    }
  }, [props.isVotedType, props.voteNumber]);

  const removeVote = () => {
    removeVoteFromPost(postId)
      .then((res) => {
        toast({
          containerStyle: successToastContainerStyle,
          render: ({ onClose }) => {
            return (
              <Flex style={toastRenderContainerStyle}>
                <Text> {res.data.message}</Text>
                <CloseButton onClick={onClose} />
              </Flex>
            );
          },
        });
        setVoteType(NOT_VOTED);
        setCurrentVoteCount(totalVoteCount);
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
  };

  const handleVoteChange = (vote: 'UP_VOTE' | 'DOWN_VOTE') => {
    addVoteToPost(postId, vote)
      .then((res) => {
        toast({
          containerStyle: successToastContainerStyle,
          render: ({ onClose }) => {
            return (
              <Flex style={toastRenderContainerStyle}>
                <Text> {res.data.message}</Text>
                <CloseButton onClick={onClose} />
              </Flex>
            );
          },
        });
        setVoteType(vote);
        let newCount: number = totalVoteCount + (vote === UP_VOTE ? 1 : -1);
        setCurrentVoteCount(newCount);
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
  };

  const handleUpVote = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (voteType === UP_VOTE) {
      removeVote();
    } else {
      handleVoteChange(UP_VOTE);
    }
  };

  const handleDownVote = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (voteType === DOWN_VOTE) {
      removeVote();
    } else {
      handleVoteChange(DOWN_VOTE);
    }
  };

  return (
    <Box>
      <Flex flexDir="column" alignItems="center">
        <Box
          w="auto"
          h="auto"
          color={voteType === UP_VOTE ? 'success.500' : 'secondary.500'}
          _hover={{
            cursor: 'pointer',
          }}
          onClick={handleUpVote}>
          <BsCaretUpFill fontSize="32px" />
        </Box>
        <Text color="secondary.500">{currentVoteCount}</Text>
        <Box
          w="auto"
          h="auto"
          color={voteType === DOWN_VOTE ? 'success.500' : 'secondary.500'}
          _hover={{
            cursor: 'pointer',
          }}
          onClick={handleDownVote}>
          <BsCaretDownFill fontSize="32px" />
        </Box>
      </Flex>
    </Box>
  );
};

export default PostVote;
