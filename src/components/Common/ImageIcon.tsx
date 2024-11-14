import React from 'react';
import { Image } from '@chakra-ui/react';

type MyImageProps = {
  size?: string;
  src: any;
  opacity?: number;
  padTop?: string;
  padRight?: string;
};

export const ImageIcon = (props: MyImageProps) => {
  const { size, src, opacity, padTop, padRight } = props;
  return (
    <Image
      w={size}
      h={size}
      src={src}
      opacity={opacity}
      display="inline"
      pr={padRight ? padRight : '5px'}
      pt={padTop}
    />
  );
};
