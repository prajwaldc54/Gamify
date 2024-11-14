export type UserSchema = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export type InviteSchema = {
  emails: string[];
  teamId: number;
  resend: boolean;
};

export type LoggedInUsersTeamUserSchema = {
  id: string;
  userId: string;
  teamId: string;
  role: string;
  createdAt: Date;
  deletedAt: Date;
  team?: LoggedInUserTeamsSchema;
  user?: UserSchema;
};

export type LoggedInUserTeamsSchema = {
  id: string;
  teamName: string;
  createdAt: Date;
  deletedAt: Date;
  teamUser: LoggedInUsersTeamUserSchema[];
};

export type VoteTypeSchema = 'UP_VOTE' | 'DOWN_VOTE' | 'NOT_VOTED';

export const UP_VOTE = 'UP_VOTE';
export const DOWN_VOTE = 'DOWN_VOTE';
export const NOT_VOTED = 'NOT_VOTED';

export type PostType =
  | 'URL'
  | 'DISCUSSION'
  | 'Write a Blog'
  | 'Write Wiki'
  | '';

export type AudienceType = 'All Team' | 'Specific Team' | 'Draft' | string;

export type Team = {
  id: number | string;
  teamId: string;
  teamName: string;
};

export type Teams = Team[];

export type TagType = {
  tagId: string;
  tagName: string;
};

export type PostError = {
  titleError: boolean;
  imageError: boolean;
  postError: boolean;
  message: string;
};

export enum PostSortByEnum {
  LATEST = 'LATEST',
  POPULARITY = 'POPULARITY',
  HELPFULNESS = 'HELPFULNESS',
}

export enum TeamFilterEnum {
  ALL_TEAMS = 'ALL_TEAMS',
  SPECIFIC_TEAM = 'SPECIFIC_TEAM',
}

export enum PostFilterTypeEnum {
  ALL = 'ALL',
  DISCUSSION = 'DISCUSSION',
  URL = 'URL',
}

export enum PostFilterViewEnum {
  FILTER_VIEW = 'FILTER_VIEW',
  SELECT_TEAM_VIEW = 'SELECT_TEAM_VIEW',
}

export type PostFilterParamType = {
  type?: PostFilterTypeEnum;
  teamIds?: Team['id'][];
  startDate?: Date | string;
  endDate?: Date | string;
  sortBy?: PostSortByEnum;
};
