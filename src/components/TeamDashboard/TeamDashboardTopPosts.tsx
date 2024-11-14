import { Box, Flex, Text } from '@chakra-ui/react';
import { getPostsFromTeams } from 'api/post';
import EndMsg from 'components/PostComponents/EndMsg';
import SkeletonTemp from 'components/PostComponents/SkeletonTemp';
import React, { useEffect, useState } from 'react';
import { CardDiscussion } from 'components/PostComponents/CardDiscussion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CustomSpinner } from 'components/Common/CustomSpinner';

type TeamDashboardTopPostsProps = {
  teamId: number;
};

const TeamDashboardTopPosts: React.FC<TeamDashboardTopPostsProps> = (props) => {
  const { teamId } = props;
  const LIMIT = 2;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [userPosts, setUserPosts] = useState<any>();
  const [noContent, setnoContent] = useState(false);

  const fetchNextUsers = () => {
    var NEXT_PAGE = page + 1;
    setPage(NEXT_PAGE);
    getPostsFromTeams({
      sortBy: 'POPULARITY',
      limit: LIMIT,
      page: NEXT_PAGE,
      teamIds: teamId,
    }).then((res) => {
      let result = res.data.data;
      let tempData = [...userPosts, ...result.items];
      setUserPosts(tempData);
      setTotal(result.meta.totalItems);
    });
  };

  useEffect(() => {
    getPostsFromTeams({
      sortBy: 'POPULARITY',
      limit: LIMIT,
      page: 1,
      teamIds: teamId,
    }).then((res) => {
      res.data.data.items.length > 0 ? setnoContent(false) : setnoContent(true);
      let result = res.data.data;
      setUserPosts(result.items);
      setTotal(result.meta.totalItems);
    });
  }, [teamId]);

  let numberOfPosts = userPosts?.length;
  let hasMore = numberOfPosts < total;

  return (
    <Box w={['full', 'full', 'full', 'full', '60%']}>
      <Flex
        className="loader"
        w="100%"
        h="300px"
        align="center"
        justify="center"
        display={noContent ? 'flex' : 'none'}>
        <Text>No Top Post Available</Text>
      </Flex>
      <Text
        fontWeight="medium"
        px={3}
        fontSize="lg"
        display={noContent ? 'none' : 'block'}>
        Top posts
      </Text>
      {noContent ? null : !numberOfPosts ? (
        <CustomSpinner />
      ) : (
        <InfiniteScroll
          dataLength={numberOfPosts}
          next={fetchNextUsers}
          hasMore={hasMore}
          loader={<SkeletonTemp />}
          endMessage={<EndMsg msg="You are all caught up!" />}>
          {userPosts?.map((post: any) => (
            <Box key={post.id}>
              <CardDiscussion
                post={post}
                setUserPosts={setUserPosts}
                userPosts={userPosts}
              />
            </Box>
          ))}
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default TeamDashboardTopPosts;
