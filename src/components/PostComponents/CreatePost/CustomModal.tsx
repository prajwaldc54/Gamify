import { Modal, ModalOverlay } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AudienceType, PostType, TagType, Teams } from 'Schema/Schema';
import PostModal from './PostModal';
import { SelectModel } from './SelectTeam';

type CustomModalProps = {
  type: PostType;
  setType: (value: PostType) => void;
  isOpen: boolean;
  onClose: () => void;
  teams: Teams;
  setTeams: (value: Teams) => void;
};

const CustomModal = (props: CustomModalProps) => {
  const { type, setType, isOpen, onClose, teams, setTeams } = props;

  const [image, setImage] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const [showSearch, setShowSearch] = useState<string>('');
  const [tagEntered, setTagEntered] = useState<TagType[]>([]);

  const [audience, setAudience] = useState<AudienceType>('');

  const [option, setOption] = useState<string>('1');

  return (
    <>
      <Modal
        size={['sm', audience ? 'md' : '2xl']}
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setType('');
          setAudience('');
        }}>
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
          <PostModal
            type={type}
            setType={setType}
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
          />
        )}
      </Modal>
    </>
  );
};

export default CustomModal;
