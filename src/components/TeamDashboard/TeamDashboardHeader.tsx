import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { getTeamMembers } from 'api/team';
import InviteMembersButton from 'components/TeamMemeberComponents/InviteMembersButton';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserSchema } from 'Schema/Schema';
import { selectUser } from 'stores/reducers/userSlice';

type TeamDashboardHeaderProps = {
  teamName: string;
  teamId: number;
};

const TeamDashboardHeader: React.FC<TeamDashboardHeaderProps> = (props) => {
  const { teamName, teamId } = props;
  const [teamMembers, setTeamMembers] = useState<UserSchema[]>();
  const loggedInUserId = useSelector(selectUser).id;

  let isLoggedInUserTeamManager = teamMembers?.find(
    (teamMember) =>
      teamMember.id === loggedInUserId && teamMember.role === 'MANAGER'
  );

  useEffect(() => {
    getTeamMembers(teamId).then((res) => {
      var teamMemberData = res.data.data;
      var teamMemberUserData: UserSchema[] = [];
      teamMemberData.forEach((teamMember: any) => {
        let role = teamMember.role;
        teamMemberUserData.push({ ...teamMember.user, role });
      });
      setTeamMembers(teamMemberUserData);
    });
  }, [teamId]);

  return (
    <Flex
      px="14px"
      align="center"
      justify="center"
      flexDir={['column', 'column', 'column', 'column', 'row']}
      gap={[2, 2, 2, 2, 0]}
      my="20px">
      <Box>
        <Text
          fontFamily="Times New Roman, sans-serif"
          fontSize="28px"
          fontWeight="bold">
          {teamName}
        </Text>
        <Text fontFamily="Poppins" color="subHeading.400">
          Team members of {teamName} can access
        </Text>
      </Box>
      <Spacer />
      <HStack gap={[4, 4, 4, 4, 0]}>
        <Box>
          <AvatarGroup max={3} size="md">
            {teamMembers?.map((teamMember) => (
              <Avatar name={teamMember.name} key={teamMember.id}></Avatar>
            ))}
          </AvatarGroup>
        </Box>
        {isLoggedInUserTeamManager && (
          <InviteMembersButton variant="secondaryRounded" teamId={teamId} />
        )}
      </HStack>
      <Button
        variant="primary"
        ml={[0, 0, 0, 0, 10]}
        mt={[2, 2, 2, 2, 0]}
        w={['80%', '60%', '50%', '40%', 'inherit']}>
        Create new post
      </Button>
    </Flex>
  );
};

export default TeamDashboardHeader;
