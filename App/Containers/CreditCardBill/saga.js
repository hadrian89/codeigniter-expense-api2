import request from "../../utils/request";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_CARD_BILL_LIST,
  ADD_NEW_CARD_BILL,
  UPDATE_CARD_BILL,
  REMOVE_CARD_BILL,
  GET_USER_ALL_CARDS,
  GET_CARD_DETAIL
} from "./constants";
import {
  getCardBillSuccess,
  getCardBillFailed,
  addCardBillSuccess,
  addCardBillFailed,
  removeCardBillSuccess,
  removeCardBillFailed,
  getCurrentUserCCCardSucess,
  getCurrentUserCCCardError,
  getCardDetailSuccess,
  getCardDetailError
} from "./actions";

import { makeSelectToken, makeSelectUserId } from "../Login/selectors";

import { API_URL } from '../../utils/constants';

function* fetchCardBillList() {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = "http://localhost:3000/post_card_bill";//  API_URL + "/api/CreditCard/getcard";
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
    yield put(getCardBillSuccess(resp));
  } catch (err) {
    yield put(getCardBillFailed(err));
  }
}

function* addCardBill(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = "http://localhost:3000/post_card_bill";//API_URL + "/api/CreditCard/addcard";

  const params = {
    userid: userid,
    bill_amount: prm.formdata.form_bill_amount,
    bill_bank: prm.formdata.bill_bank,
    bill_date: prm.formdata.form_bill_date,
    bill_due_date: prm.formdata.form_bill_due_date,
    bill_min_due: prm.formdata.form_bill_min_due,
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
    yield put(addCardBillSuccess("New Card Added"));
  } catch (err) {
    yield put(addCardBillFailed(err));
  }
}

function* updateCardBill(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());
  
  const requestURL = "http://localhost:3000/post_card_bill";//API_URL + "/api/CreditCard/updatecard";
  const params = {
    billid: prm.billid,
    userid: userid,
    bill_amount: prm.formdata.form_bill_amount,
    bill_bank: prm.formdata.bill_bank,
    bill_date: prm.formdata.form_bill_date,
    bill_due_date: prm.formdata.form_bill_due_date,
    bill_min_due: prm.formdata.form_bill_min_due,
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
    yield put(addCardBillSuccess("Card Updated"));
  } catch (err) {
    yield put(addCardBillFailed(err));
  }
}

function* removeCardBill(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL ="http://localhost:3000/post_card_bill";// API_URL + "/api/CreditCard/deletecard";
  const params = {
    billid: prm.billid,
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
    yield put(removeCardBillSuccess("Card Removed"));
  } catch (err) {
    yield put(removeCardBillFailed(err));
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

function* creditCardBillSaga() {
  yield takeEvery(GET_CARD_BILL_LIST, fetchCardBillList);
  yield takeEvery(GET_USER_ALL_CARDS, fetchUserAllCards);
  yield takeEvery(GET_CARD_DETAIL, fetchCardDetail);
  yield takeEvery(ADD_NEW_CARD_BILL, addCardBill);
  yield takeEvery(UPDATE_CARD_BILL, updateCardBill);
  yield takeEvery(REMOVE_CARD_BILL, removeCardBill);
}

export default creditCardBillSaga;
