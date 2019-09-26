import {
  GET_CARD_EMI_LIST,
  GET_CARD_EMI_LIST_SUCCEEDED,
  GET_CARD_EMI_LIST_FAILED,
  ADD_NEW_CARD_EMI_SUCCESS,
  ADD_NEW_CARD_EMI_FAILED,
  UPDATE_CARD_EMI,
  UPDATE_CARD_EMI_SUCCESS,
  UPDATE_CARD_EMI_FAILED,
  REMOVE_CARD_EMI,
  REMOVE_CARD_EMI_SUCCESS,
  REMOVE_CARD_EMI_FAILED,
  ADD_NEW_CARD_EMI,
  GET_USER_ALL_CARDS_SUCCESS,
  GET_USER_ALL_CARDS_FAILED,
  GET_CARD_DETAIL,
  GET_CARD_DETAIL_SUCCESS,
  GET_CARD_DETAIL_ERROR
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  loading: false,
  cards: false,
  emis: false,
  success: false,
  error: false,
  cardid: false,
  response: false,
  carddetail: false
});

const creditcardEmiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_EMI_LIST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case GET_CARD_EMI_LIST_SUCCEEDED:
      return {
        ...state,
        success: true,
        emis: action.emis,
        loading: false,
        response: false
      };
    case GET_CARD_EMI_LIST_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        response: false
      };
    case GET_USER_ALL_CARDS_SUCCESS:
      return {
        ...state,
        success: true,
        cards: action.cards,
        loading: false,
        response: false
      };

    case GET_CARD_DETAIL:
      return {
        ...state,
        success: true,
        cardid: action.cardid,
        loading: false,
        response: false
      };
    case GET_CARD_DETAIL_SUCCESS:
      return {
        ...state,
        success: true,
        carddetail: action.carddetail,
        loading: false,
        response: false
      };
    case GET_CARD_DETAIL_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        response: false
      };
    case GET_USER_ALL_CARDS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        response: false
      };
    case ADD_NEW_CARD_EMI:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case UPDATE_CARD_EMI:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case REMOVE_CARD_EMI:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        response: false
      };
    case ADD_NEW_CARD_EMI_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case ADD_NEW_CARD_EMI_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case UPDATE_CARD_EMI_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case UPDATE_CARD_EMI_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case REMOVE_CARD_EMI_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false
      };
    case REMOVE_CARD_EMI_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default creditcardEmiReducer;
