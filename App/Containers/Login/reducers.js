import {
  ACTION_LOGIN,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  GET_USERID_SUCCEEDED,
  GET_USERID_FAILED
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFiaGluYXYiLCJpYXQiOjE1Njg1NTY2OTAsImV4cCI6MTU2ODU3NDY5MH0.COL7dHwb5UIRC1zsw4vTPl22sdnhsYFjwnJKfOho1_8',//false,
  error: false,
  username: false,
  password: false,
  userid: '1',//false,
  userdetail: false,
  loading:false,
});

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password,
        loading:true
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
        loading:false
      };
    case GET_USERID_FAILED:
      return {
        ...state,
        error: action.error,
        loading:false
      };
    default:
      return state;
  }
};

export default dashboardReducer;
