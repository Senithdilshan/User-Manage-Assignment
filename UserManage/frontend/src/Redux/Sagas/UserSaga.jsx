import { takeEvery } from 'redux-saga/effects'
import { REQ_DELETE } from '../Ducks/DeleteUser';
import { GET_USER } from '../Ducks/GetUser';
import { REQ_UPDATE } from '../Ducks/UpdateUser';
import { REQ_LOGIN, SUCCESS_LOGIN } from '../Ducks/User'
import { DeleteHandler, GetallHandler, UpdateHandler, UserHandler } from './Handlers/UserHandler'

function* logUser(){
    console.warn("Logged in");//calling api
}

export function* UserSaga() {
    try {
        yield takeEvery(REQ_LOGIN,UserHandler);
    } catch (error) {
        console.log("UserSaga error",error);
    }
}

export function* GetallUserSaga() {
    yield takeEvery(GET_USER,GetallHandler);
}

export function* UpdateUserSaga() {
    yield takeEvery(REQ_UPDATE,UpdateHandler);
}

export function* DeleteUserSaga() {
    yield takeEvery(REQ_DELETE,DeleteHandler);
}