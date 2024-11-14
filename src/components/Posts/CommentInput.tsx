import { Box, useToast, Divider, Flex, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { addComment, editComment } from 'api/comment';
import { uploadFile } from 'api/file';
import CustomMarkdownEditiorForComment from 'components/Posts/CustomMarkdownEditiorForComment';
interface props {
  postId: number;
  commentId?: number;
  setEdit?: any;
  commentValue?: string;
  refetchComments?: any;
}
export const CommentInput: React.FC<props> = (props) => {
  const { postId, refetchComments, commentId, setEdit, commentValue } = props;
  let toast = useToast({
    position: 'top',
    duration: 3000,
    containerStyle: {
      boxShadow: '0px 1px 15px #00000029',
      padding: '5px 10px',
      borderRadius: '8px',
      backgroundColor: 'white',
      zIndex: 1,
    },
  });

  const [value, setValue] = useState<string>(
    !(commentValue === '') ? commentValue! : ''
  );
  const [image, setImage] = useState<string>('');
  const handleChange = (e: any): void => {
    if (!e.target.files) return;
    uploadFile({ file: e.target.files[0] }).then((res) => {
      setImage(res?.data?.data[0]?.path);
    });
  };

  const AddComment = () => {
    if (!(value === '')) {
      addComment({
        postId: postId,
        content: value,
      })
        .then((res) => {
          refetchComments();
        })
        .catch((err) => {
          toast({
            title: `${err.response?.data.message}`,
            status: 'error',
          });
        });
    }
  };
  const updateComment = () => {
    editComment(commentId!, { content: value }).then((res) => {
      refetchComments();

      setEdit(false);
    });
  };
  return (
    <Box w="100%">
      <CustomMarkdownEditiorForComment
        value={value}
        setValue={setValue}
        image={image}
        setImage={setImage}></CustomMarkdownEditiorForComment>
      <Divider></Divider>
      <Box p={2}>
        <Flex justifyContent="space-between">
          <Box>
            <Text>
              <Text as="span" color="#3069FE">
                Markdown{' '}
              </Text>
              and{' '}
              <Text as="span" color="#3069FE">
                quick actions{' '}
              </Text>
              are supported
            </Text>
          </Box>
          <form encType="multipart/form-data">
            <label htmlFor="file-input">
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <Box display="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    fill: '#3069FE',
                  }}
                  version="1.1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24">
                  <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                </svg>
                <Text color="#3069FE">Attach a File </Text>
              </Box>
            </label>
          </form>
        </Flex>
        <Button
          bgColor="#3069FE"
          color="white"
          onClick={() => {
            commentId ? updateComment() : AddComment();
            setValue('');
          }}>
          Post your answer
        </Button>
        <Button
          color="#707070"
          bg="transparent"
          onClick={() => {
            setValue('');
            setEdit(false);
          }}>
          Discard
        </Button>
      </Box>
    </Box>
  );
};
