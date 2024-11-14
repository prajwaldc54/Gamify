import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CustomButton from './CustomButton';

interface ButtonProps {
  variants: 'primary' | 'secondary' | 'secondaryOutline';
  type: 'submit' | 'reset' | 'button';
  label: string;
  onClick?: () => void;
}

export default {
  title: 'Genesis/Components/CustomButton',
  component: CustomButton,
  argTypes: {
    type: { control: 'select' },
  },
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = (args: ButtonProps) => (
  <CustomButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  type: 'button',
  variants: 'primary',
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'button',
  variants: 'secondary',
  label: 'Button',
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  type: 'button',
  variants: 'secondaryOutline',
  label: 'Button',
};
