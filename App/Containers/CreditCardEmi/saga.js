import request from "../../utils/request";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_CARD_EMI_LIST,
  ADD_NEW_CARD_EMI,
  UPDATE_CARD_EMI,
  REMOVE_CARD_EMI,
  GET_USER_ALL_CARDS,
  GET_CARD_DETAIL
} from "./constants";
import {
  getCardEmiSuccess,
  getCardEmiFailed,
  addCardEmiSuccess,
  addCardEmiFailed,
  removeCardEmiSuccess,
  removeCardEmiFailed,
  getCurrentUserCCCardSucess,
  getCurrentUserCCCardError,
  getCardDetailSuccess,
  getCardDetailError
} from "./actions";

import { makeSelectToken, makeSelectUserId } from "../Login/selectors";

import { API_URL } from '../../utils/constants';

function* fetchCardEmiList() {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = "http://localhost:3000/post_card_emi";//  API_URL + "/api/CreditCard/getcard";
  const params = {
    userid: userid
  };

  const tokens = "Bearer ".concat(token);
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokens
    },
    // body: JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(getCardEmiSuccess(resp));
  } catch (err) {
    yield put(getCardEmiFailed(err));
  }
}

function* addCardEmi(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = "http://localhost:3000/post_card_bill";//API_URL + "/api/CreditCard/addcard";
  const params = {
    userid: userid,
    emi_amount: prm.formdata.form_emi_amount,
    emi_bank: prm.formdata.form_emi_bank,
    emi_date: prm.formdata.form_emi_date,
    emi_due_date: prm.formdata.form_emi_due_date,
    emi_description: prm.formdata.form_emi_description,
    emi_outstanding_amount: prm.formdata.form_emi_outstanding_amount,
    emi_principle_amount: prm.formdata.form_emi_principle_amount,
    emi_tenure: prm.formdata.form_emi_tenure,
  };

  const tokens = "Bearer ".concat(token);
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokens
    },
    body: JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(addCardEmiSuccess("New Card Added"));
  } catch (err) {
    yield put(addCardEmiFailed(err));
  }
}

function* updateCardEmi(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());
  
  const requestURL = "http://localhost:3000/post_card_bill";//API_URL + "/api/CreditCard/updatecard";
  const params = {
    emiid: prm.emiid,
    userid: userid,
    emi_amount: prm.formdata.form_emi_amount,
    emi_bank: prm.formdata.form_emi_bank,
    emi_date: prm.formdata.form_emi_date,
    emi_due_date: prm.formdata.form_emi_due_date,
    emi_description: prm.formdata.form_emi_description,
    emi_outstanding_amount: prm.formdata.form_emi_outstanding_amount,
    emi_principle_amount: prm.formdata.form_emi_principle_amount,
    emi_tenure: prm.formdata.form_emi_tenure,
  };

  const tokens = "Bearer ".concat(token);
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokens
    },
    body: JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(addCardEmiSuccess("Card Updated"));
  } catch (err) {
    yield put(addCardEmiFailed(err));
  }
}

function* removeCardEmi(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL ="http://localhost:3000/post_card_bill";// API_URL + "/api/CreditCard/deletecard";
  const params = {
    emiid: prm.emiid,
    userid: userid
  };

  const tokens = "Bearer ".concat(token);
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokens
    },
    body: JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(removeCardEmiSuccess("Card Removed"));
  } catch (err) {
    yield put(removeCardEmiFailed(err));
  }
}


function* fetchUserAllCards() {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = "http://localhost:3000/get_all_cards";//API_URL + "/api/CreditCard/getcard";
  const params = {
    userid: userid
  };

  const tokens = "Bearer ".concat(token);
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokens
    },
    //body: JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(getCurrentUserCCCardSucess(resp));
  } catch (err) {
    yield put(getCurrentUserCCCardError(err));
  }
}


function* fetchCardDetail() {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = "http://localhost:3000/get_card";//API_URL + "/api/CreditCard/getcard";
  const params = {
    userid: userid
  };

  const tokens = "Bearer ".concat(token);
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokens
    },
    //body: JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(getCardDetailSuccess(resp));
  } catch (err) {
    yield put(getCardDetailError(err));
  }
}

function* creditCardEmiSaga() {
  yield takeEvery(GET_CARD_EMI_LIST, fetchCardEmiList);
  yield takeEvery(GET_USER_ALL_CARDS, fetchUserAllCards);
  yield takeEvery(GET_CARD_DETAIL, fetchCardDetail);
  yield takeEvery(ADD_NEW_CARD_EMI, addCardEmi);
  yield takeEvery(UPDATE_CARD_EMI, updateCardEmi);
  yield takeEvery(REMOVE_CARD_EMI, removeCardEmi);
}

export default creditCardEmiSaga;
