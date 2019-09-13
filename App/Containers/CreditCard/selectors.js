/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectCreditCard = state => state.creditcard;

const makeSelectCardList = () =>
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

export {
  selectCreditCard,
  makeSelectCardList,
  makeSelectCardNo,
  makeSelectCardBank,
  makeSelectCardLimit
};
