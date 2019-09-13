import {
  GET_TOKEN,
  GET_TOKEN_SUCCEEDED,
  GET_TOKEN_FAILED,
  GET_USERID,
  GET_USERID_SUCCEEDED,
  GET_USERID_FAILED
} from "./constants";

export const getToken = (username, password) => {
  return {
    type: GET_TOKEN,
    username,
    password
  };
};

export const tokenLoaded = (token, username) => {
  return {
    type: GET_TOKEN_SUCCEEDED,
    token,
    username
  };
};

export const tokenLoadingError = error => {
  return {
    type: GET_TOKEN_FAILED,
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
