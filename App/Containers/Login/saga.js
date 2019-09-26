import request from "../../utils/request";
import { ACTION_LOGIN, GET_USERID } from "../Login/constants";

import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  loginSuccess,
  loginError,
  getUserIdLoaded,
  getUserIdError
} from "../Login/actions";

import { makeSelectToken } from "../Login/selectors";

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
    //console.log(err,err.message,'err')
    yield put(loginError(err.message));
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

function* loginSaga() {
  yield takeEvery(ACTION_LOGIN, fetchToken);
  yield takeEvery(GET_USERID, fetchUserId);
}

export default loginSaga;
