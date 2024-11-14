import axios from 'utils/api';

export function uploadFile(data: any) {
  return axios({
    url: '/file',
    method: 'post',
    data: { ...data },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
