import React from 'react';
import { Tooltip, Flex, Image, Text } from '@chakra-ui/react';

type ProfileBadgeProps = {
  title: string;
  img: string;
  desc: string;
};

export const ProfileBadge = (props: ProfileBadgeProps) => {
  const { img, title, desc } = props;

  const CustomBadge = () => <Image w="45px" h="55px" src={img} alt={title} />;

  return (
    <Tooltip
      hasArrow
      px="0"
      justifyContent={{ sm: 'center', md: 'space-between' }}
      placement="top"
      arrowSize={15}
      bg="white"
      boxShadow="0px 1px 15px #00000029"
      label={
        <Flex py="7px" ps="15px">
          <CustomBadge />
          <Flex flexDir="column" ml="15px">
            <Text fontSize="sm" fontWeight="600" color="black">
              {title}
            </Text>
            <Text fontSize="xs" color="secondary.500" pe={4}>
              {desc}
            </Text>
          </Flex>
        </Flex>
      }>
      <Flex>
        <CustomBadge />
      </Flex>
    </Tooltip>
  );
};
