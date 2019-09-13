import {
  GET_CARD_LIST,
  GET_CARD_LIST_SUCCEEDED,
  GET_CARD_LIST_FAILED,
  ADD_NEW_CARD_SUCCESS,
  ADD_NEW_CARD_FAILED,
  FORM_CHANGE_CARD_NO,
  FORM_CHANGE_CARD_BANK,
  FORM_CHANGE_CARD_LIMIT,
  UPDATE_CARD,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILED,
  REMOVE_CARD,
  REMOVE_CARD_SUCCESS,
  REMOVE_CARD_FAILED
} from "./constants";

import { fromJS } from "immutable";

export const initialState = fromJS({
  userid: false,
  loading: false,
  cards: false,
  success: false,
  error: false,
  formCardNo: '',
  formCardBank: '',
  formCardLimit: '',
  cardid:false
});

const creditcardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_LIST:
      return {
        ...state,
        userid: action.userid
      };
    case GET_CARD_LIST_SUCCEEDED:
      return {
        ...state,
        success: true,
        cards: action.cards
      };
    case GET_CARD_LIST_FAILED:
      return {
        ...state,
        error: action.error
      };
    case FORM_CHANGE_CARD_NO:
      return {
        ...state,
        formCardNo: action.formCardNo
      };
    case FORM_CHANGE_CARD_BANK:
      return {
        ...state,
        formCardBank: action.formCardBank
      };
    case FORM_CHANGE_CARD_LIMIT:
      return {
        ...state,
        formCardLimit: action.formCardLimit
      };
    case ADD_NEW_CARD_SUCCESS:
      return {
        ...state,
        success: true
      };
    case ADD_NEW_CARD_FAILED:
      return {
        ...state,
        error: action.error
      };
    // case UPDATE_CARD:
    //   return {
    //     ...state,
    //     cardid: action.cardid
    //   };
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        success: true
      };
    case UPDATE_CARD_FAILED:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default creditcardReducer;
