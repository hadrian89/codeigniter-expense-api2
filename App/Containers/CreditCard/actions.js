import {
  GET_CARD_LIST,
  GET_CARD_LIST_SUCCEEDED,
  GET_CARD_LIST_FAILED,
  ADD_NEW_CARD,
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

export const getCard = userid => {
  return {
    type: GET_CARD_LIST,
    userid
  };
};

export const getCardSuccess = cards => {
  return {
    type: GET_CARD_LIST_SUCCEEDED,
    cards
  };
};

export const getCardFailed = error => {
  return {
    type: GET_CARD_LIST_FAILED,
    error
  };
};

export const addCard = formdata => {
  return {
    type: ADD_NEW_CARD,
    formdata
  };
};

export const addCardSuccess = response => {
  return {
    type: ADD_NEW_CARD_SUCCESS,
    response
  };
};

export const addCardFailed = error => {
  return {
    type: ADD_NEW_CARD_FAILED,
    error
  };
};

export const updateCard = (cardid, formdata) => {
  return {
    type: UPDATE_CARD,
    cardid,
    formdata
  };
};

export const updateCardSuccess = response => {
  return {
    type: UPDATE_CARD_SUCCESS,
    response
  };
};

export const updateCardFailed = error => {
  return {
    type: UPDATE_CARD_FAILED,
    error
  };
};

export const removeCard = cardid => {
  return {
    type: REMOVE_CARD,
    cardid
  };
};

export const removeCardSuccess = response => {
  return {
    type: REMOVE_CARD_SUCCESS,
    response
  };
};

export const removeCardFailed = error => {
  return {
    type: REMOVE_CARD_FAILED,
    error
  };
};

export const changeCardNo = formCardNo => {
  return {
    type: FORM_CHANGE_CARD_NO,
    formCardNo
  };
};

export const changeCardBank = formCardBank => {
  return {
    type: FORM_CHANGE_CARD_BANK,
    formCardBank
  };
};

export const changeCardLimit = formCardLimit => {
  return {
    type: FORM_CHANGE_CARD_LIMIT,
    formCardLimit
  };
};
