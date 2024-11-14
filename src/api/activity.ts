import axios from 'utils/api';

export function getActivity() {
  return axios({
    url: '/activity',
    method: 'get',
  });
}
