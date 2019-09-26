import {
  GET_CARD_BILL_LIST,
  GET_CARD_BILL_LIST_SUCCEEDED,
  GET_CARD_BILL_LIST_FAILED,
  ADD_NEW_CARD_BILL,
  ADD_NEW_CARD_BILL_SUCCESS,
  ADD_NEW_CARD_BILL_FAILED,
  UPDATE_CARD_BILL,
  UPDATE_CARD_BILL_SUCCESS,
  UPDATE_CARD_BILL_FAILED,
  REMOVE_CARD_BILL,
  REMOVE_CARD_BILL_SUCCESS,
  REMOVE_CARD_BILL_FAILED,
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

export const getCardBill = () => {
  return {
    type: GET_CARD_BILL_LIST
  };
};

export const getCardBillSuccess = bills => {
  return {
    type: GET_CARD_BILL_LIST_SUCCEEDED,
    bills
  };
};

export const getCardBillFailed = error => {
  return {
    type: GET_CARD_BILL_LIST_FAILED,
    error
  };
};

export const addCardBill = formdata => {
  return {
    type: ADD_NEW_CARD_BILL,
    formdata
  };
};

export const addCardBillSuccess = response => {
  return {
    type: ADD_NEW_CARD_BILL_SUCCESS,
    response
  };
};

export const addCardBillFailed = error => {
  return {
    type: ADD_NEW_CARD_BILL_FAILED,
    error
  };
};

export const updateCardBill = (billid, formdata) => {
  return {
    type: UPDATE_CARD_BILL,
    billid,
    formdata
  };
};

export const updateCardBillSuccess = response => {
  return {
    type: UPDATE_CARD_BILL_SUCCESS,
    response
  };
};

export const updateCardBillFailed = error => {
  return {
    type: UPDATE_CARD_BILL_FAILED,
    error
  };
};

export const removeCardBill = billid => {
  return {
    type: REMOVE_CARD_BILL,
    billid
  };
};

export const removeCardBillSuccess = response => {
  return {
    type: REMOVE_CARD_BILL_SUCCESS,
    response
  };
};

export const removeCardBillFailed = error => {
  return {
    type: REMOVE_CARD_BILL_FAILED,
    error
  };
};
