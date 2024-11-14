import React from 'react';
import 'react-multi-email/style.css';
import { useParams } from 'react-router-dom';

import InviteMembersButton from 'components/TeamMemeberComponents/InviteMembersButton';

const ListOfTeamMembers = () => {
  let teamId: string = useParams().id!;
  return (
    <>
      <InviteMembersButton variant="primary" teamId={teamId} />
    </>
  );
};

export default ListOfTeamMembers;
