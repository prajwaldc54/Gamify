import axios from 'utils/api';

export function getStreak() {
  return axios({
    url: '/streak',
    method: 'get',
  });
}

export function createStreak(data: any) {
  return axios({
    url: '/streak',
    method: 'post',
    data: { ...data },
  });
}

export function getStreakOfUser(userId: Number) {
  return axios({
    url: `/streak/${userId}/user`,
    method: 'get',
  });
}

export function getStreakOfLoggedInUser() {
  return axios({
    url: '/streak/user',
    method: 'get',
  });
}
