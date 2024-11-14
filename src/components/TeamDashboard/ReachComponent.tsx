import { Box, Divider, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getDiscussionCount, getMonthWiseArticleCount } from 'api/post';
import {
  AiOutlineRise,
  AiFillQuestionCircle,
  AiOutlineFall,
} from 'react-icons/ai';
import dayjs from 'dayjs';
import { getAllCommentsOfTeam } from 'api/comment';
import { getTeamMembers } from 'api/team';
import { useParams } from 'react-router-dom';

interface Props {
  currentMonArticleCount: number;
  articleGrowth: number;
  currentMonCommentCount: number;
  previousMonCommentCount: number;
  commentGrowth: number;
  setloading: (loading: boolean) => void;
}

const ReachComponent = (props: Props) => {
  const {
    currentMonArticleCount,
    articleGrowth,
    currentMonCommentCount,
    previousMonCommentCount,
    commentGrowth,
    setloading,
  } = props;

  let toast = useToast({
    position: 'top',
    duration: 3000,
  });
  const teamId: string = useParams().id!;

  const d = new Date();

  let CurrentMonthCount = d.getMonth();
  let currenMonth = d.toLocaleString('default', { month: 'long' });
  const [questionNum, setQuestionNum] = useState(0);
  const [discussionNum, setDiscussionNum] = useState(0);

  const [currentMonTeamMemCount, setCurrentMonTeamMemCount] = useState(0);
  const [previousMonTeamMemCount, setPreviousMonTeamMemCount] = useState(0);
  const [teamMemGrowth, setteamMemGrowth] = useState(0);

  useEffect(() => {
    getDiscussionCount(4).then((discussion) => {
      setDiscussionNum(discussion.data.data);
    });

    getTeamMembers(teamId)
      .then((res) => {
        setCurrentMonTeamMemCount(
          res.data.data.filter((item: any) => {
            let date = new Date(item.createdAt);
            return date.getMonth() === CurrentMonthCount;
          }).length
        );

        setPreviousMonTeamMemCount(
          res.data.data.filter((item: any) => {
            let date = new Date(item.createdAt);
            return date.getMonth() === CurrentMonthCount - 1;
          }).length
        );
        setteamMemGrowth(() => {
          return (
            ((currentMonTeamMemCount - previousMonTeamMemCount) /
              previousMonTeamMemCount) *
            100
          );
        });
      })
      .catch((err) => {
        toast({
          title: `Error Occured while Inviting members`,
          position: 'top',
          isClosable: true,
          variant: 'error',
        });
      });
    if (!isNaN(commentGrowth) && !isNaN(articleGrowth)) {
      setloading(false);
    }
  }, [
    CurrentMonthCount,
    articleGrowth,
    commentGrowth,
    currentMonCommentCount,
    currentMonTeamMemCount,
    previousMonCommentCount,
    previousMonTeamMemCount,
    setloading,
    teamId,
  ]);

  return (
    <Flex direction="column" gap="15px" mx="10px">
      <Text fontSize="2xl" fontWeight="medium" color="subHeading.400">
        Reach
      </Text>
      <Flex
        border="2px"
        borderColor="secondary.460"
        borderRadius="4px"
        direction={{ base: 'column', md: 'row' }}
        p="15px 30px"
        gap="10px"
        justify="space-between">
        <Flex justify="space-between" w={{ sm: '', md: '40%' }}>
          <Flex direction="column">
            <Flex direction="row" align="center" gap="5px">
              <Text fontSize="lg" fontWeight="bold">
                All questions
              </Text>
              <AiFillQuestionCircle />
            </Flex>
            <Flex gap="5px" justify="center">
              <Text fontSize="3xl" fontWeight="medium">
                {discussionNum}
              </Text>
            </Flex>
          </Flex>
          <Box
            borderLeft="2px"
            borderColor="secondary.460"
            ml="15px"
            mr={{ base: '20px', md: '0' }}
          />

          <Flex direction="column">
            <Flex direction="row" align="center" gap="5px">
              <Text fontSize="lg" fontWeight="bold">
                All answers
              </Text>
              <AiFillQuestionCircle />
            </Flex>
            <Flex gap="5px">
              <Text fontSize="3xl" fontWeight="medium">
                {currentMonCommentCount}
              </Text>
              <Flex direction="column" fontSize="14px" fontWeight="medium">
                <Flex gap="5px">
                  {commentGrowth > 0 ? (
                    <AiOutlineRise size="20px" color="#48A868" />
                  ) : (
                    <AiOutlineFall size="20px" color="#F24545" />
                  )}
                  <Text
                    textColor={
                      commentGrowth > 0 ? 'secondary.800' : 'danger.400'
                    }>
                    {commentGrowth}%
                  </Text>
                </Flex>
                <Text
                  fontWeight="medium"
                  textColor="secondary.500"
                  marginTop="-4px">
                  vs previous 30 days
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Box borderLeft="2px" borderColor="secondary.460" />
        <Flex justify="space-between" w={{ sm: '', md: '40%' }}>
          <Flex direction="column">
            <Flex direction="row" align="center" gap="5px">
              <Text fontSize="lg" fontWeight="bold">
                All articles
              </Text>
              <AiFillQuestionCircle />
            </Flex>
            <Flex gap="5px">
              <Text fontSize="3xl" fontWeight="medium">
                {currentMonArticleCount}
              </Text>
              <Flex direction="column" fontSize="14px" fontWeight="medium">
                <Flex gap="5px">
                  {articleGrowth > 0 ? (
                    <AiOutlineRise size="20px" color="#48A868" />
                  ) : (
                    <AiOutlineFall size="20px" color="#F24545" />
                  )}
                  <Text
                    textColor={
                      articleGrowth > 0 ? 'secondary.800' : 'danger.400'
                    }>
                    {articleGrowth}%
                  </Text>
                </Flex>

                <Text
                  fontWeight="medium"
                  textColor="secondary.500"
                  marginTop="-4px">
                  vs previous 30 days
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Box
            borderLeft="2px"
            borderColor="secondary.460"
            mr={{ base: '10px', md: '0' }}
          />

          <Flex direction="column">
            <Flex direction="row" align="center" gap="5px">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                All members
              </Text>
              <AiFillQuestionCircle />
            </Flex>
            <Flex gap="5px">
              <Text fontSize="3xl" fontWeight="medium">
                {currentMonTeamMemCount}
              </Text>
              <Flex direction="column" fontSize="14px" fontWeight="medium">
                <Flex gap="5px">
                  {teamMemGrowth > 0 ? (
                    <AiOutlineRise size="20px" color="#48A868" />
                  ) : (
                    <AiOutlineFall size="20px" color="#F24545" />
                  )}
                  <Text
                    textColor={
                      teamMemGrowth > 0 ? 'secondary.800' : 'danger.400'
                    }>
                    {teamMemGrowth}%
                  </Text>
                </Flex>

                <Text
                  fontWeight="medium"
                  textColor="secondary.500"
                  marginTop="-4px">
                  vs previous 30 days
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ReachComponent;
