import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ResetPassword from 'pages/Auth/ResetPassword';
export default {
  title: 'Genesis/Pages/ResetPassword',
  component: ResetPassword,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ResetPassword>;

const Template: ComponentStory<typeof ResetPassword> = () => <ResetPassword />;

export const Default = Template.bind({});
Default.args = {};
