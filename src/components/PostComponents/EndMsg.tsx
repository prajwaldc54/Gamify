import React from 'react';
import { Box, Center, Checkbox } from '@chakra-ui/react';

type EndMsgProps = {
  msg: string;
};

const EndMsg = (props: EndMsgProps) => {
  const { msg } = props;
  return (
    <Box padding="6" marginBottom="25px">
      <Center>
        <Checkbox colorScheme="green" isChecked>
          <Box color="green">{msg}</Box>
        </Checkbox>
      </Center>
    </Box>
  );
};
export default EndMsg;
