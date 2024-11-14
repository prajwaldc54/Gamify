export type SidebarProps = {
  userInfo: any;
  teamInfo: any;
};

export interface MainSidebarProps extends SidebarProps {
  handleCloseBtn?: any;
}

export type MobileViewProps = {
  handleCloseBtn: any;
};

export type ActiveUserProps = {
  userInfo: {
    id: string;
    name: string;
    email: string;
  };
};

export type UserInfoProps = {
  title: string;
  img: string;
  link: string;
};

export type TeamListProps = {
  teamId: string;
  name: string;
  brief: string;
  role: string;
};

export type TeamInfoProps = {
  title: string;
  img: string;
  link: string;
};

export type TopLogoProps = {
  handleCloseBtn: any;
};

export type ProgressCircleProps = {
  size: string;
  dimension: string;
  userId: number;
};
