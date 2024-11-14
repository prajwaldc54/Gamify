import axios from 'utils/api';

export function addVoteToPost(postId: any, voteType: 'UP_VOTE' | 'DOWN_VOTE') {
  return axios({
    url: `/vote/post/${postId}`,
    method: 'post',
    data: { type: voteType },
  });
}

export function removeVoteFromPost(postId: any) {
  return axios({
    url: `/vote/post/${postId}`,
    method: 'delete',
  });
}

export function getPostUpvoteCount(postId: string) {
  return axios({
    url: `/vote/post/${postId}/count/up-vote`,
    method: 'get',
  });
}

export function getPostDownvoteCount(postId: string) {
  return axios({
    url: `/vote/post/${postId}/count/down-vote`,
    method: 'get',
  });
}

export function addVoteToComment(
  commentId: Number,
  voteType: 'UP_VOTE' | 'DOWN_VOTE'
) {
  return axios({
    url: `/vote/comment/${commentId}`,
    method: 'post',
    data: { type: voteType },
  });
}

export function removeVoteFromComment(commentId: Number) {
  return axios({
    url: `/vote/comment/${commentId}`,
    method: 'delete',
  });
}

export function getCommentUpvoteCount(commentId: Number) {
  return axios({
    url: `/vote/comment/${commentId}/count/up-vote`,
    method: 'get',
  });
}

export function getCommentDownvoteCount(commentId: Number) {
  return axios({
    url: `/vote/comment/${commentId}/count/down-vote`,
    method: 'get',
  });
}
