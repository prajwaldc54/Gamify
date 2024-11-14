import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import CustomCheckBox from './CustomCheckBox';
import { AudienceType, Teams } from 'Schema/Schema';
import { Search } from 'assets/icons/createpost';

type SelectTeamModelProps = {
  teams: Teams;
  setTeams: (value: Teams) => void;
  setAudience: (value: AudienceType) => void;
  setOption: (value: string) => void;
};

const SelectTeamModel = (props: SelectTeamModelProps) => {
  const { teams, setTeams, setAudience, setOption } = props;
  return (
    <>
      <ModalContent p={3}>
        <ModalHeader borderBottom="1px solid #F6F6F6">
          <Text as="h1" color="#373737" fontSize="xl">
            Select Team
          </Text>
          <InputGroup bg="#F6F6F6" border="none">
            <InputLeftElement>
              <Icon as={Search} />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Search for a team"
              border="none"
              focusBorderColor="none"
            />
          </InputGroup>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <CustomCheckBox
            teams={teams}
            setTeams={setTeams}
            setAudience={setAudience}
            setOption={setOption}
          />
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default SelectTeamModel;
