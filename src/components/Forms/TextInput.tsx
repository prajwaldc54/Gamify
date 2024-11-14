import { Box, FormLabel, Input, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

type TextInputProps = {
  formik: any;
  inputType: string;
  id: string;
  placeholder: string;
  label: string;
  value?: string;
  isReadOnly?: boolean;
  change?: any;
};

const TextInput: FC<TextInputProps> = (props) => {
  const { formik, inputType, id, placeholder, label, isReadOnly, value } =
    props;
  return (
    <Box>
      <Box
        border="1px solid"
        borderColor={
          formik.errors[id] && formik.touched[id]
            ? 'danger.400'
            : isReadOnly
            ? 'secondary.400'
            : 'secondary.200'
        }
        borderRadius="6px"
        px={3}
        bg={
          formik.errors[id] && formik.touched[id]
            ? 'danger.300'
            : isReadOnly
            ? 'secondary.100'
            : 'inherit'
        }
        _focusWithin={
          isReadOnly
            ? { borderColor: 'secondary.400' }
            : { borderColor: 'primary.300' }
        }>
        <FormLabel htmlFor={id} fontSize="xs" pt={1} m={0}>
          {label}
        </FormLabel>

        <Input
          id={id}
          type={inputType}
          border="none"
          focusBorderColor="none"
          placeholder={placeholder}
          value={value}
          p={0}
          h={9}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          _autofill={{
            boxShadow: '0 0 0 30px white inset',
          }}
          isReadOnly={isReadOnly}
        />
      </Box>
      {formik.touched[id] && formik.errors[id] && (
        <Text color="danger.500" fontSize="xs" data-testid="error-message">
          {formik.errors[id]}
        </Text>
      )}
    </Box>
  );
};

export default TextInput;
