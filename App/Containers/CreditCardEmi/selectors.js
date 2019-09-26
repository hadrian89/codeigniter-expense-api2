/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectCreditCardEmi = state => state.creditcardemi;

const makeSelectCardEmiList = () =>
  createSelector(
    selectCreditCardEmi,
    creditCardEmiState => creditCardEmiState.emis
  );

const makeSelectUserAllCards = () =>
  createSelector(
    selectCreditCardEmi,
    creditCardEmiState => creditCardEmiState.cards
  );

const makeSelectCardDetails = () =>
  createSelector(
    selectCreditCardEmi,
    creditCardEmiState => creditCardEmiState.carddetail
  );

const makeSelectCardEmiSuccessResp = () =>
  createSelector(
    selectCreditCardEmi,
    creditCardEmiState => creditCardEmiState.response
  );
const makeSelectCardEmiErrorResp = () =>
  createSelector(
    selectCreditCardEmi,
    creditCardEmiState => creditCardEmiState.error
  );
const makeSelectCardEmiApiLoading = () =>
  createSelector(
    selectCreditCardEmi,
    creditCardEmiState => creditCardEmiState.loading
  );

export {
  selectCreditCardEmi,
  makeSelectCardEmiList,
  makeSelectCardEmiSuccessResp,
  makeSelectCardEmiErrorResp,
  makeSelectCardEmiApiLoading,
  makeSelectUserAllCards,
  makeSelectCardDetails
};
