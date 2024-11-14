import React, { useState } from 'react';
import { Flex, Center, Circle, Spacer, Text } from '@chakra-ui/react';
import { BsChevronLeft } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { MainSidebarProps } from 'Schema/SidebarSchema';
import { SidebarContainer } from 'themes/commonTheme';
import { TopLogo } from '../_common/TopLogo';
import { Workspace } from '../_common/Workspace';
import { ActiveUser } from '../personal/ActiveUser';
import { TeamList } from '../team/TeamList';

export const TeamSidebar = (props: MainSidebarProps) => {
  const { userInfo, teamInfo, handleCloseBtn } = props;

  return (
    <Flex
      position="fixed"
      direction="column"
      borderRight={{ base: '1px solid #00000063', md: '0' }}
      style={SidebarContainer}
      color="secondary.650">
      <TopLogo handleCloseBtn={handleCloseBtn} />

      <Flex w="100%" alignItems="center">
        <Center py="18px">
          <NavLink to="/">
            <Circle
              size="30px"
              bg="white"
              border="2px solid"
              borderColor="secondary.150"
              _hover={{ bg: 'secondary.150' }}>
              <BsChevronLeft fontSize="14px" />
            </Circle>
          </NavLink>
          <Text ml="15px">Back to main</Text>
        </Center>
      </Flex>

      {teamInfo?.slice(0, 2).map((team: any) => (
        <TeamList
          key={team.id}
          teamId={team.id}
          name={team.teamName}
          brief="lorem ipsum has been…"
          role={team.teamUser[0].role}
        />
      ))}
      <Workspace />
      <Spacer />
      <ActiveUser userInfo={userInfo} />
    </Flex>
  );
};
