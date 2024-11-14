import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  CloseButton,
} from '@chakra-ui/react';
import { deleteComment } from 'api/comment';
import { deleteReply } from 'api/reply';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  successToastContainerStyle,
  toastRenderContainerStyle,
} from '../../themes/toastThemes';

type DeleteCommentReplyProps = {
  isOpen: boolean;
  onClose: () => void;
  userPosts?: any;
  commentId?: string | undefined;
  replyId?: string | undefined;
  setUserPosts?: any;
  deletedFrom?: string;
  refetchComments?: any;
  refetchReplies?: () => void;
};

const DeleteCommentReply: React.FC<DeleteCommentReplyProps> = (props) => {
  const {
    isOpen,
    onClose,
    commentId,
    replyId,
    deletedFrom,
    refetchReplies,
    refetchComments,
  } = props;
  const [isAllowed, setIsAllowed] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [messageToShow, setMessageToShow] = useState<string>(
    `Are you sure you want to delete this ${
      commentId === '' ? 'reply' : 'comment'
    }?`
  );
  let toast = useToast({
    position: 'top',
    duration: 3000,
  });
  const handlePostDelete = () => {
    setIsSubmitting(true);
    if (!(commentId === ''))
      deleteComment(Number(commentId))
        .then(() => {
          setIsSubmitting(false);
          toast({
            containerStyle: successToastContainerStyle,
            render: ({ onClose }) => {
              return (
                <Flex style={toastRenderContainerStyle}>
                  Comment has been successfully deleted.
                  <CloseButton onClick={onClose} />
                </Flex>
              );
            },
          });

          refetchComments();
          handleModalClose();
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (error.response.status === 403) {
            setIsAllowed(false);
            setMessageToShow(error.response.data.message);
          }
        });
    if (!(replyId === '')) {
      deleteReply(Number(replyId))
        .then(() => {
          setIsSubmitting(false);
          toast({
            containerStyle: successToastContainerStyle,
            render: ({ onClose }) => {
              return (
                <Flex style={toastRenderContainerStyle}>
                  Reply has been successfully deleted.
                  <CloseButton onClick={onClose} />
                </Flex>
              );
            },
          });
          refetchReplies!();
          handleModalClose();
        })
        .catch((error) => {
          setIsSubmitting(false);
          if (error.response.status === 403) {
            setIsAllowed(false);
            setMessageToShow(error.response.data.message);
          }
        });
    }
  };

  const handleModalClose = () => {
    setIsAllowed(true);
    setMessageToShow(messageToShow);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent p={2}>
        <ModalHeader fontFamily="Times New Roman, sans-serif" fontWeight="bold">
          Delete {commentId === '' ? 'Reply' : 'Comment'}
        </ModalHeader>
        <ModalCloseButton
          border="1px"
          w={8}
          fontSize="lg"
          borderColor="secondary.400"
          m={4}
        />
        <ModalBody color="secondary.500">{messageToShow}</ModalBody>

        <ModalFooter justifyContent="flex-start">
          {isAllowed && (
            <Button
              colorScheme="red"
              variant="outline"
              fontSize="14px"
              mr={3}
              onClick={handlePostDelete}
              isLoading={isSubmitting}
              loadingText="Deleting">
              Delete {commentId === '' ? 'Reply' : 'Comment'}
            </Button>
          )}
          <Button
            variant={isAllowed ? 'ghost' : 'outline'}
            fontSize="14px"
            color="secondary.500"
            onClick={handleModalClose}>
            Discard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCommentReply;
