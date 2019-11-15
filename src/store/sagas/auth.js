// Sagas are used for handling SIDE effects like ASYNC code, local storage...
// Sagas are related to ACTIONS
// function* is Generator so we can use ASYNC code
import {put} from 'redux-saga/effects';
import * as actionTypes from "../actions/actionTypes";

export function* logoutSaga(action) {
    // yield means to execute that step and wait to finish
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.AUTH_LOGOUT
    });
}