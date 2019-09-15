import {
  ACTION_LOGIN,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  GET_USERID_SUCCEEDED,
  GET_USERID_FAILED,
  ACTION_LOGOUT
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  token: false,
  error: false,
  username: false,
  password: false,
  userid: false,
  userdetail: false,
  loading: false
});

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password,
        loading: true
      };
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        token: action.token
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error
      };
    case GET_USERID_SUCCEEDED:
      return {
        ...state,
        userid: action.userid,
        userdetail: action.userdetail,
        loading: false
      };
    case GET_USERID_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case ACTION_LOGOUT:
      return {
        ...state,
        token: false,
        error: false,
        username: false,
        password: false,
        userid: false,
        userdetail: false,
        loading: false
      };
    default:
      return state;
  }
};

export default dashboardReducer;
