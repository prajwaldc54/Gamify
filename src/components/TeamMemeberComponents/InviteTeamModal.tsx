import {
  Button,
  CloseButton,
  Flex,
  FormLabel,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { ReactMultiEmail } from 'react-multi-email';
type InviteProps = {
  onClose: () => void;
  submitAction: () => void;
  emails: string[];
  setEmails: (emails: string[]) => void;
  loading: boolean;
};

const styles = {
  width: '90%',
  display: 'flex  ',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '10px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '14px',
  padding: '0px',
};
const InviteTeamModal: FC<InviteProps> = (props) => {
  let { onClose, submitAction, emails, setEmails, loading } = props;

  return (
    <Flex
      direction="column"
      bg="white"
      p="20px"
      maxWidth="800px"
      w="60vw"
      minW="350px"
      borderRadius="8px">
      <Flex alignItems="center" justify="space-between">
        <Text
          fontSize="2xl"
          color="#4F4F55"
          fontFamily="Times New Roman"
          fontWeight="bold">
          Invite Members to Your Team
        </Text>
        <ModalCloseButton position="static" />
      </Flex>
      <Text fontSize="l" color="secondary.500" fontWeight="regular" mb="30px">
        Send an invitation to join you team.
      </Text>
      <Flex
        direction="column"
        border="1px solid"
        _focusWithin={{
          borderColor: 'primary.300',
        }}
        borderRadius="6px"
        px="15px"
        py="10px"
        gap="2px">
        <FormLabel
          htmlFor={'emails'}
          color="secondary.500"
          fontSize="12px"
          m={0}>
          Invite them via email
        </FormLabel>
        <ReactMultiEmail
          style={styles}
          emails={emails}
          onChange={(_emails: string[]) => {
            setEmails(_emails);
          }}
          getLabel={(
            email: string,
            index: number,
            removeEmail: (index: number) => void
          ) => {
            return (
              <Flex
                key={index}
                background="#D5D5D8"
                align="center"
                gap="10px"
                px="7px"
                py="5px"
                borderRadius="4px">
                <Text fontSize="14px" color="subHeading.400">
                  {email}
                </Text>
                <CloseButton
                  size="sm"
                  data-tag-handle
                  onClick={() => removeEmail(index)}
                />
              </Flex>
            );
          }}
        />
      </Flex>
      <Text fontSize="xs" mt="5px" color="secondary.400">
        Add one or more emails, separated by either commas or spaces.
      </Text>
      <Flex mt="27px" gap="10px" align="center">
        <Button
          isLoading={loading}
          variant="primary"
          py="10px"
          px="15px"
          fontSize="14px"
          w="148px"
          onClick={() => submitAction()}>
          Invite Member
        </Button>
        <Button variant="ghost" onClick={onClose}>
          <Text fontSize="sm" color="secondary.500">
            Discard
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default InviteTeamModal;
