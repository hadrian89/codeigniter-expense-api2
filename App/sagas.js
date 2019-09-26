// Imports: Dependencies
import { all, fork } from "redux-saga/effects";

// Imports: Redux Sagas
import loginSaga from "../App/Containers/Login/saga";
import registrationSaga from "../App/Containers/Registration/saga";
import creditCardSaga from "../App/Containers/CreditCard/saga";
import creditCardBillSaga from "../App/Containers/CreditCardBill/saga";
import creditCardEmiSaga from "../App/Containers/CreditCardEmi/saga";
import profileSaga from "../App/Containers/Profile/saga";

//Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registrationSaga),
    fork(creditCardSaga),
    fork(profileSaga),
    fork(creditCardBillSaga),
    fork(creditCardEmiSaga)
  ]);
}
