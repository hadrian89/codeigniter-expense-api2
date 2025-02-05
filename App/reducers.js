import { createStore, combineReducers, applyMiddleware } from "redux";
import loginReducer from "./Containers/Login/reducers";
import registerReducer from "./Containers/Registration/reducers";
import dashboardReducer from "./Containers/Dashboard/reducers";
import creditcardReducer from "./Containers/CreditCard/reducers";
import incomeReducer from "./Containers/Income/reducers";
import creditcardBillReducer from "./Containers/CreditCardBill/reducers";
import creditcardEmiReducer from "./Containers/CreditCardEmi/reducers";
import updateProfileReducer from "./Containers/Profile/reducers";

import createSagaMiddleware from "redux-saga";
import { reducer as formReducer } from "redux-form";

import { Platform } from "react-native";

import { rootSaga } from "./sagas";
import { createLogger } from "redux-logger";
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  creditcard: creditcardReducer,
  income: incomeReducer,
  creditcardbill: creditcardBillReducer,
  creditcardemi: creditcardEmiReducer,
  login: loginReducer,
  register: registerReducer,
  profile: updateProfileReducer,
  form: formReducer
});

export default function configureStore() {
  let store = {};

  if (Platform.OS === "web") {
    const composeEnhancers =
      typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : {};

    const enhancer = composeEnhancers(
      applyMiddleware(sagaMiddleware)
      // other store enhancers if any
    );
    store = createStore(rootReducer, enhancer);
  } else {
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  }

  sagaMiddleware.run(rootSaga);
  return store;
}
