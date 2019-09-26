import request from "../../utils/request";
import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_PROFILE, UPDATE_PROFILE } from "./constants";

import {
  updateProfileSuccess,
  updateProfileFailed,
  getProfileSuccess,
  getProfileFailed
} from "./actions";

import { makeSelectToken, makeSelectUserId } from "../Login/selectors";

const API_URL = "http://weblybox.com/ci-rest-jwt";

function* updateProfile(formdata) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());
  const payload = formdata.payload;

  const requestURL = "http://localhost:3000/post_profile"; //API_URL + "/api/profile/update";

  const params = {
    userid: userid,
    dob: payload.form_dob,
    email: payload.form_email,
    firstname: payload.form_firstname,
    lastname: payload.form_lastname,
    pan: payload.form_pan
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
    yield put(updateProfileSuccess(resp));
  } catch (err) {
    yield put(updateProfileFailed(err));
  }
}

function* getProfile() {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());
  // console.log(token,'token')
  const requestURL = "http://localhost:3000/post_profile"; //API_URL + "/api/profile/get";
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
    yield put(getProfileSuccess(resp));
  } catch (err) {
    yield put(getProfileFailed(err));
  }
}

function* profileSaga() {
  yield takeEvery(UPDATE_PROFILE, updateProfile);
  yield takeEvery(GET_PROFILE, getProfile);
}

export default profileSaga;
