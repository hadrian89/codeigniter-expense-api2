import {
  GET_INCOME_LIST,
  GET_INCOME_LIST_SUCCEEDED,
  GET_INCOME_LIST_FAILED,
  ADD_NEW_INCOME,
  ADD_NEW_INCOME_SUCCESS,
  ADD_NEW_INCOME_FAILED,
  FORM_CHANGE_INCOME_NO,
  FORM_CHANGE_INCOME_BANK,
  FORM_CHANGE_INCOME_LIMIT,
  UPDATE_INCOME,
  UPDATE_INCOME_SUCCESS,
  UPDATE_INCOME_FAILED,
  REMOVE_INCOME,
  REMOVE_INCOME_SUCCESS,
  REMOVE_INCOME_FAILED
} from "./constants";

export const getIncome = () => {
  return {
    type: GET_INCOME_LIST,
  };
};

export const getIncomeSuccess = incomes => {
  return {
    type: GET_INCOME_LIST_SUCCEEDED,
    incomes
  };
};

export const getIncomeFailed = error => {
  return {
    type: GET_INCOME_LIST_FAILED,
    error
  };
};

export const addIncome = formdata => {
  return {
    type: ADD_NEW_INCOME,
    formdata
  };
};

export const addIncomeSuccess = response => {
  return {
    type: ADD_NEW_INCOME_SUCCESS,
    response
  };
};

export const addIncomeFailed = error => {
  return {
    type: ADD_NEW_INCOME_FAILED,
    error
  };
};

export const updateIncome = (incomeid, formdata) => {
  return {
    type: UPDATE_INCOME,
    incomeid,
    formdata
  };
};

export const updateIncomeSuccess = response => {
  return {
    type: UPDATE_INCOME_SUCCESS,
    response
  };
};

export const updateIncomeFailed = error => {
  return {
    type: UPDATE_INCOME_FAILED,
    error
  };
};

export const removeIncome = incomeid => {
  return {
    type: REMOVE_INCOME,
    incomeid
  };
};

export const removeIncomeSuccess = response => {
  return {
    type: REMOVE_INCOME_SUCCESS,
    response
  };
};

export const removeIncomeFailed = error => {
  return {
    type: REMOVE_INCOME_FAILED,
    error
  };
};

export const changeIncomeNo = formIncomeNo => {
  return {
    type: FORM_CHANGE_INCOME_NO,
    formIncomeNo
  };
};

export const changeIncomeBank = formIncomeBank => {
  return {
    type: FORM_CHANGE_INCOME_BANK,
    formIncomeBank
  };
};

export const changeIncomeLimit = formIncomeLimit => {
  return {
    type: FORM_CHANGE_INCOME_LIMIT,
    formIncomeLimit
  };
};
