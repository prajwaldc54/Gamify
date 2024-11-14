import axios from 'utils/api';

export function createBadge(data: any) {
  return axios({
    url: '/badge',
    method: 'post',
    data: { ...data },
  });
}

export function getBadgesOfUser(userId: Number) {
  return axios({
    url: `/badge/user/${userId}`,
    method: 'get',
  });
}

export function getBadgesOfLoggedInUser() {
  return axios({
    url: '/badge',
    method: 'get',
  });
}
