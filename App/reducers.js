import { createStore, combineReducers, applyMiddleware } from "redux";
import dashboardReducer from "./Containers/Dashboard/reducers";
import creditcardReducer from "./Containers/CreditCard/reducers";
import createSagaMiddleware from "redux-saga";

import appSaga from "./saga";
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  creditcard: creditcardReducer,
});

export default function configureStore() {
  // const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
    // other store enhancers if any
  );
  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(appSaga);
  return store;
}
