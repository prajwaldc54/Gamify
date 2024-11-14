import React, { useState } from 'react';
import { Flex, Divider, Text } from '@chakra-ui/react';
import { ImageIcon } from 'components/Common/ImageIcon';
import { FaUser } from 'react-icons/fa';
import { MainSidebarProps } from 'Schema/SidebarSchema';
import { SidebarContainer } from 'themes/commonTheme';
import { TeamList } from '../team/TeamList';
import { TopLogo } from '../_common/TopLogo';
import { Workspace } from '../_common/Workspace';
import { PlusButton } from 'assets/icons/createpost';

export const PersonalSidebar = (props: MainSidebarProps) => {
  const { teamInfo, handleCloseBtn } = props;

  return (
    <Flex
      position="fixed"
      direction="column"
      borderRight={{ base: '1px solid #00000063', md: '0' }}
      style={SidebarContainer}>
      <TopLogo handleCloseBtn={handleCloseBtn} />
      <Flex w="100%" direction="column">
        <Flex mt="20px" mb="13px" color="subHeading.600" align="center">
          <FaUser fontSize="20px" />
          <Text ml="10px" fontWeight="600" fontSize="18px">
            Personal
          </Text>
        </Flex>
        <Flex pl="30px" fontSize="16px" direction="column" gap="12px">
          <Text>Profile</Text>
          <Text>Preferences</Text>
          <Text>Notifications</Text>
          <Text>Themes</Text>
        </Flex>
      </Flex>
      <Workspace />

      <Divider
        mt="20px"
        mb="15px"
        orientation="horizontal"
        borderColor="gray.400"
      />

      {teamInfo?.slice(0, 2).map((team: any) => (
        <TeamList
          key={team.id}
          teamId={team.id}
          name={team.teamName}
          brief="lorem ipsum has been…"
          role={team.teamUser[0].role}
        />
      ))}

      <Flex mt="20px" align="center">
        <ImageIcon src={PlusButton} padRight="0" />
        <Text ml="10px" fontWeight="600">
          Create team or group
        </Text>
      </Flex>
    </Flex>
  );
};
