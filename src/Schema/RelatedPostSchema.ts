import { PostDetails } from './PostSchema';

export interface RelatedPostDetails extends PostDetails {
  upVotesCount: number;
  downVotesCount: number;
  tagsCount: number;
  commentCount: number;
}

export type meta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type RelatedPostSchema = {
  items?: RelatedPostDetails[] | [];
  meta?: meta;
};
