import {
  Box,
  Button,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AllTeam, Team } from 'assets/icons/createpost';
import React from 'react';
import { BsFileX } from 'react-icons/bs';
import { TeamFilterEnum } from 'Schema/Schema';

type TeamFilterRadioBoxListProps = {
  option: TeamFilterEnum;
  setOption: React.Dispatch<React.SetStateAction<TeamFilterEnum>>;
  onSelectSpecificTeam: (e: any) => void;
};

const TeamFilterRadioBoxList: React.FC<TeamFilterRadioBoxListProps> = (
  props
) => {
  const { option, setOption, onSelectSpecificTeam } = props;

  return (
    <Flex direction="column">
      <RadioGroup
        onChange={(value) => setOption(value as TeamFilterEnum)}
        value={option}>
        <Stack direction="column">
          <Flex align="center">
            <Flex>
              <Box p={3} bg="#D5D5D8" borderRadius="4px" mr={3}>
                <Image src={AllTeam} />
              </Box>
              <Box>
                <Text as="p" color="#1A1919" fontWeight="medium">
                  All teams
                </Text>
                <Text as="span" fontSize="12px">
                  Anyone on the Team
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Flex>
              <Radio value={TeamFilterEnum.ALL_TEAMS} />
            </Flex>
          </Flex>

          <Flex align={'center'}>
            <Flex>
              <Box p={3} bg="#D5D5D8" borderRadius="4px" mr={3}>
                <Image src={Team} />
              </Box>
              <Box>
                <Text as="p" fontWeight="medium">
                  Specific team only
                </Text>
                <Text as="span" fontSize="12px">
                  Only for specific teams
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Box>
              <Radio
                value={TeamFilterEnum.SPECIFIC_TEAM}
                onClick={(e: any) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setOption(option);
                  onSelectSpecificTeam(e);
                }}
              />
            </Box>
          </Flex>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

export default TeamFilterRadioBoxList;
