import {
  GET_CARD_BILL_LIST,
  GET_CARD_BILL_LIST_SUCCEEDED,
  GET_CARD_BILL_LIST_FAILED,
  ADD_NEW_CARD_BILL_SUCCESS,
  ADD_NEW_CARD_BILL_FAILED,
  UPDATE_CARD_BILL,
  UPDATE_CARD_BILL_SUCCESS,
  UPDATE_CARD_BILL_FAILED,
  REMOVE_CARD_BILL,
  REMOVE_CARD_BILL_SUCCESS,
  REMOVE_CARD_BILL_FAILED,
  ADD_NEW_CARD_BILL
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  loading: false,
  cards: false,
  success: false,
  error: false,
  cardid: false,
  response: false
});

const creditcardBillReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_BILL_LIST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case GET_CARD_BILL_LIST_SUCCEEDED:
      return {
        ...state,
        success: true,
        cards: action.cards,
        loading: false,
        response: false
      };
    case GET_CARD_BILL_LIST_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        response: false
      };
    case ADD_NEW_CARD_BILL:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case UPDATE_CARD_BILL:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case REMOVE_CARD_BILL:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case ADD_NEW_CARD_BILL_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case ADD_NEW_CARD_BILL_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_CARD_BILL_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case UPDATE_CARD_BILL_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case REMOVE_CARD_BILL_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case REMOVE_CARD_BILL_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default creditcardBillReducer;
