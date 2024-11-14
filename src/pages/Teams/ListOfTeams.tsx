import { Box, Grid, Text } from '@chakra-ui/react';
import { getTeamsOfLoggedInUser } from 'api/team';
import TeamInfoCard from 'components/Common/TeamInfoCard';
import React, { useEffect, useState } from 'react';
import { LoggedInUsersTeamUserSchema } from 'Schema/Schema';

const ListOfTeams = () => {
  const [userTeams, setUserTeams] = useState([]);

  useEffect(() => {
    getTeamsOfLoggedInUser().then((res) => {
      const result = res.data.data;
      setUserTeams(result);
    });
  }, []);
  return (
    <Box bg="gray.100" h="100%" p={8}>
      <Text
        as="h1"
        fontSize="3xl"
        fontFamily="Times New Roman, sans"
        fontWeight="bold">
        List of teams
      </Text>
      <Grid
        templateColumns={[
          'repeat(1,1fr)',
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3,1fr)',
        ]}
        rowGap={10}
        mt={6}>
        {userTeams.map((userTeam: LoggedInUsersTeamUserSchema) => (
          <TeamInfoCard
            teamName={userTeam?.team?.teamName!}
            key={userTeam.teamId}
            teamId={userTeam.teamId}
            teamManager={userTeam.team?.teamUser[0].user?.name!}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ListOfTeams;
