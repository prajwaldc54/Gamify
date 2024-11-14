import React, { useEffect, useState } from 'react';
import SkeletonTemp from 'components/PostComponents/SkeletonTemp';
import { Box, Flex, Stack, Toast, useToast } from '@chakra-ui/react';
import { getPosts } from 'api/post';
import { FeedPost } from 'Schema/PostSchema';
import { CardDiscussion } from 'components/PostComponents/CardDiscussion';
import EndMsg from 'components/PostComponents/EndMsg';
import { FeedHeader } from 'components/PostComponents/FeedHeader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CustomSpinner } from 'components/Common/CustomSpinner';
import { PostNotFound } from 'components/PostComponents/PostNotFound';
import { HomepageContainer } from 'themes/commonTheme';
import { PostFilterParamType, PostSortByEnum } from 'Schema/Schema';

const LIMIT = 8;

export const Feed = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [userPosts, setUserPosts] = useState<FeedPost[]>();
  const [filters, setFilters] = useState<PostFilterParamType>({});
  const [sortBy, setSortBy] = useState<PostSortByEnum>(PostSortByEnum.LATEST);
  const toast = useToast();

  useEffect(() => {
    const filterData = {
      ...filters,
    };
    if (sortBy !== PostSortByEnum.LATEST) filterData['sortBy'] = sortBy;

    getPosts(LIMIT, 1, filterData)
      .then((res) => {
        setLoading(false);
        setUserPosts(res?.data?.data?.items);
        setTotal(res?.data?.data?.meta?.totalItems);
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }, [sortBy, filters]);

  const fetchNextUsers = () => {
    const filterData = {
      ...filters,
    };
    if (sortBy !== PostSortByEnum.LATEST) filterData['sortBy'] = sortBy;

    const NEXT_PAGE = page + 1;
    setPage(NEXT_PAGE);
    getPosts(LIMIT, NEXT_PAGE, filterData)
      .then((res) => {
        let tempData = [...userPosts!, ...res?.data?.data?.items];
        setUserPosts(tempData);
        setTotal(res?.data?.data?.meta?.totalItems);
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return loading ? (
    <CustomSpinner />
  ) : userPosts!.length < 1 ? (
    <PostNotFound />
  ) : (
    <>
      <Stack display={{ md: 'none' }}>
        <FeedHeader
          isMobileView={true}
          onSubmitFilter={({ sortBy: newSortBy, ...filter }) => {
            newSortBy && setSortBy(newSortBy);
            filter && setFilters(filter);
          }}
          defaultSortByValue={sortBy}
        />
      </Stack>
      <Stack display={{ base: 'none', md: 'block' }}>
        <FeedHeader
          isMobileView={false}
          onChangeSortBy={(sortBy) => sortBy && setSortBy(sortBy)}
          onSubmitFilter={(filter) => filter && setFilters(filter)}
          defaultSortByValue={sortBy}
        />
      </Stack>
      <InfiniteScroll
        dataLength={userPosts!.length}
        next={fetchNextUsers}
        hasMore={userPosts!.length < total}
        loader={<SkeletonTemp />}
        endMessage={<EndMsg msg="You are all caught up!" />}>
        {userPosts?.map((post: any) => (
          <Box
            key={post.id}
            overflow="hidden"
            sx={{
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}>
            <CardDiscussion
              post={post}
              setUserPosts={setUserPosts}
              userPosts={userPosts}
            />
          </Box>
        ))}
        {/*** <CardURL /> will be implemented later ***/}
      </InfiniteScroll>
    </>
  );
};
