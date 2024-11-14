import { SetUserData } from 'stores/action-types/actionTypes';
import { Dispatch } from 'redux';
import { Action } from 'stores/actions/action';
import { UserSchema } from 'Schema/Schema';

export const setUserData = (user: UserSchema) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: SetUserData,
      payload: user,
    });
  };
};
