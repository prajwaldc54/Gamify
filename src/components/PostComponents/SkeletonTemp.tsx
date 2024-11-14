import * as React from 'react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const SkeletonTemp = () => {
  return (
    <Box
      p={5}
      mt="20px"
      mx={['2.5%', '1.5%', '2%', '0.5%']}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="1px 1px 10px #00000029">
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={6} spacing="4" />
    </Box>
  );
};

export default SkeletonTemp;
