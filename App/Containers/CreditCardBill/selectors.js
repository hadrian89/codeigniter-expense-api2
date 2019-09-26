/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectCreditCardBill = state => state.creditcardbill;

const makeSelectCardBillList = () =>
  createSelector(
    selectCreditCardBill,
    creditCardBillState => creditCardBillState.bills
  );

const makeSelectUserAllCards = () =>
  createSelector(
    selectCreditCardBill,
    creditCardBillState => creditCardBillState.cards
  );

const makeSelectCardDetails = () =>
  createSelector(
    selectCreditCardBill,
    creditCardBillState => creditCardBillState.carddetail
  );

const makeSelectCardBillSuccessResp = () =>
  createSelector(
    selectCreditCardBill,
    creditCardBillState => creditCardBillState.response
  );
const makeSelectCardBillErrorResp = () =>
  createSelector(
    selectCreditCardBill,
    creditCardBillState => creditCardBillState.error
  );
const makeSelectCardBillApiLoading = () =>
  createSelector(
    selectCreditCardBill,
    creditCardBillState => creditCardBillState.loading
  );

export {
  selectCreditCardBill,
  makeSelectCardBillList,
  makeSelectCardBillSuccessResp,
  makeSelectCardBillErrorResp,
  makeSelectCardBillApiLoading,
  makeSelectUserAllCards,
  makeSelectCardDetails
};
