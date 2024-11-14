import React, { useEffect, useState } from 'react';
import { Box, CloseButton, Flex, Text, useToast } from '@chakra-ui/react';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import {
  VoteTypeSchema,
  UP_VOTE,
  DOWN_VOTE,
  NOT_VOTED,
  UserSchema,
} from 'Schema/Schema';
import { addVoteToComment, removeVoteFromComment } from 'api/vote';
import {
  successToastContainerStyle,
  errorToastContainerStyle,
  toastRenderContainerStyle,
} from '../../themes/toastThemes';
interface props {
  votes: {
    id: number;
    type: string | null;
    createdAt: string;
    deletedAt: string | null;
    user: UserSchema | null;
  }[];
  upVotesCount: number;
  downVotesCount: number;
  commentId: number;
}
export const CommentVote: React.FC<props> = (props) => {
  const { votes, upVotesCount, downVotesCount, commentId } = props;
  const [voteType, setVoteType] = useState<string | null>('');
  const [totalVoteCount, setTotalVoteCount] = useState<number>(
    upVotesCount - downVotesCount
  );
  const [currentVoteCount, setCurrentVoteCount] = useState<number>(
    upVotesCount - downVotesCount
  );
  let toast = useToast({
    position: 'top',
    duration: 3000,
  });
  useEffect(() => {
    let voteNumber = upVotesCount - downVotesCount;
    const checkUserVoted =
      votes?.filter((vote) => {
        return vote.user !== null;
      }) || null;
    if (checkUserVoted.length > 0) {
      setVoteType(checkUserVoted[0].type!);
      if (checkUserVoted[0].type! === 'UP_VOTE') {
        setTotalVoteCount(voteNumber - 1);
        setCurrentVoteCount(voteNumber);
      } else if (checkUserVoted[0].type! === 'DOWN_VOTE') {
        setTotalVoteCount(voteNumber + 1);
        setCurrentVoteCount(voteNumber);
      }
    } else {
      setVoteType(null);
    }
  }, [votes]);

  const removeVote = () => {
    removeVoteFromComment(commentId)
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
        setCurrentVoteCount(totalVoteCount);
        setVoteType(null);
      })
      .catch((err) => {
        if (!(err.status === 404)) {
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
        }
      });
  };

  const handleVoteChange = (vote: 'UP_VOTE' | 'DOWN_VOTE') => {
    addVoteToComment(commentId, vote)
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
        let newCount: number = totalVoteCount + (vote === 'UP_VOTE' ? 1 : -1);
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
  const handleUpVote = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (voteType === 'UP_VOTE') {
      removeVote();
    } else {
      handleVoteChange('UP_VOTE');
    }
  };
  const handleDownVote = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (voteType === 'DOWN_VOTE') {
      removeVote();
    } else {
      handleVoteChange('DOWN_VOTE');
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
          color={voteType === 'DOWN_VOTE' ? 'success.500' : 'secondary.500'}
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
