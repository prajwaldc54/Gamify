import React, { useState } from 'react';
import {
  Button,
  Center,
  Circle,
  Flex,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SidebarContainer } from 'themes/commonTheme';
import { MainSidebarProps } from 'Schema/SidebarSchema';
import { TopLogo } from '../_common/TopLogo';
import { ProfileBadges } from '../default/ProfileBadges';
import { ProgressCircle } from '../default/ProgressCircle';
import { TeamList } from '../team/TeamList';

export const DefaultSidebar = (props: MainSidebarProps) => {
  const { userInfo, teamInfo, handleCloseBtn } = props;

  return (
    <Flex
      position="fixed"
      direction="column"
      justify="space-between"
      borderRight={{ base: '1px solid #00000063', md: '0' }}
      style={SidebarContainer}>
      <Flex direction="column" w="100%">
        <TopLogo handleCloseBtn={handleCloseBtn} />

        <Flex
          direction={{ base: 'row', md: 'column' }}
          textAlign={{ base: 'left', md: 'center' }}>
          <Stack display={{ md: 'none' }}>
            <ProgressCircle size="80px" dimension="60px" userId={userInfo.id} />
          </Stack>

          <Stack display={{ base: 'none', md: 'block' }}>
            <ProgressCircle
              size="142px"
              dimension="110px"
              userId={userInfo.id}
            />
          </Stack>
          <Flex
            direction="column"
            justifyContent="end"
            ps={{ base: '5px', md: '0' }}
            pb={{ base: '15px', md: '0' }}>
            <h2>{userInfo?.name}</h2>
            <Text
              fontSize="sm"
              fontWeight="normal"
              color="secondary.500"
              textTransform="uppercase">
              UX/UI Designer
            </Text>
          </Flex>
        </Flex>

        <Flex direction="column">
          <Text fontSize="md" color="secondary.500" textAlign="right">
            1,782 XP
          </Text>

          <Center pb="15px">
            <Circle size="24px" bg="primary.600">
              <Text fontSize="xs" color="white">
                14
              </Text>
            </Circle>

            <Progress
              w="100%"
              h="7px"
              ps="1px"
              value={80}
              size="sm"
              color="primary.600"
              borderRadius="8px"
              bg="gray.400"
            />
          </Center>

          <Button
            bg="white"
            boxShadow="0px 3px 15px #00000029"
            border="1px"
            borderColor="secondary.500"
            borderRadius="6px">
            <Text
              data-testid="show-profile"
              fontSize="sm"
              fontWeight="600"
              color="secondary.700"
              textTransform="uppercase">
              Show my profile
            </Text>
          </Button>
        </Flex>

        <Flex direction="column">
          <Flex pt="15px" justifyContent="space-between">
            <Text fontSize="xs" color="black.800" textTransform="uppercase">
              Achievements
            </Text>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              color="primary.400"
              cursor="pointer">
              View All
            </Text>
          </Flex>

          <Center pt={1} justifyContent="space-between">
            <ProfileBadges />
          </Center>
        </Flex>

        <Flex direction="column">
          <Flex pt="12px" justifyContent="space-between">
            <Text fontSize="xs" color="black.800" textTransform="uppercase">
              Teams
            </Text>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              color="primary.400"
              cursor="pointer">
              View All
            </Text>
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
        </Flex>
      </Flex>

      <Text
        fontSize="xs"
        fontWeight="600"
        textTransform="uppercase"
        textAlign="center">
        MEMBER SINCE: MARCH 20, 2015
      </Text>
    </Flex>
  );
};
