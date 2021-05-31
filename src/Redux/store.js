import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import AppReducer from "./AppReducer";

let redusers = combineReducers({ AppReducer });

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
