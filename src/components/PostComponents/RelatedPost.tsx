import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import { getRelatedPosts } from 'api/post';
import PostListItem from './PostListItem';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { RelatedPostDetails } from '../../Schema/RelatedPostSchema';
import { CustomSpinner } from 'components/Common/CustomSpinner';

type RelatedPostProps = {
  id: string;
};

const RelatedPost = (props: RelatedPostProps) => {
  let { id } = props;
  let postId = id ?? '';
  const navigate = useNavigate();
  const [relatedPostData, setRelatedPostData] =
    useState<RelatedPostDetails[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [totalRelatedPostData, setTotalRelatedPostData] = useState(0);

  useEffect(() => {
    getRelatedPosts(postId, { page: 1, limit: 3 }).then((res) => {
      setIsLoading(false);
      setRelatedPostData(res.data.data.items);
      setTotalRelatedPostData(res.data.data.meta.totalItems);
      setSuccess(res.data.success);
    });
  }, [postId]);

  return (
    <>
      {isLoading && <CustomSpinner />}
      {success && !isLoading && (
        <Box width="100%" boxShadow="light" p="20px" borderRadius="8px">
          <Text as="span" color="secondary.500">
            Related Post
          </Text>
          <Divider my="2" />
          {relatedPostData?.length === 0 ? (
            <Text as="span" color="secondary.500" fontSize="14px">
              No related post found.
            </Text>
          ) : (
            <Box>
              <VStack gap="30">
                {relatedPostData?.map((post) => (
                  <PostListItem key={post.id} postData={post} />
                ))}
              </VStack>
              {totalRelatedPostData >= 4 && (
                <Box mt="30px" fontSize="14px">
                  <Button
                    variant="trinary"
                    w="100%"
                    onClick={() => {
                      navigate(`/post/${postId}/related-posts`);
                    }}>
                    <Flex gap="10px" alignItems="center">
                      View All <AiOutlineArrowRight />
                    </Flex>
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default RelatedPost;
