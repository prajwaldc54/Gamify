import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Signup from '../../../pages/Auth/Signup';
import { useFormik } from 'formik';

export default {
  title: 'component/Signup',
  component: Signup,
} as ComponentMeta<typeof Signup>;

const Template: ComponentStory<typeof Signup> = (args) => <Signup />;
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
