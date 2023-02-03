import { combineReducers } from "redux";
import { UserState } from "./UserReducer";



export const UserReducer=combineReducers({
    user: UserState,
});