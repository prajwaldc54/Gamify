import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRelatedPosts } from 'api/post';
import { PostDetails } from 'Schema/PostSchema';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Button, Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import { CustomSpinner } from 'components/Common/CustomSpinner';
import SkeletonTemp from 'components/PostComponents/SkeletonTemp';
import EndMsg from 'components/PostComponents/EndMsg';
import { CardDiscussion } from 'components/PostComponents/CardDiscussion';

const LIMIT = 8;

const ViewAllRelatedPost = () => {
  const { id } = useParams();
  const postId = id ?? '';
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPostCount, setTotalPostCount] = useState<number>(1);
  const [relatedPostData, setRelatedPostData] = useState<PostDetails[]>([]);

  useEffect(() => {
    getRelatedPosts(postId, { page: 1, limit: LIMIT }).then((res) => {
      setIsLoading(false);
      setRelatedPostData(res?.data?.data?.items);
      setTotalPostCount(res?.data?.data?.meta?.totalItems);
    });
  }, [postId]);

  const fetchNextUsers = () => {
    const nextPage = page + 1;
    setPage((page) => page + 1);
    getRelatedPosts(postId, { page: nextPage, limit: LIMIT }).then((res) => {
      let tempData = [...relatedPostData, ...res?.data?.data?.items];
      setRelatedPostData(tempData);
      setTotalPostCount(res?.data?.data?.meta?.totalItems);
    });
  };

  return isLoading ? (
    <CustomSpinner />
  ) : (
    <Box mt="40px" p={{ base: '10px', sm: 'none' }}>
      <Flex justifyContent="space-between" alignItems="center" p="5px">
        <Heading as="h1" fontSize="22px" fontFamily="Times New Roman">
          Related post
        </Heading>
        <Button variant="primary" fontSize="14px" w="120px" h="40px">
          Ask Question
        </Button>
      </Flex>

      <Heading as="h5" fontWeight="medium" fontSize="16px">
        {totalPostCount} question{totalPostCount > 1 && 's'}
      </Heading>
      <Divider />
      <InfiniteScroll
        dataLength={relatedPostData.length}
        next={fetchNextUsers}
        hasMore={relatedPostData.length < totalPostCount}
        loader={<SkeletonTemp />}
        endMessage={<EndMsg msg="No more post is available" />}>
        {relatedPostData?.map((post: any) => (
          <Box key={post.id} mt="10px">
            <CardDiscussion
              post={post}
              setUserPosts={setRelatedPostData}
              userPosts={relatedPostData}
            />
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default ViewAllRelatedPost;
