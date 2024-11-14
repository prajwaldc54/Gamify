export interface Return {
  success?: boolean;
  message?: string;
  data?:    Data;
}

export interface Data {
  items?: Item[];
}

export interface Item {
  id?:        string;
  name?:      string;
  createdAt?: Date;
  deletedAt?: null;
}
