import { Box, Image, Text } from '@chakra-ui/react';
import { uploadFile } from 'api/file';
import { imageUpload } from 'assets/icons/createpost';

import React, { ChangeEvent } from 'react';

type UploadImageProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const UploadImage = (props: UploadImageProps) => {
  const { handleChange } = props;
  return (
    <form encType="multipart/form-data">
      <label htmlFor="file-input">
        <input
          type="file"
          id="file-input"
          style={{ display: 'none' }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
        />
        <Box display="flex" marginBottom="10px">
          <Image src={imageUpload} mr={2} cursor="pointer" />
          <Text color="#3069FE" fontSize="14px" cursor="pointer">
            Attach a File
          </Text>
        </Box>
      </label>
    </form>
  );
};

export default UploadImage;
