import axios from 'utils/api';

export function createTag(data: any) {
  return axios({
    url: '/tag',
    method: 'post',
    data: { ...data },
  });
}

export function searchTag(query: any) {
  return axios({
    url: '/tag',
    method: 'get',
    params: query,
  });
}
