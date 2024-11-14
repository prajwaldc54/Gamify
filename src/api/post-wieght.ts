import axios from 'utils/api';

export function getPostWeight(postId: Number) {
  return axios({
    url: `/post-weight/${postId}`,
    method: 'get',
  });
}
