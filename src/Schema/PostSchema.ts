import {
  UserSchema,
  VoteTypeSchema,
  UP_VOTE,
  DOWN_VOTE,
  NOT_VOTED,
} from './Schema';
export type commentsVote = {
  id: number;
  type: string | null;
  createdAt: string;
  deletedAt: string | null;
  user: UserSchema | null;
}[];
export type Post = {
  post?: PostDetails;
  acceptedAnswer?: null | number;
  upVotes?: number;
  downVotes?: number;
  mentions?: any[];
  userVoteInPost?: null | UserVoteInPost;
};

export type PostDetails = {
  id?: string;
  title?: string;
  content?: string;
  isLocked?: boolean;
  type?: 'DISCUSSION' | 'URL';
  views?: number;
  createdAt?: string;
  deletedAt?: null | string;
  user?: UserSchema;
  tags?: Tag[];
  teams?: Team[];
  comments?: Comment[];
  markedAsHelpfulBy?: MarkAsHelpful[] | [];
};

export interface FeedPost extends PostDetails {
  votes: Vote[];
  commentsCount: number;
  upVotesCount: number;
  downVotesCount: number;
  markedAsHelpfulCount: 0;
}

export type Vote = {
  id: number;
  type: VoteTypeSchema;
  createdAt?: string;
  deletedAt?: null | string;
};

export type MarkAsHelpful = {
  id: string;
  createdAt: string;
  deletedAt: null | string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
export type CommentCount = {
  commentCount: string;
  commentMonth: string;
  commentYear: string;
};
export type PostCount = {
  postCount: string;
  postMonth: string;
  postYear: string;
};
export type Comment = {
  id: string;
  content: string;
  isAccepted?: boolean;
  createdAt?: string;
  deletedAt?: null | string;
  user?: UserSchema;
  postUserId?: string;
  loggedInUser?: string;
  postId?: string;
  teams?: Team[];
  refetchComments?: () => void;
  setEdit: (val: boolean) => void;
  setCommentId: (val: string) => void;
  setCommentValue: (val: string) => void;
};

export type Reply = {
  id?: string;
  content?: string;
  createdAt?: string;
  deletedAt?: null | string;
  user?: UserSchema;
  loggedInUser?: string;
  setReplyValue?: (val: string) => void;
  teamMembers?: {
    id: number;
    userId: number;
    teamId: number;
    role: string;
    createdAt: string;
    deletedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
  users: {
    id: number;
    display: string;
  }[];
  setReplyInputValue: any;
  setReply: (bool: boolean) => void;
  replyInputValue: string;
  postReply: (val: string) => void;
  refetchReplies?: () => void;
};

export type Tag = {
  id?: string;
  name?: string;
  createdAt?: string;
  deletedAt?: null | string;
};

export type Team = {
  id?: string;
  teamName?: string;
  createdAt?: string;
  deletedAt?: null | string;
  teamUser?: TeamUser[];
};

export type TeamUser = {
  id?: string;
  userId?: string;
  teamId?: string;
  role?: string;
  createdAt?: string;
  deletedAt?: null | string;
};

export type UserVoteInPost = {
  id: string;
  type: VoteTypeSchema;
  createdAt?: string;
  deletedAt?: null | string;
};
