import {
  Box,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type PasswordInputProps = {
  formik: any;
  label: string;
  placeholder: string;
  id: string;
};

const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);

  const { formik, label, placeholder, id } = props;
  return (
    <Box>
      <Box
        border="1px solid"
        borderColor={
          formik.errors[id] && formik.touched[id]
            ? 'danger.400'
            : 'secondary.200'
        }
        borderRadius="6px"
        px={3}
        bg={formik.errors[id] && formik.touched[id] ? 'danger.300' : 'white'}
        _focusWithin={{ borderColor: 'primary.300' }}>
        <FormLabel htmlFor={id} fontSize="xs" pt={1} m={0}>
          {label}
        </FormLabel>
        <InputGroup>
          <Input
            id={id}
            type={revealPassword ? 'text' : 'password'}
            border="none"
            focusBorderColor="none"
            placeholder={placeholder}
            p={0}
            h={9}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <InputRightElement
            data-testid="toggle-eye"
            onClick={() => {
              setRevealPassword((reveal: boolean) => !reveal);
            }}
            children={
              <Icon
                as={revealPassword ? AiFillEye : AiFillEyeInvisible}
                color="secondary.500"
                h={5}
                w={5}
                _hover={{ cursor: 'pointer' }}
              />
            }
          />
        </InputGroup>
      </Box>
      {formik.touched[id] && formik.errors[id] && (
        <Text data-testid="error-message" color="danger.500" fontSize="xs">
          {formik.errors[id]}
        </Text>
      )}
    </Box>
  );
};

export default PasswordInput;
