import { GET_TOKEN, GET_USERID } from "./Containers/Dashboard/constants";
import {
  GET_CARD_LIST,
  ADD_NEW_CARD,
  UPDATE_CARD
} from "./Containers/CreditCard/constants";

import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  tokenLoaded,
  tokenLoadingError,
  getUserIdLoaded,
  getUserIdError
} from "./Containers/Dashboard/actions";
import {
  getCardSuccess,
  getCardFailed,
  addCardSuccess,
  addCardFailed
} from "./Containers/CreditCard/actions";

import request from "./utils/request";
import {
  makeSelectToken,
  makeSelectUserId
} from "./Containers/Dashboard/selectors";

import{
  makeSelectCardNo,
  makeSelectCardBank,
  makeSelectCardLimit
} from "./Containers/CreditCard/selectors";

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
    yield put(tokenLoaded(resp.token, params.username));
  } catch (err) {
    yield put(tokenLoadingError(err));
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
    userid: "1" //userid
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

function* addCard() {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());
  const form_card_no = yield select(makeSelectCardNo());
  const form_card_bank = yield select(makeSelectCardBank());
  const form_card_limit = yield select(makeSelectCardLimit());


  
  const requestURL = API_URL + "/api/CreditCard/addcard";
  const params = {
    userid: "1", //userid,
    bank_name:form_card_bank,
    card_number:form_card_no,
    credit_limit:form_card_limit,
    available_limit:form_card_limit,
    status:'1'
  };
  // const params = {
  //   userid: "1", //userid,
  //   bank_name:"ICICI",
  //   card_number:"766666666666",
  //   credit_limit:"100000",
  //   available_limit:"999999",
  //   status:'1'
  // };



  const tokens = "Bearer ".concat(token);
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokens
    },
    body:  JSON.stringify(params)
  };

  try {
    // Call our request helper (see 'utils/request')
    const resp = yield call(request, requestURL, headers);
    yield put(addCardSuccess(resp));
  } catch (err) {
    yield put(addCardFailed(err));
  }
}

function* dataSaga() {
  yield takeEvery(GET_TOKEN, fetchToken);
  yield takeEvery(GET_USERID, fetchUserId);
  yield takeEvery(GET_CARD_LIST, fetchCardList);
  yield takeEvery(ADD_NEW_CARD, addCard);
  //yield takeEvery(UPDATE_CARD, updateCard);
}

export default dataSaga;
