import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CreateTeam from 'pages/Auth/CreateTeam';

export default {
  title: 'Genesis/Pages/CreateTeam',
  component: CreateTeam,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CreateTeam>;

const Template: ComponentStory<typeof CreateTeam> = () => <CreateTeam />;

export const Default = Template.bind({});
Default.args = {};
