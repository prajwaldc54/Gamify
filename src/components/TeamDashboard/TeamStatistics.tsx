import { CloseButton, Flex, Text, useToast, Spinner } from '@chakra-ui/react';
import { getAllCommentsOfTeam } from 'api/comment';
import { getMonthWiseArticleCount } from 'api/post';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostCount } from 'Schema/PostSchema';
import {
  errorToastContainerStyle,
  toastRenderContainerStyle,
} from 'themes/toastThemes';
import NewContentLineChart from './graphs/NewContentLineChart';
import NewContentPie from './graphs/NewContentPie';
import ReachComponent from './ReachComponent';

const TeamStatistics = () => {
  const teamId: string = useParams().id!;

  let toast = useToast({
    position: 'top',
    duration: 3000,
  });
  const d = new Date();
  let CurrentMonthCount = d.getMonth();
  const [currentMonArticleCount, setCurrentMonArticleCount] = useState(0);
  const [articleMonthWise, setarticleMonthWise] = useState<PostCount[]>([
    { postCount: '5', postMonth: 'July', postYear: '2022' },
  ]);
  const [previousMonArticleCount, setPreviousMonArticleCount] = useState(0);
  const [articleGrowth, setarticleGrowth] = useState(NaN);
  const [commentMonthWise, setcommentMonthWise] = useState([]);
  const [currentMonCommentCount, setCurrentMonCommentCount] = useState(0);
  const [previousMonCommentCount, setPreviousMonCommentCount] = useState(0);
  const [commentGrowth, setCommentGrowth] = useState(NaN);
  const [loading, setloading] = useState(true);
  const [noContent, setnoContent] = useState(false);

  useEffect(() => {
    getMonthWiseArticleCount(teamId)
      .then((res) => {
        res.data.data.length > 0 ? setnoContent(false) : setnoContent(true);
        setarticleMonthWise(res.data.data);
        res.data.data?.map((item: any) => {
          if (
            item.postMonth === dayjs().month(CurrentMonthCount).format('MMMM')
          ) {
            setCurrentMonArticleCount(parseInt(item.postCount));
          }
        });
        res.data.data?.map((item: any) => {
          if (
            item.postMonth ===
            dayjs()
              .month(CurrentMonthCount - 1)
              .format('MMMM')
          ) {
            setPreviousMonArticleCount(parseInt(item.postCount));
          }
        });

        setarticleGrowth(
          ((currentMonArticleCount - previousMonArticleCount) /
            previousMonArticleCount) *
            100
        );

        // loadingg = false;
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

    getAllCommentsOfTeam(teamId)
      .then((res) => {
        res.data.data?.map((item: any) => {
          if (
            item.commentMonth ===
            dayjs().month(CurrentMonthCount).format('MMMM')
          ) {
            setCurrentMonCommentCount(parseInt(item.commentCount));
          }
        });
        res.data.data?.map((item: any) => {
          if (
            item.commentMonth ===
            dayjs()
              .month(CurrentMonthCount - 1)
              .format('MMMM')
          ) {
            setPreviousMonCommentCount(parseInt(item.commentCount));
          }
        });
        setCommentGrowth(() => {
          return (
            ((currentMonCommentCount - previousMonCommentCount) /
              previousMonCommentCount) *
            100
          );
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    CurrentMonthCount,
    currentMonArticleCount,
    currentMonCommentCount,
    previousMonArticleCount,
    previousMonCommentCount,
  ]);

  return (
    <>
      <Flex
        className="loader"
        w="100%"
        h="300px"
        align="center"
        justify="center"
        display={noContent ? 'flex' : 'none'}>
        <Text>No Statistics Available</Text>
      </Flex>
      <Flex
        className="loader"
        w="100%"
        h="100%"
        align="center"
        justify="center"
        display={noContent ? 'none' : loading ? 'flex' : 'none'}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
      <Flex
        my="20px"
        w="100%"
        direction="column"
        gap="30px"
        display={loading ? 'none' : 'flex'}>
        <ReachComponent
          currentMonArticleCount={currentMonArticleCount}
          articleGrowth={articleGrowth}
          currentMonCommentCount={currentMonCommentCount}
          previousMonCommentCount={previousMonCommentCount}
          commentGrowth={commentGrowth}
          setloading={setloading}
        />
        <Flex
          gap="30px"
          mx="10px"
          flexDirection={{ base: 'column', md: 'row' }}>
          <NewContentPie
            teamId={teamId}
            currentMonArticleCount={currentMonArticleCount}
            articleGrowth={articleGrowth}
            commentMonthWise={commentMonthWise}
            currentMonCommentCount={currentMonCommentCount}
          />
          <NewContentLineChart
            teamId={teamId}
            articleGrowth={articleGrowth}
            commentMonthWise={commentMonthWise}
            currentMonCommentCount={currentMonCommentCount}
            articleMonthWise={articleMonthWise}
            currentMonArticleCount={currentMonArticleCount}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default TeamStatistics;
