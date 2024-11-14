import React from 'react';
import { TopLogoProps } from 'Schema/SidebarSchema';
import { Flex, Stack, Button, Image } from '@chakra-ui/react';
import { close, logo } from 'assets/icons';
import { NavLink } from 'react-router-dom';

export const TopLogo = (props: TopLogoProps) => {
  const { handleCloseBtn } = props;
  return (
    <Flex
      h="60px"
      justify={{
        base: 'space-between',
        md: 'flex-start',
      }}
      align={{ base: 'center', md: 'left' }}>
      <NavLink to="/">
        <Image boxSize="30px" src={logo} />
      </NavLink>
      <Stack display={{ md: 'none' }}>
        <Button
          size="xs"
          px="0"
          zIndex="2"
          border="1px"
          borderColor="secondary.500"
          color="black.670"
          onClick={handleCloseBtn}>
          <Image src={close} />
        </Button>
      </Stack>
    </Flex>
  );
};
