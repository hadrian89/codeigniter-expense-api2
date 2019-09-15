import request from "./utils/request";
// import { GET_TOKEN } from "./Containers/Dashboard/constants";
import { ACTION_LOGIN, GET_USERID } from "./Containers/Login/constants";
import { ACTION_REGISTER } from "./Containers/Registration/constants";
import {
  GET_CARD_LIST,
  ADD_NEW_CARD,
  UPDATE_CARD,
  REMOVE_CARD
} from "./Containers/CreditCard/constants";

import { call, put, select, takeEvery } from "redux-saga/effects";
import // tokenLoaded,
// tokenLoadingError,
// getUserIdLoaded,
// getUserIdError
"./Containers/Dashboard/actions";
import {
  getCardSuccess,
  getCardFailed,
  addCardSuccess,
  addCardFailed,
  removeCardSuccess,
  removeCardFailed
} from "./Containers/CreditCard/actions";
import {
  loginSuccess,
  loginError,
  getUserIdLoaded,
  getUserIdError
} from "./Containers/Login/actions";
import{
  registerSuccess,
  registerError
} from "./Containers/Registration/actions";

import {
  makeSelectToken,
  makeSelectUserId
} from "./Containers/Login/selectors";

const API_URL = "http://weblybox.com/ci-rest-jwt";

function* fetchToken(action) {
  const requestURL = API_URL + "/api/auth/login";
  const params = {
    username: action.username,
    password: action.password
  };
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(loginSuccess(resp.token, params.username));
  } catch (err) {
    yield put(loginError(err));
  }
}

function* registration(action) {

  const requestURL = API_URL + "/api/auth/registration";
  const params = {
    username: action.username,
    password: action.password,
    email: action.phone,
  };
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(registerSuccess(resp.userid, params.username));
  } catch (err) {
    yield put(registerError(err));
  }
}

function* fetchUserId(action) {
  const token = yield select(makeSelectToken());
  const requestURL = API_URL + "/api/main/test";
  const params = {
    username: action.username,
    password: action.password
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
    yield put(getUserIdLoaded(resp, resp.id));
  } catch (err) {
    yield put(getUserIdError(err));
  }
}

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

function* dataSaga() {
  // yield takeEvery(GET_TOKEN, fetchToken);
  yield takeEvery(ACTION_LOGIN, fetchToken);
  yield takeEvery(ACTION_REGISTER, registration);
  yield takeEvery(GET_USERID, fetchUserId);
  yield takeEvery(GET_CARD_LIST, fetchCardList);
  yield takeEvery(ADD_NEW_CARD, addCard);
  yield takeEvery(UPDATE_CARD, updateCard);
  yield takeEvery(REMOVE_CARD, removeCard);
}

export default dataSaga;
