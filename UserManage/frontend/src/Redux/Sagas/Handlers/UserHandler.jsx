import { useNavigate } from "react-router-dom";
import { call, put } from "redux-saga/effects";
import { SuccessLogin } from "../../Ducks/User";
import { UserRequest } from "../Reqests/UserRequest";


export function* UserHandler(action) {
    try {
        const response = yield call(UserRequest);
        const { data } = response;
        yield put(SuccessLogin(data))
        window.alert('Login Successful');
    } catch (error) {
        console.log(error);
    }
}
