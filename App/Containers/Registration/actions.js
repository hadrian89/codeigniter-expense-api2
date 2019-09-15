import {
  ACTION_REGISTER,
  REGISTER_SUCCEEDED,
  REGISTER_FAILED,
} from "./constants";

export const actionRegister = (username, password,phone) => {
  console.log(username, password,phone)
  return {
    type: ACTION_REGISTER,
    username,
    password,
    phone
  };
};

export const registerSuccess = (response, username) => {
  return {
    type: REGISTER_SUCCEEDED,
    response,
    username
  };
};

export const registerError = error => {
  return {
    type: REGISTER_FAILED,
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
