import {
  Box,
  Button,
  Flex,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AllTeam, Draft, Team } from 'assets/icons/createpost';
import React from 'react';

import { AudienceType, Teams } from 'Schema/Schema';

type SelectAudienceProps = {
  setAudience: (value: AudienceType) => void;
  option: string;
  setOption: (value: string) => void;
  setTeams: (value: Teams) => void;
};

const SelectAudience = (props: SelectAudienceProps) => {
  const { option, setOption, setAudience, setTeams } = props;

  const handleClick = () => {
    setAudience('Specific Team');
  };

  return (
    <>
      <ModalContent p={3}>
        <ModalHeader borderBottom="1px solid #F6F6F6">
          <Text as="h1" color="#373737" fontSize="xl">
            Select Audience
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column">
            <Box>
              <Text as="p" mb={1} fontWeight="medium">
                Who can see your post?
              </Text>
              <Text as="span" color="#707070" fontSize="14px">
                Your post will show up in feed, on your profile and in search
              </Text>
            </Box>

            <RadioGroup onChange={setOption} value={option}>
              <Stack direction="column" mt={4}>
                <Flex>
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
                  <Radio value="1" onChange={() => setTeams([])} />
                </Flex>

                <Flex>
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
                  <Radio value="2" onClick={handleClick} />
                </Flex>

                <Flex>
                  <Flex>
                    <Box p={3} bg="#D5D5D8" borderRadius="4px" mr={3}>
                      <Image src={Draft} />
                    </Box>
                    <Box>
                      <Text as="p" mt={2} fontWeight="medium">
                        Save as draft
                      </Text>
                    </Box>
                  </Flex>
                  <Spacer />
                  <Radio value="3" />
                </Flex>
              </Stack>
            </RadioGroup>

            <Flex mt={8}>
              <Button
                colorScheme="messenger"
                fontSize="14px"
                onClick={() => setAudience('')}>
                Save
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default SelectAudience;
