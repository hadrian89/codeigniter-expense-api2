/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectLogin = state => state.login;

const makeSelectUsername = () =>
  createSelector(
    selectLogin,
    dashboardState => dashboardState.username
  );

const makeSelectUserDetail = () =>
  createSelector(
    selectLogin,
    dashboardState => dashboardState.userdetail
  );

const makeSelectUserId = () =>
  createSelector(
    selectLogin,
    dashboardState => dashboardState.userid
  );

const makeSelectToken = () =>
  createSelector(
    selectLogin,
    dashboardState => dashboardState.token
  );

const makeSelectLoginLoading = () =>
  createSelector(
    selectLogin,
    dashboardState => dashboardState.loading
  );

export {
  selectLogin,
  makeSelectUsername,
  makeSelectToken,
  makeSelectUserDetail,
  makeSelectUserId,
  makeSelectLoginLoading
};
