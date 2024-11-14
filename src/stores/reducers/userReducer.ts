import { SetUserData } from '../action-types/actionTypes';
import { Action } from 'stores/actions/action';
import { UserSchema } from '../../Schema/Schema';

const initialState: UserSchema = {
  id: '',
  name: '',
  email: '',
};

const user = (state: UserSchema = initialState, action: Action) => {
  switch (action.type) {
    case SetUserData:
      return action.payload as UserSchema;
    default:
      return state;
  }
};

export default user;
