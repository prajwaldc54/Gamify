import { Button } from '@chakra-ui/react';
import React from 'react';
interface ButtonProps {
  variants: 'primary' | 'secondary' | 'secondaryOutline';
  type: 'submit' | 'reset' | 'button';
  label: string;
  onClick?: () => void;
}

const CustomButton = ({ variants, label, type, ...props }: ButtonProps) => {
  return (
    <Button type={type} variant={variants} {...props}>
      {label}
    </Button>
  );
};

export default CustomButton;
