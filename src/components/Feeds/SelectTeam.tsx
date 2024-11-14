import React, { useState } from 'react';
import { Text, Button, Box, Stack } from '@chakra-ui/react';
import { Team, PostFilterViewEnum } from 'Schema/Schema';
import TeamCheckBoxList from '../Common/TeamCheckBoxList';

type SelectTeamProps = {
  selectedTeams: Team['id'][];
  setSelectedTeams: React.Dispatch<React.SetStateAction<Team['id'][]>>;
  setViewType: React.Dispatch<React.SetStateAction<PostFilterViewEnum>>;
  onTeamsSelected?: (e: any) => void;
};

const SelectTeam: React.FC<SelectTeamProps> = (props) => {
  const { selectedTeams, setSelectedTeams, setViewType, onTeamsSelected } =
    props;
  const [currentlySelectedTeams, setCurrentlySelectedTeams] = useState<
    Team['id'][]
  >([...selectedTeams]);

  const handleSubmit = (e: any) => {
    setSelectedTeams(currentlySelectedTeams);
    onTeamsSelected?.(e);
    setViewType(PostFilterViewEnum.FILTER_VIEW);
  };
  return (
    <Box>
      <Text fontSize="sm" fontWeight="bold" marginBottom="10px">
        Select Teams
      </Text>
      <TeamCheckBoxList
        selectedTeams={currentlySelectedTeams}
        setSelectedTeams={setCurrentlySelectedTeams}
      />
      <Stack direction="row" spacing="12px" mt="25px">
        <Button colorScheme="blue" onClick={handleSubmit}>
          Done
        </Button>
        <Button onClick={() => setViewType(PostFilterViewEnum.FILTER_VIEW)}>
          Discard
        </Button>
      </Stack>
    </Box>
  );
};

export default SelectTeam;
