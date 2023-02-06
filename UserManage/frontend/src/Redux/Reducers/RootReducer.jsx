import { combineReducers } from "redux";
import { DeleteUserReducer } from "./DeleteReducer";
import { GetAllReducer } from "./GetAllReducer";
import { UpdateUserReducer } from "./UpdateUserReducer";
import { UserReducer } from "./UserReducer";



export const RootReducer=combineReducers({
    user: UserReducer,
    getAllUsers:GetAllReducer,
    updateUser:UpdateUserReducer,
    deleteUSer:DeleteUserReducer,
});