import { InviteSchema } from 'Schema/Schema';
import axios from 'utils/api';

export function registerTeam(data: any) {
  return axios({
    url: '/team',
    method: 'post',
    data: { ...data },
  });
}

export function getTeams(query: any) {
  return axios({
    url: '/team',
    method: 'get',
    params: query,
  });
}

export function getTeamMembers(teamId: string | number) {
  return axios({
    url: `/team/${teamId}/members`,
    method: 'get',
  });
}

export function invite(data: InviteSchema) {
  return axios({
    url: '/team/invitation',
    method: 'post',
    data: { ...data },
  });
}

export function getPendingInvitations(teamId: Number) {
  return axios({
    url: `/team/${teamId}/pending-invitations`,
    method: 'get',
  });
}

export function validateTeamLinkAndEmailToken(
  link: string,
  emailToken: string
) {
  return axios({
    url: `/team/validate/${link}/${emailToken}`,
    method: 'get',
  });
}

export function joinTeam(link: string, emailToken: string) {
  return axios({
    url: `/team/join/${link}/${emailToken}`,
    method: 'get',
  });
}

export function onboarding(data: any) {
  return axios({
    url: '/team/onboarding',
    method: 'post',
    data: { ...data },
  });
}

export function declineInvitation(data: any) {
  return axios({
    url: '/team/decline-invitation',
    method: 'delete',
    data: { ...data },
  });
}

export function cancelInvitation(data: any) {
  return axios({
    url: '/team/cancel-invitation',
    method: 'delete',
    data: { ...data },
  });
}

export function teamDashboard(teamId: string | number) {
  return axios({
    url: `/team/${teamId}/team-dashboard`,
    method: 'get',
  });
}

export function getTeamsByUserId(query: any) {
  return axios({
    url: `/team`,
    method: 'get',
    params: query,
  });
}

export function getTeamsOfLoggedInUser() {
  return axios({
    url: `/team/loggedInUser`,
    method: 'get',
  });
}
