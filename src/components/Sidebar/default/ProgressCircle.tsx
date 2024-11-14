import React from 'react';
import {
  Avatar,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { ProgressCircleProps } from 'Schema/SidebarSchema';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';

export const ProgressCircle = (props: ProgressCircleProps) => {
  const { name: loggedInUserName } = useSelector(selectUser);

  const { size, dimension, userId } = props;
  return (
    <CircularProgress value={80} size={size} thickness={4} color="primary.400">
      <CircularProgressLabel>
        <Avatar w={dimension} h={dimension} name={loggedInUserName} />
      </CircularProgressLabel>
    </CircularProgress>
  );
};
