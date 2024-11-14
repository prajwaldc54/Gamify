import React, { useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useOutsideClick,
} from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { bell } from '../assets/icons';
import SearchBar from './Common/SearchBar';
import { logoutUser } from '../utils/logoutUtil';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/reducers/userSlice';

type BellButtonProps = {
  marginLeft?: string;
};

const Header = () => {
  const { name: loggedInUserName } = useSelector(selectUser);
  const [isActive, setIsActive] = useState<boolean>(false);
  const toogle = useRef<any>(null);
  useOutsideClick({
    ref: toogle,
    handler: () => setIsActive(false),
  });

  const BellButton = (props: BellButtonProps) => {
    const { marginLeft } = props;
    return (
      <Button size="40px" variant="ghost" ml={marginLeft}>
        <Image py={1} src={bell} alt="Bell Icon" />
      </Button>
    );
  };

  return (
    <>
      <Flex
        w="100%"
        h="60px"
        align="center"
        pe="20px"
        justifyContent={{ base: 'flex-end', md: 'space-between' }}>
        <Box display={{ base: 'none', md: 'block' }} width="70%">
          <SearchBar />
        </Box>
        <Flex align="center" gap="5px" ps={{ base: '0', md: '10px' }}>
          <Center>
            <Flex>
              {isActive ? (
                <>
                  <Box w={10} ref={toogle}>
                    <SearchBar />
                  </Box>
                  <BellButton marginLeft="230px" />
                </>
              ) : (
                <>
                  <Button
                    size="40px"
                    variant="ghost"
                    display={{ base: 'block', md: 'none' }}>
                    <BiSearchAlt2
                      size="25px"
                      onClick={() => setIsActive(true)}
                    />
                  </Button>
                  <BellButton />
                </>
              )}
            </Flex>
          </Center>

          <Menu>
            <MenuButton
              display={{ base: 'none', md: 'block' }}
              as={Avatar}
              size="sm"
              name={loggedInUserName}></MenuButton>
            <MenuList data-testid="sub-menu" zIndex={3}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={logoutUser}>Logout</MenuItem>
              <MenuItem>Saved</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Divider
        display={{ base: 'none', md: 'block' }}
        orientation="horizontal"
        borderColor="icon.400"
      />
    </>
  );
};

export default Header;
