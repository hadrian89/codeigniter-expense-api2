import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCEEDED,
  UPDATE_PROFILE_FAILED,
  GET_PROFILE,
  GET_PROFILE_SUCCEEDED,
  GET_PROFILE_FAILED
} from "./constants";

export const updateProfile = (payload) => {
  return {
    type: UPDATE_PROFILE,
    payload
  };
};

export const updateProfileSuccess = success => {
  return {
    type: UPDATE_PROFILE_SUCCEEDED,
    success
  };
};

export const updateProfileFailed = error => {
  return {
    type: UPDATE_PROFILE_FAILED,
    error
  };
};

export const getProfile = () => {
  return {
    type: GET_PROFILE
  };
};

export const getProfileSuccess = response => {
  return {
    type: GET_PROFILE_SUCCEEDED,
    response
  };
};

export const getProfileFailed = error => {
  return {
    type: GET_PROFILE_FAILED,
    error
  };
};
