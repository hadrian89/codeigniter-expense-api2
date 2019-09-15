import {
  ACTION_LOGIN,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  GET_USERID,
  GET_USERID_SUCCEEDED,
  GET_USERID_FAILED,
  ACTION_LOGOUT
} from "./constants";

export const actionLogout = () => {
  return {
    type: ACTION_LOGOUT,
  };
};

export const actionLogin = (username, password) => {
  return {
    type: ACTION_LOGIN,
    username,
    password
  };
};

export const loginSuccess = (token, username) => {
  return {
    type: LOGIN_SUCCEEDED,
    token,
    username
  };
};

export const loginError = error => {
  return {
    type: LOGIN_FAILED,
    error
  };
};

export const getUserId = (username, password) => {
  return {
    type: GET_USERID,
    username,
    password
  };
};

export const getUserIdLoaded = (userdetail, userid) => {
  return {
    type: GET_USERID_SUCCEEDED,
    userdetail,
    userid
  };
};

export const getUserIdError = error => {
  return {
    type: GET_USERID_FAILED,
    error
  };
};
