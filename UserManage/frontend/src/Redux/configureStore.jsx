// import createSagaMiddleware from "@redux-saga/core";
// import { combineReducers, configureStore,applyMiddleware} from "@reduxjs/toolkit";
// import userReducer from "./Ducks/User"
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./Reducers/RootReducer";
import { UserSaga } from "./Sagas/UserSaga";
import createSagaMiddleware from "redux-saga";


const sagaMiddleware=createSagaMiddleware();

const store = configureStore({
    reducer:UserReducer,
    middleware:()=>[sagaMiddleware]
});

sagaMiddleware.run(UserSaga);
export default store; 