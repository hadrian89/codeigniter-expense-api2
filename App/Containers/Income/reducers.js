import {
  GET_INCOME_LIST,
  GET_INCOME_LIST_SUCCEEDED,
  GET_INCOME_LIST_FAILED,
  ADD_NEW_INCOME_SUCCESS,
  ADD_NEW_INCOME_FAILED,
  UPDATE_INCOME,
  UPDATE_INCOME_SUCCESS,
  UPDATE_INCOME_FAILED,
  REMOVE_INCOME,
  REMOVE_INCOME_SUCCESS,
  REMOVE_INCOME_FAILED,
  ADD_NEW_INCOME
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  loading: false,
  incomes: false,
  success: false,
  error: false,
  incomeid: false,
  response: false
});

const incomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INCOME_LIST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case GET_INCOME_LIST_SUCCEEDED:
      return {
        ...state,
        success: true,
        incomes: action.incomes,
        loading: false,
        response: false
      };
    case GET_INCOME_LIST_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        response: false
      };
    case ADD_NEW_INCOME:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case UPDATE_INCOME:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case REMOVE_INCOME:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case ADD_NEW_INCOME_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case ADD_NEW_INCOME_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_INCOME_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case UPDATE_INCOME_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case REMOVE_INCOME_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case REMOVE_INCOME_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default incomeReducer;
