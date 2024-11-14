import { UserSchema } from '../../Schema/Schema';

export type Action = {
  type: string;
  payload?: UserSchema;
};
