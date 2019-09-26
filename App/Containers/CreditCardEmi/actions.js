import {
  GET_CARD_EMI_LIST,
  GET_CARD_EMI_LIST_SUCCEEDED,
  GET_CARD_EMI_LIST_FAILED,
  ADD_NEW_CARD_EMI,
  ADD_NEW_CARD_EMI_SUCCESS,
  ADD_NEW_CARD_EMI_FAILED,
  UPDATE_CARD_EMI,
  UPDATE_CARD_EMI_SUCCESS,
  UPDATE_CARD_EMI_FAILED,
  REMOVE_CARD_EMI,
  REMOVE_CARD_EMI_SUCCESS,
  REMOVE_CARD_EMI_FAILED,
  GET_USER_ALL_CARDS,
  GET_USER_ALL_CARDS_SUCCESS,
  GET_USER_ALL_CARDS_FAILED,
  GET_CARD_DETAIL,
  GET_CARD_DETAIL_SUCCESS,
  GET_CARD_DETAIL_ERROR
} from "./constants";

export const getCurrentUserCCCards = () => {
  return {
    type: GET_USER_ALL_CARDS
  };
};
export const getCurrentUserCCCardSucess = cards => {
  return {
    type: GET_USER_ALL_CARDS_SUCCESS,
    cards
  };
};
export const getCurrentUserCCCardError = error => {
  return {
    type: GET_USER_ALL_CARDS_FAILED,
    error
  };
};

export const getCardDetail = cardid => {
  return {
    type: GET_CARD_DETAIL,
    cardid
  };
};
export const getCardDetailSuccess = carddetail => {
  return {
    type: GET_CARD_DETAIL_SUCCESS,
    carddetail
  };
};
export const getCardDetailError = error => {
  return {
    type: GET_CARD_DETAIL_ERROR,
    error
  };
};

export const getCardEmi = () => {
  return {
    type: GET_CARD_EMI_LIST
  };
};

export const getCardEmiSuccess = emis => {
  return {
    type: GET_CARD_EMI_LIST_SUCCEEDED,
    emis
  };
};

export const getCardEmiFailed = error => {
  return {
    type: GET_CARD_EMI_LIST_FAILED,
    error
  };
};

export const addCardEmi = formdata => {
  return {
    type: ADD_NEW_CARD_EMI,
    formdata
  };
};

export const addCardEmiSuccess = response => {
  return {
    type: ADD_NEW_CARD_EMI_SUCCESS,
    response
  };
};

export const addCardEmiFailed = error => {
  return {
    type: ADD_NEW_CARD_EMI_FAILED,
    error
  };
};

export const updateCardEmi = (emiid, formdata) => {
  return {
    type: UPDATE_CARD_EMI,
    emiid,
    formdata
  };
};

export const updateCardEmiSuccess = response => {
  return {
    type: UPDATE_CARD_EMI_SUCCESS,
    response
  };
};

export const updateCardEmiFailed = error => {
  return {
    type: UPDATE_CARD_EMI_FAILED,
    error
  };
};

export const removeCardEmi = emiid => {
  return {
    type: REMOVE_CARD_EMI,
    emiid
  };
};

export const removeCardEmiSuccess = response => {
  return {
    type: REMOVE_CARD_EMI_SUCCESS,
    response
  };
};

export const removeCardEmiFailed = error => {
  return {
    type: REMOVE_CARD_EMI_FAILED,
    error
  };
};
