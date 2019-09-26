import {
  UPDATE_PROFILE,
  GET_PROFILE_SUCCEEDED,
  GET_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCEEDED,
  UPDATE_PROFILE_FAILED,
  GET_PROFILE
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  loading: false,
  success: false,
  error: false,
  response: false
});

const updateProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: true,
        success: false,
        error: false
      };
    case GET_PROFILE_SUCCEEDED:
      return {
        ...state,
        success: true,
        loading: false,
        response: action.response
      };
    case GET_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
        success: false,
        error: false
      };
    case UPDATE_PROFILE_SUCCEEDED:
      return {
        ...state,
        success: true,
        loading: false
      };
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default updateProfileReducer;
