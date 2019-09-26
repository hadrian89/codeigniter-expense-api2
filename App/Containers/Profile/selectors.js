/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectProfile = state => state.profile;

const makeSelectProfileSuccessResp = () =>
  createSelector(
    selectProfile,
    ProfileState => ProfileState.success
  );
const makeSelectProfileErrorResp = () =>
  createSelector(
    selectProfile,
    ProfileState => ProfileState.error
  );
const makeSelectProfileApiLoading = () =>
  createSelector(
    selectProfile,
    ProfileState => ProfileState.loading
  );
const makeSelectGetProfileData = () =>
  createSelector(
    selectProfile,
    ProfileState => ProfileState.response
  );

export {
  selectProfile,
  makeSelectProfileSuccessResp,
  makeSelectProfileErrorResp,
  makeSelectProfileApiLoading,
  makeSelectGetProfileData
};
