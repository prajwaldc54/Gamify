import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  ModalCloseButton,
  ModalContent,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { AutoResizeTextarea } from 'components/Common/AutoResizeTextarea';
import React, { ChangeEvent, useState } from 'react';
import CustomMarkdownEditior from './CustomMarkdownEditior';
import CustomModalFooter from './CustomModalFooter';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from 'api/file';
import { createPost } from 'api/post';
import {
  AudienceType,
  PostError,
  PostType,
  TagType,
  Teams,
} from 'Schema/Schema';
import { titleValidator } from 'utils/titleValidator';
import CreateTag from './CreateTag';
import { filterTag } from 'utils/filterTag';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';
import UploadImage from './UploadImage';
import { getTeams } from 'api/team';
import { SendButton } from 'assets/icons/createpost';
import SelectTeam from './SelectTeam';

type PostModalProps = {
  type: PostType;
  setType: (value: PostType) => void;
  setAudience: (value: AudienceType) => void;
  teams: Teams;
  image: string;
  setImage: (value: string) => void;
  value: string;
  setValue: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  showSearch: string;
  setShowSearch: (value: string) => void;
  tagEntered: TagType[];
  setTagEntered: (value: TagType[]) => void;
};

const PostModal = (props: PostModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostError>({
    titleError: false,
    imageError: false,
    postError: false,
    message: '',
  });

  const {
    type,
    setType,
    setAudience,
    teams,
    value,
    setValue,
    image,
    setImage,
    title,
    setTitle,
    showSearch,
    setShowSearch,
    tagEntered,
    setTagEntered,
  } = props;

  const loggedInUserInformation = useSelector(selectUser);
  const loggedInUserName = loggedInUserInformation?.name;
  const loggedInUserId = loggedInUserInformation?.id;

  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const navigate = useNavigate();

  let handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setTitle(inputValue);
    setError((preV) => {
      return { ...preV, titleError: titleValidator(inputValue) };
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;
    uploadFile({ file: event.target.files[0] })
      .then((res) => {
        setImage(res?.data?.data[0]?.path);
      })
      .catch((error) => {
        setError((prev) => {
          return {
            ...prev,
            imageError: true,
            message: error?.response?.data?.message,
          };
        });
      });
  };

  const handleClick = async () => {
    let selectedTag = filterTag(tagEntered, showSearch);

    let selectedTeam;

    if (teams.length) {
      selectedTeam = teams.map((item) => {
        return item?.teamId;
      });
    } else {
      const res = await getTeams({ userId: loggedInUserId });
      selectedTeam = res?.data?.data?.items.map((data: any) => {
        return data?.id;
      });
    }
    setLoading(true);
    createPost({
      teamIds: selectedTeam,
      tagIds: selectedTag,
      type: type,
      title: title,
      content: value,
    })
      .then((res) => {
        setLoading(false);
        navigate(`/post/${res.data.data.id}`);
      })
      .catch((error) => {
        setLoading(false);
        setError((prev) => {
          return {
            ...prev,
            postError: true,
            message: error.response.data.message,
          };
        });
      });
  };

  return (
    <ModalContent p={[5, 7]}>
      <Text as="p" fontSize="md" fontWeight="bold">
        Create a post
      </Text>
      <Divider orientation="horizontal" m="5px 0" />
      <Flex alignContent="center">
        <Image
          borderRadius="full"
          w="50px"
          h="50px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          mr={4}
        />
        <Flex direction="column">
          <Text as="p" color="#707070" fontWeight="medium">
            {loggedInUserName}
          </Text>
          <SelectTeam setAudience={setAudience} />
        </Flex>
      </Flex>
      <AutoResizeTextarea
        placeholder="Title of your post"
        value={title}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleInputChange(event)
        }
        border="none"
        focusBorderColor="none"
        isRequired={true}
        isInvalid={error.titleError}
        errorBorderColor="none"
        fontSize={['14px', '16px']}
        p={0}
      />
      {error.titleError && (
        <Text fontSize="xs" color="danger.500">
          Title should have max 255 and min 3 characters
        </Text>
      )}
      <ModalCloseButton />

      <Box borderBottom="1px solid #d0d7de" data-color-mode="light" mt="12px">
        <CustomMarkdownEditior
          value={value}
          setValue={setValue}
          image={image}
          setImage={setImage}
        />
        <Flex direction={['column', 'row']} mb={3}>
          <CreateTag
            handleChange={handleChange}
            setShowSearch={setShowSearch}
            showSearch={showSearch}
            setTagEntered={setTagEntered}
          />
          <Flex direction="column" justifyContent="flex-end">
            <UploadImage handleChange={handleChange} />
            {error.imageError && (
              <Text fontSize="xs" color="danger.500" fontWeight="medium">
                {error.message}
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
      <Flex direction={['column', 'row']}>
        <CustomModalFooter type={type} setType={setType} />
        <Spacer />
        <Flex direction="column" alignItems="center">
          {isLargerThan480 ? (
            <IconButton
              colorScheme="blue"
              aria-label="Post"
              icon={<SendButton />}
              padding="14px"
              height="45px"
              width="45px"
              isRound={true}
              marginTop="-14px"
              isLoading={loading}
              onClick={handleClick}
            />
          ) : (
            <Button
              colorScheme="blue"
              width="100%"
              mt={3}
              isLoading={loading}
              onClick={handleClick}>
              Create Post
            </Button>
          )}

          {error.postError && (
            <Text fontSize="xs" color="danger.500" fontWeight="medium">
              {error.message}
            </Text>
          )}
        </Flex>
      </Flex>
    </ModalContent>
  );
};

export default PostModal;
