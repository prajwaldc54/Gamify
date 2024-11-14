import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import 'react-multi-email/style.css';
import ResendInviteModal from '../../components/TeamMemeberComponents/ResendInviteModal';
import InviteTeamModal from '../../components/TeamMemeberComponents/InviteTeamModal';
import { invite } from 'api/team';
import { InviteSchema } from 'Schema/Schema';

type InviteMembersButtonProps = {
  variant: string;
  teamId: string | number;
};
const InviteMembersButton: React.FC<InviteMembersButtonProps> = (props) => {
  const { variant, teamId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emails, setEmails] = useState<string[]>([]);
  const [resend, setResend] = useState<boolean>(false);
  let [resendEmails, setResendEmails] = useState<string[]>([]);
  let toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  let submitAction = () => {
    let dataToSend: InviteSchema = {
      emails: [...emails],
      teamId: Number(teamId),
      resend: resend,
    };

    setLoading(true);

    invite(dataToSend)
      .then((res) => {
        setLoading(false);
        const result = res.data.data;
        if (result?.invitationAlreadySent.length > 0) {
          setEmails([]);
          setResendEmails(result.invitationAlreadySent);
          setResend(true);
        } else {
          onClose();
          setResend(false);
          toast({
            title: `Successfully invited ${emails.length} users`,
            position: 'top',
            isClosable: true,
            variant: 'subtle',
            status: 'success',
          });
          setEmails([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: `Error Occured while Inviting members`,
          position: 'top',
          isClosable: true,
          variant: 'error',
        });
      });
  };

  return (
    <>
      <Button variant={variant} onClick={onOpen}>
        + Invite Members
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems="center" w="fit-content">
          {resend ? (
            <ResendInviteModal
              loading={loading}
              resendEmails={resendEmails}
              setEmails={setEmails}
              emails={emails}
              submitAction={submitAction}
              onClose={onClose}
              setResend={setResend}
            />
          ) : (
            <InviteTeamModal
              loading={loading}
              emails={emails}
              setEmails={setEmails}
              submitAction={submitAction}
              onClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteMembersButton;
