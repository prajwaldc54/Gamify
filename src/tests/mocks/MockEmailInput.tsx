import React from 'react';
import TextInput from 'components/Forms/TextInput';
import { useFormik } from 'formik';
import { textFormik } from 'tests/utils/textFormik';

export const MockEmailInput = () => {
  return (
    <TextInput
      formik={useFormik(textFormik)}
      inputType="email"
      id="email"
      placeholder="example@domainname.com"
      label="Email Address"
    />
  );
};
