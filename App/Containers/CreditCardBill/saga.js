import request from "../../utils/request";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_CARD_BILL_LIST,
  ADD_NEW_CARD_BILL,
  UPDATE_CARD_BILL,
  REMOVE_CARD_BILL
} from "./constants";
import {
  getCardBillSuccess,
  getCardBillFailed,
  addCardBillSuccess,
  addCardBillFailed,
  removeCardBillSuccess,
  removeCardBillFailed
} from "./actions";

import { makeSelectToken, makeSelectUserId } from "../Login/selectors";

const API_URL = "http://weblybox.com/ci-rest-jwt";

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

  const requestURL = API_URL + "/api/CreditCard/addcard";
  const params = {
    userid: userid,
    bank_name: prm.formdata.form_cc_bank,
    card_number: prm.formdata.form_cc_no,
    credit_limit: prm.formdata.form_cc_limit,
    available_limit: prm.formdata.form_cc_available_limit,
    status: "1"
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

  const requestURL = API_URL + "/api/CreditCard/updatecard";
  const params = {
    cardid: prm.cardid,
    userid: userid,
    bank_name: prm.formdata.form_cc_bank,
    card_number: prm.formdata.form_cc_no,
    credit_limit: prm.formdata.form_cc_limit,
    available_limit: prm.formdata.form_cc_available_limit,
    status: "1"
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

  const requestURL = API_URL + "/api/CreditCard/deletecard";
  const params = {
    cardid: prm.cardid,
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

function* creditCardBillSaga() {
  yield takeEvery(GET_CARD_BILL_LIST, fetchCardBillList);
  yield takeEvery(ADD_NEW_CARD_BILL, addCardBill);
  yield takeEvery(UPDATE_CARD_BILL, updateCardBill);
  yield takeEvery(REMOVE_CARD_BILL, removeCardBill);
}

export default creditCardBillSaga;
