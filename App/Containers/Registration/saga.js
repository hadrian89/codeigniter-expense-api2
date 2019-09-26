import request from "../../utils/request";
import { ACTION_REGISTER } from "../Registration/constants";

import { call, put, select, takeEvery } from "redux-saga/effects";

import { registerSuccess, registerError } from "../Registration/actions";

const API_URL = "http://weblybox.com/ci-rest-jwt";

function* registration(action) {
  const requestURL = API_URL + "/api/auth/registration";
  const params = {
    username: action.username,
    password: action.password,
    email: action.phone
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

function* registrationSaga() {
  yield takeEvery(ACTION_REGISTER, registration);
}

export default registrationSaga;
