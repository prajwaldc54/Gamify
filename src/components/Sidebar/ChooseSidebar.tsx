import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainSidebarProps } from 'Schema/SidebarSchema';
import { teamURL, personalURL } from 'utils/constants';
import { DefaultSidebar } from './_main/DefaultSidebar';
import { PersonalSidebar } from './_main/PersonalSidebar';
import { TeamSidebar } from './_main/TeamSidebar';

export const ChooseSidebar = (props: MainSidebarProps) => {
  const { userInfo, teamInfo, handleCloseBtn } = props,
    location = useLocation(),
    pathname = location.pathname,
    result = pathname.split('/')[1];

  if (teamURL.includes(result)) {
    return (
      <TeamSidebar
        userInfo={userInfo}
        teamInfo={teamInfo}
        handleCloseBtn={handleCloseBtn}
      />
    );
  } else if (personalURL.includes(result)) {
    return (
      <PersonalSidebar
        userInfo={userInfo}
        teamInfo={teamInfo}
        handleCloseBtn={handleCloseBtn}
      />
    );
  } else {
    return (
      <DefaultSidebar
        userInfo={userInfo}
        teamInfo={teamInfo}
        handleCloseBtn={handleCloseBtn}
      />
    );
  }
};
