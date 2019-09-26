import request from "../../utils/request";
import {
  GET_CARD_LIST,
  ADD_NEW_CARD,
  UPDATE_CARD,
  REMOVE_CARD
} from "../CreditCard/constants";

import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  getCardSuccess,
  getCardFailed,
  addCardSuccess,
  addCardFailed,
  removeCardSuccess,
  removeCardFailed
} from "../CreditCard/actions";

import { makeSelectToken, makeSelectUserId } from "../Login/selectors";

const API_URL = "http://weblybox.com/ci-rest-jwt";

function* fetchCardList() {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = API_URL + "/api/CreditCard/getcard";
  const params = {
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
    yield put(getCardSuccess(resp));
  } catch (err) {
    yield put(getCardFailed(err));
  }
}

function* addCard(prm) {
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
    yield put(addCardSuccess("New Card Added"));
  } catch (err) {
    yield put(addCardFailed(err));
  }
}

function* updateCard(prm) {
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
    yield put(addCardSuccess("Card Updated"));
  } catch (err) {
    yield put(addCardFailed(err));
  }
}

function* removeCard(prm) {
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
    yield put(removeCardSuccess("Card Removed"));
  } catch (err) {
    yield put(removeCardFailed(err));
  }
}

function* creditCardSaga() {
  yield takeEvery(GET_CARD_LIST, fetchCardList);
  yield takeEvery(ADD_NEW_CARD, addCard);
  yield takeEvery(UPDATE_CARD, updateCard);
  yield takeEvery(REMOVE_CARD, removeCard);
}

export default creditCardSaga;
