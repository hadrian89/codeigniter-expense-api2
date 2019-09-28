import request from "../../utils/request";
import {
  GET_INCOME_LIST,
  ADD_NEW_INCOME,
  UPDATE_INCOME,
  REMOVE_INCOME
} from "../Income/constants";

import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  getIncomeSuccess,
  getIncomeFailed,
  addIncomeSuccess,
  addIncomeFailed,
  removeIncomeSuccess,
  removeIncomeFailed
} from "../Income/actions";

import { makeSelectToken, makeSelectUserId } from "../Login/selectors";

const API_URL = "http://weblybox.com/ci-rest-jwt";

function* fetchIncomeList() {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = "http://localhost:3000/post_income";//API_URL + "/api/Income/getincome";
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
    yield put(getIncomeSuccess(resp));
  } catch (err) {
    yield put(getIncomeFailed(err));
  }
}

function* addIncome(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = API_URL + "/api/Income/addincome";
  const params = {
    userid: userid,
    bank_name: prm.formdata.form_cc_bank,
    income_number: prm.formdata.form_cc_no,
    income_limit: prm.formdata.form_cc_limit,
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
    yield put(addIncomeSuccess("New Income Added"));
  } catch (err) {
    yield put(addIncomeFailed(err));
  }
}

function* updateIncome(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = API_URL + "/api/Income/updateincome";
  const params = {
    incomeid: prm.incomeid,
    userid: userid,
    bank_name: prm.formdata.form_cc_bank,
    income_number: prm.formdata.form_cc_no,
    income_limit: prm.formdata.form_cc_limit,
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
    yield put(addIncomeSuccess("Income Updated"));
  } catch (err) {
    yield put(addIncomeFailed(err));
  }
}

function* removeIncome(prm) {
  const token = yield select(makeSelectToken());
  const userid = yield select(makeSelectUserId());

  const requestURL = API_URL + "/api/Income/deleteincome";
  const params = {
    incomeid: prm.incomeid,
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
    yield put(removeIncomeSuccess("Income Removed"));
  } catch (err) {
    yield put(removeIncomeFailed(err));
  }
}

function* incomeSaga() {
  yield takeEvery(GET_INCOME_LIST, fetchIncomeList);
  yield takeEvery(ADD_NEW_INCOME, addIncome);
  yield takeEvery(UPDATE_INCOME, updateIncome);
  yield takeEvery(REMOVE_INCOME, removeIncome);
}

export default incomeSaga;
