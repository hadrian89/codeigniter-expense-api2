/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectCreditCard = state => state.creditcardbill;

const makeSelectCardBillList = () =>
  createSelector(
    selectCreditCard,
    creditCardState => creditCardState.cards
  );
const makeSelectCardNo = () =>
  createSelector(
    selectCreditCard,
    creditCardState => creditCardState.formCardNo
  );
const makeSelectCardBank = () =>
  createSelector(
    selectCreditCard,
    creditCardState => creditCardState.formCardBank
  );
const makeSelectCardLimit = () =>
  createSelector(
    selectCreditCard,
    creditCardState => creditCardState.formCardLimit
  );

const makeSelectCardSuccessResp = () =>
  createSelector(
    selectCreditCard,
    creditCardState => creditCardState.response
  );
const makeSelectCardErrorResp = () =>
  createSelector(
    selectCreditCard,
    creditCardState => creditCardState.error
  );
const makeSelectCardApiLoading = () =>
  createSelector(
    selectCreditCard,
    creditCardState => creditCardState.loading
  );

export {
  selectCreditCard,
  makeSelectCardBillList,
  makeSelectCardNo,
  makeSelectCardBank,
  makeSelectCardLimit,
  makeSelectCardSuccessResp,
  makeSelectCardErrorResp,
  makeSelectCardApiLoading
};
