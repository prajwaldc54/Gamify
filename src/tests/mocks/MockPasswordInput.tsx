import React from 'react';
import PasswordInput from 'components/Forms/PasswordInput';
import { useFormik } from 'formik';
import { passwordFormik } from 'tests/utils/passwordFormik';

export const MockPasswordInput = () => {
  return (
    <PasswordInput
      formik={useFormik(passwordFormik)}
      id="password"
      placeholder="Enter your password"
      label="Your password"
    />
  );
};
