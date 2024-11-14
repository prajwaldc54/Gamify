import axios from 'utils/api';

export function getUser(userId: Number | string) {
  return axios({
    url: `/user/${userId}`,
    method: 'get',
  });
}
