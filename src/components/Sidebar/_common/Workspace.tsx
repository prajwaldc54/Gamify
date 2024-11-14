import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md';

export const Workspace = () => {
  return (
    <Flex w="100%" direction="column">
      <Flex mt="40px" mb="13px" color="subHeading.600" align="center">
        <MdHome fontSize="20px" />
        <Text ml="10px" fontWeight="600" fontSize="18px">
          Workspace
        </Text>
      </Flex>
      <Flex pl="30px" fontSize="16px" direction="column" gap="12px">
        <Text>General</Text>
        <Text>Members</Text>
        <Text>Connected Apps</Text>
      </Flex>
    </Flex>
  );
};
