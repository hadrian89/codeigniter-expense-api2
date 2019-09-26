/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectLogin = state => state.login;

const makeSelectUsername = () =>
  createSelector(
    selectLogin,
    loginState => loginState.username
  );

const makeSelectUserDetail = () =>
  createSelector(
    selectLogin,
    loginState => loginState.userdetail
  );

const makeSelectUserId = () =>
  createSelector(
    selectLogin,
    loginState => loginState.userid
  );

const makeSelectToken = () =>
  createSelector(
    selectLogin,
    loginState => loginState.token
  );

const makeSelectLoginLoading = () =>
  createSelector(
    selectLogin,
    loginState => loginState.loading
  );

const makeSelectLoginError = () =>
  createSelector(
    selectLogin,
    loginState => loginState.error
  );

export {
  selectLogin,
  makeSelectUsername,
  makeSelectToken,
  makeSelectUserDetail,
  makeSelectUserId,
  makeSelectLoginLoading,
  makeSelectLoginError
};
