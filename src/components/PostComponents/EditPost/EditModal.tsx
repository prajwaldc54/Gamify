import {
  Box,
  Divider,
  Flex,
  Image,
  ModalCloseButton,
  ModalContent,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { AutoResizeTextarea } from 'components/Common/AutoResizeTextarea';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from 'api/file';
import { updatePost } from 'api/post';
import {
  AudienceType,
  PostError,
  PostType,
  TagType,
  Teams,
} from 'Schema/Schema';
import { titleValidator } from 'utils/titleValidator';
import { filterTag } from 'utils/filterTag';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';
import { getTeams } from 'api/team';
import CustomMarkdownEditior from '../CreatePost/CustomMarkdownEditior';
import CreateTag from '../CreatePost/CreateTag';
import UploadImage from '../CreatePost/UploadImage';
import SelectTeam from '../CreatePost/SelectTeam';
import EditFooter from './EditFooter';

type EditModalProps = {
  postId: string;
  type: PostType;
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
  onEditClose: () => void;
  setTags: (value: string) => void;
  setContent: (value: string) => void;
  setPostTitle: (value: string) => void;
  handleClose: () => void;
};

const EditModal = (props: EditModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostError>({
    titleError: false,
    imageError: false,
    postError: false,
    message: '',
  });

  const {
    type,
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
    postId,
    onEditClose,
    setContent,
    setPostTitle,
    setTags,
    handleClose,
  } = props;

  const loggedInUserInformation = useSelector(selectUser);
  const loggedInUserName = loggedInUserInformation?.name;
  const loggedInUserId = loggedInUserInformation?.id;

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

  const handleSave = async () => {
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
    updatePost(parseInt(postId), {
      teamIds: selectedTeam,
      tagIds: selectedTag,
      type: type,
      title: title,
      content: value,
    })
      .then((res) => {
        setLoading(false);
        setContent(value);
        setPostTitle(title);
        setTags(showSearch);
        onEditClose();
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
        Edit Post
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
      <EditFooter
        handleSave={handleSave}
        handleDiscard={handleClose}
        error={error}
        loading={loading}
      />
    </ModalContent>
  );
};

export default EditModal;
