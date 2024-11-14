import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorImage from '../assets/icons/error.svg';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex direction="column" align="center" h="100vh" justify="center">
        <Flex>
          <Image src={ErrorImage} alt="Logo" />
        </Flex>

        <Text
          mt="5px"
          fontFamily="Times New Roman"
          fontSize="28px"
          fontWeight="bold">
          404 Error
        </Text>

        <Text color="icon.400" fontSize="12px">
          sorry...! this page does not exist
        </Text>

        <Box mt="20px">
          <Button
            type="submit"
            bg="primary.400"
            color="white"
            onClick={() => navigate(-1)}
            _hover={{ bg: 'blue.100' }}>
            Back
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default NotFoundPage;
