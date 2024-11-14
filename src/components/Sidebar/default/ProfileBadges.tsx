import React from 'react';
import { ProfileBadge } from 'components/Common/ProfileBadge';
import { popular0, helpful0, hero0, streak0 } from 'assets/icons/sidebar';

export const ProfileBadges = () => {
  return (
    <>
      <ProfileBadge
        title="Popular"
        img={popular0}
        desc="Earn popular badges by asking questions."
        data-testid="myBadge1"
      />
      <ProfileBadge
        title="Helpful"
        img={helpful0}
        desc="Earn helpful badges by answering queries."
      />
      <ProfileBadge
        title="Hero"
        img={hero0}
        desc="Earn hero badges by giving the best advices."
      />

      <ProfileBadge
        title="Streak"
        img={streak0}
        desc="Earn streak badges by becoming active."
      />
    </>
  );
};
