import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { PostError } from 'Schema/Schema';

type EditFooterProps = {
  handleSave: () => void;
  handleDiscard: () => void;
  error: PostError;
  loading: boolean;
};

const EditFooter = (props: EditFooterProps) => {
  const { handleSave, handleDiscard, error, loading } = props;
  return (
    <>
      <Flex mt={8}>
        <Button
          colorScheme="messenger"
          fontSize="14px"
          onClick={handleSave}
          isLoading={loading}>
          Save
        </Button>
        <Button
          variant="ghost"
          color="#707070"
          fontSize="14px"
          onClick={handleDiscard}>
          Discard
        </Button>
      </Flex>
      {error.postError && (
        <Text fontSize="xs" color="danger.500" fontWeight="medium" mt={4}>
          {error.message}
        </Text>
      )}
    </>
  );
};

export default EditFooter;
