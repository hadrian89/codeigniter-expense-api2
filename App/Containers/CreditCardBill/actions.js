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
  REMOVE_CARD_BILL_FAILED
} from "./constants";

export const getCardBill = () => {
  return {
    type: GET_CARD_BILL_LIST,
  };
};

export const getCardBillSuccess = cards => {
  return {
    type: GET_CARD_BILL_LIST_SUCCEEDED,
    cards
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

export const updateCardBill = (cardid, formdata) => {
  return {
    type: UPDATE_CARD_BILL,
    cardid,
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

export const removeCardBill = cardid => {
  return {
    type: REMOVE_CARD_BILL,
    cardid
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

