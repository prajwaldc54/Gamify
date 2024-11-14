import React, { useState } from 'react';
import {
  Button,
  Image,
  useToast,
  Flex,
  Text,
  CloseButton,
  Tooltip,
} from '@chakra-ui/react';
import unmark from '../../assets/icons/createpost/unmarkasHelpful.svg';
import markas from '../../assets/icons/createpost/markasHelpful.svg';
import { markPostAsHelpful, unmarkPostAsHelpful } from 'api/post';
import { useEffect } from 'react';
import { Post } from '../../Schema/PostSchema';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';
import {
  successToastContainerStyle,
  toastRenderContainerStyle,
} from '../../themes/toastThemes';

type MarkAsHelpfulProps = {
  postDetails: Post;
};

const MarkAsHelpful = (props: MarkAsHelpfulProps) => {
  const [mark, setMark] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [iconColor, setIconColor] = useState<boolean>(false);
  let postId = parseInt(props.postDetails.post?.id!);
  const user = useSelector(selectUser);

  useEffect(() => {
    let userId = user?.id;
    let arr = props.postDetails.post?.markedAsHelpfulBy!;
    if (arr.length !== 0) {
      arr.forEach((item: any) => {
        if (item?.user?.id == userId) {
          setIconColor(true);
          setMark(true);
        }
      });
    }
  }, [props]);

  let toast = useToast({
    position: 'top',
    duration: 3000,
  });

  const handleClick = () => {
    let currentMark = mark;
    setDisable(true);
    setMark(!mark);

    if (!currentMark === true)
      markPostAsHelpful(postId)
        .then(() => {
          setIconColor(true);
          setDisable(false);
          toast({
            containerStyle: successToastContainerStyle,
            render: ({ onClose }) => {
              return (
                <Flex style={toastRenderContainerStyle}>
                  <Text> Post is successfully marked as helpful</Text>
                  <CloseButton onClick={onClose} />
                </Flex>
              );
            },
          });
        })
        .catch(() => {
          setDisable(false);
        });
    if (!currentMark === false)
      unmarkPostAsHelpful(postId)
        .then(() => {
          setIconColor(false);
          setDisable(false);
          toast({
            containerStyle: successToastContainerStyle,
            render: ({ onClose }) => {
              return (
                <Flex style={toastRenderContainerStyle}>
                  <Text> Post is unmarked as helpful</Text>
                  <CloseButton onClick={onClose} />
                </Flex>
              );
            },
          });
        })
        .catch(() => {
          setDisable(false);
        });
  };
  return (
    <Button
      variant={'unstyled'}
      size="xs"
      isDisabled={disable}
      w={'fit-content'}
      onClick={handleClick}>
      {iconColor === false ? (
        <Tooltip label="Mark as helpful ?">
          <Image src={unmark} />
        </Tooltip>
      ) : (
        <Tooltip label="Unmark as helpful ?">
          <Image src={markas} />
        </Tooltip>
      )}
    </Button>
  );
};

export default MarkAsHelpful;
