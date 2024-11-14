import axios from 'utils/api';

export function addComment(data: any) {
  return axios({
    url: '/comment',
    method: 'post',
    data: { ...data },
  });
}

export function editComment(commentId: Number, data: any) {
  return axios({
    url: `/comment/${commentId}`,
    method: 'put',
    data: { ...data },
  });
}

export function deleteComment(commentId: Number) {
  return axios({
    url: `/comment/${commentId}`,
    method: 'delete',
  });
}

export function getComment(commentId: Number) {
  return axios({
    url: `/comment/${commentId}`,
    method: 'get',
  });
}

export function markCommentAsAnswered(commentId: Number) {
  return axios({
    url: `/comment/${commentId}/mark-as-answered`,
    method: 'patch',
  });
}

export function unmarkCommentAsAnswered(commentId: Number) {
  return axios({
    url: `/comment/${commentId}/un-mark-as-answered`,
    method: 'patch',
  });
}

export function getCommentsOfPostsOfUser(userId: Number, query: any) {
  return axios({
    url: `/comment/user/${userId}`,
    method: 'get',
    params: query,
  });
}

export function getCommentsOfPostsOfLoggedInUser(query: any) {
  return axios({
    url: '/comment/user',
    method: 'get',
    params: query,
  });
}
export function getAllCommentsOfTeam(teamId: any) {
  return axios({
    url: `/comment/comment-count-month-wise/${teamId}`,
    method: 'get',
  });
}
