import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Spacer,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';

import React, { useState } from 'react';
import CustomModal from './CustomModal';
import CustomModalFooter from './CustomModalFooter';
import { PostType, Teams } from 'Schema/Schema';
import { PlusButton, SendButton } from 'assets/icons/createpost';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';

const CreatePost = () => {
  const [type, setType] = useState<PostType>('');
  const [teams, setTeams] = useState<Teams>([]);
  const { name: loggedInUserName } = useSelector(selectUser);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan620] = useMediaQuery('(min-width: 620px)');

  const handleClick = () => {
    onOpen();
  };

  if (isLargerThan620)
    return (
      <Box boxShadow=" 0px 1px 15px #00000029" p={3} borderRadius="2xl">
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          type={type}
          setType={setType}
          teams={teams}
          setTeams={setTeams}
        />
        <Flex
          alignContent="center"
          borderBottom="1px solid #00000029"
          p="15px"
          alignItems="center">
          <Avatar name={loggedInUserName} size="md" mr={4} />
          <Text
            as="p"
            width="100%"
            onClick={() => {
              handleClick();
              setType('URL');
            }}
            cursor="pointer">
            What do you want to share?
          </Text>
        </Flex>
        <Flex>
          <CustomModalFooter
            onOpen={handleClick}
            type={type}
            setType={setType}
          />
          <Spacer />
          <IconButton
            bg="#A9B3D5"
            aria-label="Post"
            size="md"
            icon={<SendButton />}
            padding="14px"
            height="45px"
            width="45px"
            isRound={true}
            marginTop="-14px"
          />
        </Flex>
      </Box>
    );
  else
    return (
      <>
        <IconButton
          icon={<PlusButton />}
          aria-label="create-post"
          colorScheme="#F5891D"
          bg="#F5891D"
          position="fixed"
          bottom="35%"
          right={5}
          padding="14px"
          height="45px"
          width="45px"
          isRound
          zIndex={1}
          onClick={handleClick}
        />
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          type={type}
          setType={setType}
          teams={teams}
          setTeams={setTeams}
        />
      </>
    );
};

export default CreatePost;
