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
import { UserInfoProps, ActiveUserProps } from 'Schema/SidebarSchema';

const UserInfo = (props: UserInfoProps) => {
  const { title, img, link } = props;
  return (
    <Text as="a" href={link} display="flex" gap={1} alignItems="center">
      <Image src={img} />
      <span>{title}</span>
    </Text>
  );
};

export const ActiveUser = (props: ActiveUserProps) => {
  const { userInfo } = props;
  const ref = useRef<HTMLButtonElement | null>(null);
  const [isOption, setIsOption] = useBoolean();

  useOutsideClick({
    ref: ref,
    handler: setIsOption.off,
  });

  return (
    <>
      <Divider orientation="horizontal" borderColor="gray.400" />
      <Flex w="100%" pt="13px" justify="space-between" align="center">
        <Flex>
          <Image
            objectFit="cover"
            w="40px"
            h="40px"
            src={`https://robohash.org/${userInfo.id}`}
          />
          <Flex direction="column" textAlign="left" ps={3} fontWeight="bold">
            <Text fontSize="md">{userInfo.name}</Text>
            <Text fontSize="xs" fontWeight="normal">
              {userInfo.email}
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
              onClick={setIsOption.toggle}>
              <Image src={isOption ? chevronRight : chevronDown} />
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
                <UserInfo title="Dashboard" img={dashboard} link="#" />
                <UserInfo title="Team Members" img={userCog} link="#" />
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </>
  );
};
