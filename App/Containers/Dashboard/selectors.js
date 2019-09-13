/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectDashboard = state => state.dashboard;

const makeSelectUsername = () =>
  createSelector(
    selectDashboard,
    dashboardState => dashboardState.username
  );
const makeSelectUserDetail = () =>
  createSelector(
    selectDashboard,
    dashboardState => dashboardState.userdetail
  );
const makeSelectUserId = () =>
  createSelector(
    selectDashboard,
    dashboardState => dashboardState.userid
  );

const makeSelectToken = () =>
  createSelector(
    selectDashboard,
    dashboardState => dashboardState.token
  );

export {
  selectDashboard,
  makeSelectUsername,
  makeSelectToken,
  makeSelectUserDetail,
  makeSelectUserId
};
