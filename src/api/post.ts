import { PostFilterParamType } from 'Schema/Schema';
import axios from 'utils/api';

export function createPost(data: any) {
  return axios({
    url: '/post',
    method: 'post',
    data: { ...data },
  });
}

export function lockPost(postId: number) {
  return axios({
    url: `/post/${postId}/lock-post`,
    method: 'patch',
  });
}

export function deletePost(postId: any) {
  return axios({
    url: `/post/${postId}`,
    method: 'delete',
  });
}

export function markPostAsHelpful(postId: number) {
  return axios({
    url: `/post/${postId}/mark-as-helpful`,
    method: 'post',
  });
}

export function unmarkPostAsHelpful(postId: number) {
  return axios({
    url: `/post/${postId}/un-mark-as-helpful`,
    method: 'post',
  });
}

export function updatePost(postId: number, data: any) {
  return axios({
    url: `/post/${postId}`,
    method: 'put',
    data: { ...data },
  });
}

export function viewPost(postId: any) {
  return axios({
    url: `/post/${postId}`,
    method: 'get',
  });
}

export function getPostsFromTeams(query: any) {
  return axios({
    url: '/post/team',
    method: 'get',
    params: query,
  });
}

export function getRelatedPosts(postId: string | number, query: any) {
  return axios({
    url: `/post/${postId}/related-posts`,
    method: 'get',
    params: query,
  });
}

export function getTopPostOfUser(userId: number) {
  return axios({
    url: `/post/top-post/${userId}`,
    method: 'get',
  });
}

export function getTopPostOfLoggedInUser() {
  return axios({
    url: '/post/top-post',
    method: 'get',
  });
}

export function getPostsOfUser(userId: number, query: any) {
  return axios({
    url: `/post/user/${userId}`,
    method: 'get',
    params: query,
  });
}

export function getPostsOfLoggedInUser(query: any) {
  return axios({
    url: '/post/user',
    method: 'get',
    params: query,
  });
}

export function getPosts(
  limit: number,
  page: number,
  params?: PostFilterParamType
) {
  return axios({
    url: `/post/team`,
    method: 'get',
    params: { limit, page, ...(params ? { ...params } : {}) },
  });
}
export function getMonthWiseArticleCount(teamId: any) {
  return axios({
    url: `/post/post-count-month-wise/${teamId}`,
    method: 'get',
  });
}
export function getDiscussionCount(teamId: any) {
  return axios({
    url: `/post/count-discussion-post/${teamId}`,
    method: 'get',
  });
}
