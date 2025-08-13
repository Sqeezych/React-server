import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { appReducer, todosFromServerReducer, todosForWievReducer } from "./reducers";

const reducer = combineReducers({
    appState: appReducer,
    todosFromServer: todosFromServerReducer,
    todosForWiev: todosForWievReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));