import {
  ACTION_REGISTER,
  REGISTER_SUCCEEDED,
  REGISTER_FAILED,
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  response: false,
  error: false,
  username: false,
  password: false,
  email: false,
  loading:false,
});

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REGISTER:
      return {
        ...state,
        username: action.username,
        password: action.password,
        email: action.email,
        loading:true
      };
    case REGISTER_SUCCEEDED:
      return {
        ...state,
        response: action.response,
        loading:false
      };
    case REGISTER_FAILED:
      return {
        ...state,
        error: action.error,
        loading:false
      };
    default:
      return state;
  }
};

export default registerReducer;
