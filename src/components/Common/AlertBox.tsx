import {
  Box,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  HStack,
} from '@chakra-ui/react';
import React from 'react';

type AlertBoxProps = {
  alertStatus: 'info' | 'warning' | 'success' | 'error' | 'loading';
  alertTitle: string;
  alertDescription?: string;
};

const AlertBox: React.FC<AlertBoxProps> = (props) => {
  const { alertStatus, alertTitle, alertDescription } = props;
  return (
    <Alert
      status={alertStatus}
      flexDir="column"
      alignItems="left"
      justifyContent="left"
      textAlign="left"
      borderRadius="5px">
      <HStack gap={-5}>
        <AlertIcon mr={-1.2} />
        <AlertTitle fontSize="sm">{alertTitle}</AlertTitle>
      </HStack>
      {alertDescription && (
        <AlertDescription fontSize="xs">{alertDescription}</AlertDescription>
      )}
    </Alert>
  );
};

export default AlertBox;
