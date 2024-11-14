import { Button, Flex, Text } from '@chakra-ui/react';
import { teamDashboard } from 'api/team';
import { CustomSpinner } from 'components/Common/CustomSpinner';
import TeamDashboardHeader from 'components/TeamDashboard/TeamDashboardHeader';
import TeamDashboardTopPosts from 'components/TeamDashboard/TeamDashboardTopPosts';
import TeamStatistics from 'components/TeamDashboard/TeamStatistics';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const TeamDashboard = () => {
  const [teamData, setTeamData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowedToView, setIsAllowedToView] = useState(true);

  const teamId: string = useParams().id!;
  useEffect(() => {
    teamDashboard(teamId)
      .then((res) => {
        setTeamData(res.data.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 403) setIsAllowedToView(false);
      });
  }, [teamId]);

  return isLoading ? (
    <CustomSpinner />
  ) : !isAllowedToView ? (
    <Flex justify="center" align="center" flexDir="column" h="full" gap={4}>
      <Text as="h1" fontSize="3xl">
        You are not allowed to view this team.
      </Text>
      <Link to="/">
        <Button variant="secondary">Back to Dashboard</Button>
      </Link>
    </Flex>
  ) : (
    <>
      <TeamDashboardHeader
        teamName={teamData?.teamName}
        teamId={teamData?.id}
      />

      {/* The stats component will go here */}
      <TeamStatistics />
      <TeamDashboardTopPosts teamId={teamData?.id} />
    </>
  );
};

export default TeamDashboard;
