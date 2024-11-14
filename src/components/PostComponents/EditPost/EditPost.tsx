import { Modal, ModalOverlay } from '@chakra-ui/react';
import useDidMountEffect from 'hooks/useDidMountEffect';
import React, { useState } from 'react';
import { AudienceType, PostType, TagType, Team, Teams } from 'Schema/Schema';
import { combineTag } from 'utils/combineTag';
import { SelectModel } from '../CreatePost/SelectTeam';
import EditModal from './EditModal';

type EditProps = {
  tagEntered: TagType[];
  setTagEntered: (value: any) => void;
  setPostTitle: (value: string) => void;
  setContent: (value: string) => void;
  setTags: (value: string) => void;
  tags: string;
  postId: string;
  postTitle: string;
  postContent: string;
  postType: PostType;
  isEditOpen: boolean;
  onEditClose: () => void;
  postTeams?: any;
  postTags?: any;
};

const EditPost = (props: EditProps) => {
  const {
    postTitle,
    postContent,
    postTeams,
    postType,
    isEditOpen,
    onEditClose,
    postId,
    tags,
    setContent,
    setPostTitle,
    setTags,
    tagEntered,
    setTagEntered,
  } = props;

  const [showSearch, setShowSearch] = useState<string>(tags);
  const [value, setValue] = useState<string>(postContent);
  const [title, setTitle] = useState<string>(postTitle);
  const [teams, setTeams] = useState<Teams>([]);
  const [option, setOption] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [audience, setAudience] = useState<AudienceType>('');

  useDidMountEffect(() => {
    setShowSearch(tags);
    setTeams(selectTeam(postTeams));
  }, [tags]);

  const selectTeam = (postTeam: any) => {
    let selectedTeam = postTeam.map((data: any) => {
      return { teamId: data?.id, teamName: data?.teamName };
    });
    if (selectedTeam.length) setOption('2');
    else setOption('1');
    return selectedTeam;
  };

  const handleClose = () => {
    onEditClose();
    setAudience('');
    setImage('');
    setValue(postContent);
    setShowSearch(tags);
    setTitle(postTitle);
    setTeams(selectTeam(postTeams));
  };
  return (
    <>
      <Modal
        size={['sm', audience ? 'md' : '2xl']}
        blockScrollOnMount={false}
        isOpen={isEditOpen}
        onClose={handleClose}>
        <ModalOverlay />
        {audience ? (
          <SelectModel
            audience={audience}
            setAudience={setAudience}
            teams={teams}
            setTeams={setTeams}
            option={option}
            setOption={setOption}
          />
        ) : (
          <EditModal
            postId={postId}
            type={postType}
            setAudience={setAudience}
            teams={teams}
            image={image}
            setImage={setImage}
            value={value}
            setValue={setValue}
            title={title}
            setTitle={setTitle}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            tagEntered={tagEntered}
            setTagEntered={setTagEntered}
            onEditClose={onEditClose}
            setContent={setContent}
            setPostTitle={setPostTitle}
            setTags={setTags}
            handleClose={handleClose}
          />
        )}
      </Modal>
    </>
  );
};

export default EditPost;
