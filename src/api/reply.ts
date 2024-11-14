import axios from 'utils/api';

export function addReply(data: any) {
  return axios({
    url: '/reply',
    method: 'post',
    data: { ...data },
  });
}

export function updateReply(replyId: Number, data: any) {
  return axios({
    url: `/reply/${replyId}`,
    method: 'put',
    data: { ...data },
  });
}

export function deleteReply(replyId: Number) {
  return axios({
    url: `/reply/${replyId}`,
    method: 'delete',
  });
}

export function getReply(replyId: Number) {
  return axios({
    url: `/reply/${replyId}`,
    method: 'get',
  });
}
