import { usersInfoConstants } from '../constants';
import { usersInfoServices } from '../services';

let users = {};

const obtainUserInfo = (userId) => dispatch => {
  dispatch({
    type: usersInfoConstants.USERS_INFO_REQUEST
  });
  if (userId in users) {
    dispatch({
      type: usersInfoConstants.USERS_INFO_SUCCESS,
      payload: {
        users,
      },
    });
    return;
  }
  usersInfoServices.obtainUserInfo(userId)
    .then(
      user => {
        users[userId] = user;
        dispatch({
          type: usersInfoConstants.USERS_INFO_SUCCESS,
          payload: {
            users,
          },
        });
      },
      errors => {
        dispatch({
          type: userInfoConstants.USERS_INFO_FAILURE,
          payload: {
            errors,
          },
        });
      }
    );
};

export const usersInfoActions = {
  obtainUserInfo
};