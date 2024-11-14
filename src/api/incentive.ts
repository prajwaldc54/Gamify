import axios from 'utils/api';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + 'incentive/';

export function getIncentiveOfUser(userId: Number) {
  return axios({
    url: `/incentive/user/${userId}`,
    method: 'get',
  });
}

export function getIncentiveOfLoggedInUser() {
  return axios({
    url: '/incentive',
    method: 'get',
  });
}
