import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useFormik } from 'formik';
import ForgetPassword from '../../../pages/Auth/ForgetPassword';

export default {
  title: 'component/ForgetPassword',
  component: ForgetPassword,
} as ComponentMeta<typeof ForgetPassword>;

const Template: ComponentStory<typeof ForgetPassword> = (args) => (
  <ForgetPassword />
);
export const Primary = Template.bind({});
