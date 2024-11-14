import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type TeamInfoCardProps = {
  teamName: string;
  teamId: number | string;
  teamManager: string;
};
const TeamInfoCard: React.FC<TeamInfoCardProps> = (props) => {
  const { teamName, teamId, teamManager } = props;
  const navigate = useNavigate();
  return (
    <Box
      bg="white"
      w="80%"
      borderRadius="8px"
      boxShadow="1px 0px 15px 1px #00000029"
      p={5}
      cursor="pointer"
      onClick={() => navigate(`/team/${teamId}`)}>
      <Avatar
        name={teamName}
        borderRadius="4px"
        bg="subHeading.200"
        color="black.800"
      />
      <Text mt={4} fontWeight="semibold">
        {teamName}
      </Text>
      <Text color="secondary.500" mt={2}>
        Team Manager: {teamManager}
      </Text>
    </Box>
  );
};

export default TeamInfoCard;
