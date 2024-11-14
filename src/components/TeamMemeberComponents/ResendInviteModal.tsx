import {
  Button,
  Checkbox,
  Flex,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import React, { FC } from 'react';
type DuplicateInviteProps = {
  resendEmails: string[];
  setEmails: (emails: string[]) => void;
  emails: string[];
  submitAction: () => void;
  onClose: () => void;
  setResend: (resend: boolean) => void;
  loading: boolean;
};
const ResendInviteModal: FC<DuplicateInviteProps> = (props) => {
  let {
    resendEmails,
    setEmails,
    emails,
    submitAction,
    onClose,
    setResend,
    loading,
  } = props;

  let handlechange = (e: any) => {
    if (e.checked) {
      props.setEmails([...emails, e.value]);
    } else {
      let resendmail = emails.filter((email) => email !== e.value);
      setEmails(resendmail);
    }
  };

  return (
    <>
      <Flex
        direction="column"
        bg="white"
        p="30px"
        maxWidth="800px"
        w="60vw"
        minW="350px"
        borderRadius="8px">
        <Flex alignItems="center" justify="space-between">
          <Text
            fontSize="22px"
            color="#4F4F55"
            fontFamily="Times New Roman"
            fontWeight="bold"
            mb="5px">
            Duplicate Emails
          </Text>
          <ModalCloseButton position="static" />
        </Flex>

        <Text color="secondary.500" fontSize="l" fontWeight="regular" mb="30px">
          There is duplicate email in the Invitation. Would you like to resend
          an Invitation?
        </Text>
        <Flex direction="column" mb="30px">
          {resendEmails.map((email, index) => (
            <Checkbox
              key={index}
              size="sm"
              onChange={(e) => handlechange(e.target)}
              value={email}>
              <Text fontSize="sm" mb="2.5px" color="subHeading.400">
                {email}
              </Text>
            </Checkbox>
          ))}
        </Flex>
        <Flex gap="10px">
          <Button
            variant="primary"
            isLoading={loading}
            onClick={() => submitAction()}>
            Resend Invitation
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onClose();
              setResend(false);
            }}>
            <Text fontSize="sm" color="secondary.500">
              Discard
            </Text>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default ResendInviteModal;
