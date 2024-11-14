import React from 'react';
import TextInput from 'components/Forms/TextInput';
import { useFormik } from 'formik';
import { textFormik } from 'tests/utils/textFormik';

export const MockTextInput = () => {
  return (
    <TextInput
      formik={useFormik(textFormik)}
      inputType="text"
      id="name"
      placeholder="Enter your name"
      label="Your Name"
    />
  );
};
