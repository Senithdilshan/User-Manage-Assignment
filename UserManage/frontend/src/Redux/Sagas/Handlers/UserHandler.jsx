import { Link, useNavigate } from "react-router-dom";
import { call, put } from "redux-saga/effects";
import { FaildDelete, SuccessDelete } from "../../Ducks/DeleteUser";
import { FaildUser, SuccessUser } from "../../Ducks/GetUser";
import { FaildUpdate, SuccessUpdate } from "../../Ducks/UpdateUser";
import { FaildLogin, SuccessLogin } from "../../Ducks/User";
import { UserDeleteRequest } from "../Reqests/DeleteRequest";
import { GetAllRequest } from "../Reqests/GetAllRequest";
import { UserUpdateRequest } from "../Reqests/UpdateUserRequest";
import { UserRequest } from "../Reqests/UserRequest";


export function* UserHandler(action) {
    try {
        const response = yield call(() => UserRequest(action.payload));
        const { data } = response;
        yield put(SuccessLogin(data));
        // console.log(data.accessToken);
        sessionStorage.setItem("token", "Bearer " + data.accessToken)
        window.alert('Login Successful');
    } catch (error) {
        window.alert('Login Unsccessful');
        yield put(FaildLogin(error));
        // console.log("UserSaga error",error);
        throw error;
    }
}

export function* GetallHandler(action) {
    try {
        // console.log(action.data);
        const response = yield call(() => GetAllRequest());
        const { data } = response;
        yield put(SuccessUser(data))
    } catch (error) {
        yield put(FaildUser(error));
        throw new Error(error);
    }
}

export function* UpdateHandler(action) {
    try {
        // console.log(action.data);
        const response = yield call(() => UserUpdateRequest(action.payload));
        const { data } = response;
        yield put(SuccessUpdate(data))
        window.alert('User Update Success!')
    } catch (error) {
        window.alert('User Update failed!');
        yield put(FaildUpdate(error));
        throw new Error(error);
    }
}

export function* DeleteHandler(action) {
    try {
        // console.log(action.data);
        const response = yield call(() => UserDeleteRequest(action.payload));
        const { data } = response;
        yield put(SuccessDelete(data))
        window.alert('User Delete Success!')
    } catch (error) {
        window.alert('User Delete failed!');
        yield put(FaildDelete(error));
        throw new Error(error);
    }
}
