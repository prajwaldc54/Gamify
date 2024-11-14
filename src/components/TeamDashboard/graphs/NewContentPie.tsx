import { Flex, Text, Box } from '@chakra-ui/react';
import React, { useState, FC } from 'react';
import {
  AiFillQuestionCircle,
  AiOutlineFall,
  AiOutlineRise,
} from 'react-icons/ai';
import { CommentCount } from 'Schema/PostSchema';
import { VictoryPie } from 'victory';
interface Props {
  commentMonthWise: CommentCount[];
  articleGrowth: number;
  currentMonCommentCount: number;
  currentMonArticleCount: number;
  teamId: string;
}
const NewContentPie: FC<Props> = (props) => {
  let {
    commentMonthWise,
    teamId,
    articleGrowth,
    currentMonCommentCount,
    currentMonArticleCount,
  } = props;
  let commentArtiRatio = (
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
      <Flex
        direction="column"
        align={{ base: 'center', md: 'flex-start' }}
        justify="flex-start">
        <Flex direction="row" align="center" gap="5px">
          <Text fontSize="lg" fontWeight="bold">
            New Content
          </Text>
          <AiFillQuestionCircle />
        </Flex>
        <Flex gap="5px" align="center">
          <Text fontSize="4xl" fontWeight="medium">
            {commentArtiRatio}%
          </Text>
          <Flex direction="column" fontSize="14px" fontWeight="medium">
            <Flex gap="5px">
              {articleGrowth > 0 ? (
                <AiOutlineRise size="20px" color="#48A868" />
              ) : (
                <AiOutlineFall size="20px" color="#F24545" />
              )}
              <Text
                textColor={articleGrowth > 0 ? 'secondary.800' : 'danger.400'}>
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
        <Flex
          width="100%"
          gap="30px"
          mt="16px"
          justify={{ base: 'center', md: 'flex-start' }}>
          <Box w="45%">
            <VictoryPie
              innerRadius={130}
              padAngle={1}
              colorScale={['#E27A31', '#48A868']}
              data={[
                { y: currentMonArticleCount, label: ' ' },
                { y: currentMonCommentCount, label: ' ' },
              ]}
              padding={0}
            />
          </Box>
          <Flex direction="column" justify="center">
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
      </Flex>
    </Flex>
  );
};

export default NewContentPie;
