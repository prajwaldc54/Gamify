import { Stack, Flex, Slide } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { SidebarProps } from 'Schema/SidebarSchema';
import { ChooseSidebar } from './Sidebar/ChooseSidebar';

const SideBar = (props: SidebarProps) => {
  const { userInfo, teamInfo } = props;
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const handleCloseBtn = () => setIsClosed(!isClosed);

  return (
    <>
      <Stack display={{ md: 'none' }}>
        <Flex h="60px" align="center" ps={4}>
          <BiMenuAltLeft fontSize="35px" onClick={handleCloseBtn} />
        </Flex>
        <Slide direction="left" in={!isClosed} style={{ zIndex: 100 }}>
          <ChooseSidebar
            userInfo={userInfo}
            teamInfo={teamInfo}
            handleCloseBtn={handleCloseBtn}
          />
        </Slide>
      </Stack>

      <Stack display={{ base: 'none', md: 'block' }}>
        <ChooseSidebar userInfo={userInfo} teamInfo={teamInfo} />
      </Stack>
    </>
  );
};

export default SideBar;
