import {
  GET_TOKEN,
  GET_TOKEN_SUCCEEDED,
  GET_TOKEN_FAILED,
  GET_USERID_SUCCEEDED,
  GET_USERID_FAILED
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  error: false,
  loading:false,
  success:false,
  response:false,
  income_loading:false,
  cards_loading:false,
  emi_loading:false,
  bill_loading:false,
});

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_TOKEN:
    //   return {
    //     ...state,
    //     username: action.username,
    //     password: action.password
    //   };
    // case GET_TOKEN_SUCCEEDED:
    //   return {
    //     ...state,
    //     token: action.token
    //   };
    // case GET_TOKEN_FAILED:
    //   return {
    //     ...state,
    //     error: action.error
    //   };
    // case GET_USERID_SUCCEEDED:
    //   return {
    //     ...state,
    //     userid: action.userid,
    //     userdetail: action.userdetail,
    //   };
    // case GET_USERID_FAILED:
    //   return {
    //     ...state,
    //     error: action.error
    //   };
    default:
      return state;
  }
};

export default dashboardReducer;
