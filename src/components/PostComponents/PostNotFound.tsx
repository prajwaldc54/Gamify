import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

type PostNotFoundProps = {
  showDashboardBtn?: boolean;
};

export const PostNotFound = (props: PostNotFoundProps) => {
  const { showDashboardBtn } = props;
  return (
    <Flex
      w="100%"
      h="100%"
      justify="center"
      alignItems="center"
      direction="column"
      gap="10">
      <Text as="h1" fontSize="3xl">
        Post Not Found
      </Text>
      {showDashboardBtn && (
        <NavLink to="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </NavLink>
      )}
    </Flex>
  );
};
