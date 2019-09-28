/**
 * Homepage selectors
 */

import { createSelector } from "reselect";

const selectIncome = state => state.income;

const makeSelectIncomeList = () =>
  createSelector(
    selectIncome,
    IncomeState => IncomeState.incomes
  );
const makeSelectIncomeNo = () =>
  createSelector(
    selectIncome,
    IncomeState => IncomeState.formIncomeNo
  );
const makeSelectIncomeBank = () =>
  createSelector(
    selectIncome,
    IncomeState => IncomeState.formIncomeBank
  );
const makeSelectIncomeLimit = () =>
  createSelector(
    selectIncome,
    IncomeState => IncomeState.formIncomeLimit
  );

const makeSelectIncomeSuccessResp = () =>
  createSelector(
    selectIncome,
    IncomeState => IncomeState.response
  );
const makeSelectIncomeErrorResp = () =>
  createSelector(
    selectIncome,
    IncomeState => IncomeState.error
  );
const makeSelectIncomeApiLoading = () =>
  createSelector(
    selectIncome,
    IncomeState => IncomeState.loading
  );

export {
  selectIncome,
  makeSelectIncomeList,
  makeSelectIncomeNo,
  makeSelectIncomeBank,
  makeSelectIncomeLimit,
  makeSelectIncomeSuccessResp,
  makeSelectIncomeErrorResp,
  makeSelectIncomeApiLoading
};
