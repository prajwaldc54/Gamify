import React, { useRef } from 'react';
import {
  Flex,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Divider,
  useOutsideClick,
  useBoolean,
} from '@chakra-ui/react';
import { chevronDown, chevronRight, dashboard, userCog } from 'assets/icons';
import { TeamInfoProps, TeamListProps } from 'Schema/SidebarSchema';

const TeamInfo = (props: TeamInfoProps) => {
  const { title, img, link } = props;
  return (
    <Text as="a" href={link} display="flex" gap={1} alignItems="center">
      <Image src={img} />
      <span>{title}</span>
    </Text>
  );
};

export const TeamList = (props: TeamListProps) => {
  const { teamId, name, brief, role } = props;
  const ref = useRef<HTMLButtonElement | null>(null);
  const [isArrowDown, setIsArrowDown] = useBoolean();

  useOutsideClick({
    ref: ref,
    handler: setIsArrowDown.off,
  });

  return (
    <>
      <Flex w="100%" pt={1} justify="space-between" align="center">
        <Flex>
          <Image
            objectFit="cover"
            w="40px"
            h="40px"
            src={`https://picsum.photos/id/${teamId}/200/300`}
          />
          <Flex direction="column" textAlign="left" ps={3} fontWeight="bold">
            <Text fontSize="md">
              {name}
              {role === 'MANAGER' && ' *'}
            </Text>
            <Text fontSize="xs" fontWeight="normal">
              {brief}
            </Text>
          </Flex>
        </Flex>
        <Popover placement="bottom-start" arrowSize={9}>
          <PopoverTrigger>
            <Button
              ref={ref}
              size="xs"
              variant="ghost"
              px="0"
              onClick={setIsArrowDown.toggle}>
              <Image src={isArrowDown ? chevronRight : chevronDown} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            w="fit-content"
            bg="white"
            boxShadow="0px 1px 15px #00000029">
            <PopoverArrow />
            <PopoverBody>
              <Flex
                direction="column"
                p={1}
                gap={2}
                fontSize="sm"
                color="black"
                opacity={0.6}>
                <TeamInfo
                  title="Dashboard"
                  img={dashboard}
                  link={`/team/${teamId}`}
                />
                <TeamInfo title="Team Members" img={userCog} link="#" />
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Divider orientation="horizontal" py={0.5} borderColor="icon.400" />
    </>
  );
};
