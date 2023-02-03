import { takeEvery } from 'redux-saga/effects'
import { REQ_LOGIN } from '../Ducks/User'
import { UserHandler } from './Handlers/UserHandler'

// function* logUser(){
//     console.warn("Logged in");//calling api
// }

export function* UserSaga() {
    yield takeEvery(REQ_LOGIN,UserHandler);
}