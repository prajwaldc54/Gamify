import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import axios from 'axios';
import * as Yup from 'yup';

import TextInput from 'components/Forms/TextInput';
import { useFormik } from 'formik';

export default {
  title: 'component/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be more than 3 chars'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'Password must contain at least 8 characters, a capital letter, a symbol and a number.'
        ),
      confirm_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      let newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      axios
        .post(
          'https://api.gamify.dev.diagonal.solutions/auth/register',
          newUser
        )
        .then((res) => {
          window.location.href = '/verify-email';
        });
    },
  });
  return <TextInput {...args} formik={formik} />;
};
export const Primary = Template.bind({});
