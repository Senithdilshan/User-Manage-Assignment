// import createSagaMiddleware from "@redux-saga/core";
// import { combineReducers, configureStore,applyMiddleware} from "@reduxjs/toolkit";
// import userReducer from "./Ducks/User"
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./Reducers/RootReducer";
import { DeleteUserSaga, GetallUserSaga, UpdateUserSaga, UserSaga } from "./Sagas/UserSaga";
import createSagaMiddleware from "redux-saga";


const sagaMiddleware=createSagaMiddleware();
const getAllMiddleware=createSagaMiddleware();
const updatelMiddleware=createSagaMiddleware();
const deleteMiddleware=createSagaMiddleware();

const store = configureStore({
    reducer:RootReducer,
    middleware:()=>[sagaMiddleware,getAllMiddleware,updatelMiddleware,deleteMiddleware]
});

sagaMiddleware.run(UserSaga);
getAllMiddleware.run(GetallUserSaga);
updatelMiddleware.run(UpdateUserSaga);
deleteMiddleware.run(DeleteUserSaga);
export default store; 