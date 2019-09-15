/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectRegister = state => state.register;

const makeSelectUsername = () =>
  createSelector(
    selectRegister,
    registerState => registerState.username
  );

const makeSelectRegisterLoading = () =>
  createSelector(
    selectRegister,
    registerState => registerState.loading
  );

const makeSelectRegisterResponse = () =>
  createSelector(
    selectRegister,
    registerState => registerState.response
  );

export {
  selectRegister,
  makeSelectUsername,
  makeSelectRegisterLoading,
  makeSelectRegisterResponse
};
