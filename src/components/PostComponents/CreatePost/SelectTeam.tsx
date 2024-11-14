import { Flex, Image, Text } from '@chakra-ui/react';
import { Earth, MenuDown } from 'assets/icons/createpost';
import React from 'react';
import { AudienceType, Teams } from 'Schema/Schema';
import SelectAudience from './SelectAudience';
import SelectTeamModel from './SelectTeamModel';

type SelectTeamProps = {
  setAudience: (value: AudienceType) => void;
};

const SelectTeam = (props: SelectTeamProps) => {
  const { setAudience } = props;
  return (
    <Flex
      alignItems="center"
      border="1px solid #707070"
      borderRadius="50px"
      fontSize="14px"
      p="3px 10px"
      cursor="pointer"
      onClick={() => setAudience('All Team')}>
      <Image src={Earth} alt="earth" mr="2px" />
      <Text as="span" mr={1}>
        All
      </Text>
      <Text as="span">Teams</Text>

      <Image src={MenuDown} alt="menu-down" ml="10px" />
    </Flex>
  );
};

export default SelectTeam;

type SelectModelProps = {
  audience: AudienceType;
  setAudience: (value: AudienceType) => void;
  teams: Teams;
  setTeams: (value: Teams) => void;
  option: string;
  setOption: (value: string) => void;
};

export const SelectModel = (props: SelectModelProps) => {
  const { audience, setAudience, teams, setTeams, option, setOption } = props;
  return (
    <>
      {audience === 'Specific Team' ? (
        <SelectTeamModel
          teams={teams}
          setTeams={setTeams}
          setAudience={setAudience}
          setOption={setOption}
        />
      ) : (
        <SelectAudience
          setTeams={setTeams}
          option={option}
          setOption={setOption}
          setAudience={setAudience}
        />
      )}
    </>
  );
};
