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
import { deletePost } from 'api/post';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  successToastContainerStyle,
  toastRenderContainerStyle,
} from '../../themes/toastThemes';

type DeletePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: string | undefined;
  userPosts?: any;
  setUserPosts?: any;
  deletedFrom: 'post-page' | 'feed';
};

const DeletePostModal: React.FC<DeletePostModalProps> = (props) => {
  const { isOpen, onClose, postId, deletedFrom, setUserPosts, userPosts } =
    props;
  const [isAllowed, setIsAllowed] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [messageToShow, setMessageToShow] = useState<string>(
    'Are you sure you want to delete this post?'
  );
  const navigate = useNavigate();
  let toast = useToast({
    position: 'top',
    duration: 3000,
  });
  const handlePostDelete = () => {
    setIsSubmitting(true);
    deletePost(postId)
      .then(() => {
        setIsSubmitting(false);
        toast({
          containerStyle: successToastContainerStyle,
          render: ({ onClose }) => {
            return (
              <Flex style={toastRenderContainerStyle}>
                Post has been successfully deleted.
                <CloseButton onClick={onClose} />
              </Flex>
            );
          },
        });
        if (deletedFrom === 'post-page') navigate('/');
        if (deletedFrom === 'feed') {
          const updatedUserPosts = userPosts.filter(
            (post: any) => post.id != postId
          );
          setUserPosts(updatedUserPosts);
        }
        handleModalClose();
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.response.status === 403) {
          setIsAllowed(false);
          setMessageToShow(error.response.data.message);
        }
      });
  };

  const handleModalClose = () => {
    setIsAllowed(true);
    setMessageToShow('Are you sure you want to delete this post?');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="xl">
      <ModalOverlay />
      <ModalContent p={2}>
        <ModalHeader fontFamily="Times New Roman, sans-serif" fontWeight="bold">
          Delete Post
        </ModalHeader>
        <ModalCloseButton
          border="1px"
          w={8}
          fontSize="lg"
          borderColor="secondary.400"
          m={4}
        />
        <ModalBody color="secondary.500" fontFamily="Poppins, sans-serif">
          {messageToShow}
        </ModalBody>

        <ModalFooter
          justifyContent="flex-start"
          fontFamily="Poppins, sans-serif">
          {isAllowed && (
            <Button
              colorScheme="red"
              variant="outline"
              fontSize="14px"
              mr={3}
              onClick={handlePostDelete}
              isLoading={isSubmitting}
              loadingText="Deleting">
              Delete
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

export default DeletePostModal;
