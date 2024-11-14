import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import {
  AiFillQuestionCircle,
  AiOutlineFall,
  AiOutlineRise,
} from 'react-icons/ai';
import { CommentCount, PostCount } from 'Schema/PostSchema';
import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryPie,
  VictoryScatter,
} from 'victory';
interface propsPie {
  commentMonthWise: CommentCount[];
  articleGrowth: number;
  currentMonCommentCount: number;
  articleMonthWise: PostCount[];
  currentMonArticleCount: number;
  teamId: string;
}
const NewContentLineChart = (props: propsPie) => {
  let {
    commentMonthWise,
    articleGrowth,
    currentMonCommentCount,
    articleMonthWise,
    currentMonArticleCount,
  } = props;
  let dataForLineChart: { x: string; y: string }[] = [];
  dataForLineChart = articleMonthWise.map((item) => {
    return { x: item.postMonth, y: item.postCount };
  });

  let commentArticleRatio = (
    (currentMonCommentCount / currentMonArticleCount) *
    100
  ).toFixed(2);
  return (
    <Flex
      direction="column"
      border=" 1.5px solid"
      borderColor="secondary.460"
      p="20px"
      borderRadius="4px">
      <Flex direction="column" justify="flex-start">
        <Flex justify="space-between" direction={{ base: 'column', md: 'row' }}>
          <Flex direction="column" justify="flex-start">
            <Flex direction="row" align="center" gap="5px">
              <Text fontSize="lg" fontWeight="bold">
                New Content
              </Text>
              <AiFillQuestionCircle />
            </Flex>
            <Flex gap="5px" align="center">
              <Text fontSize="4xl" fontWeight="medium">
                {commentArticleRatio}%
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
          <Flex
            direction="row"
            justify="center"
            gap="20px"
            w={{ base: '70%', md: '60%' }}>
            <Flex align="center" gap="6px">
              <Box w="8px" h="8px" borderRadius="50%" bg="secondary.900"></Box>
              <Text color="subHeading.400" fontSize="14px" fontWeight="medium">
                New questions
              </Text>
            </Flex>
            <Flex align="center" gap="6px">
              <Box w="8px" h="8px" borderRadius="50%" bg="secondary.800"></Box>
              <Text color="subHeading.400" fontSize="14px" fontWeight="medium">
                New answers
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex width="100%" gap="30px" mt="10px">
          <Box w="100%">
            <VictoryChart width={1200}>
              <VictoryGroup data={dataForLineChart} color="red">
                <VictoryLine samples={25} />
                <VictoryScatter
                  style={{ data: { fill: 'black' } }}
                  size={5}
                  symbol="circle"
                />
              </VictoryGroup>
              <VictoryGroup data={dataForLineChart} color="blue">
                <VictoryLine samples={25} />

                <VictoryScatter
                  style={{ data: { fill: 'black' } }}
                  size={5}
                  symbol="circle"
                />
              </VictoryGroup>
            </VictoryChart>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewContentLineChart;
