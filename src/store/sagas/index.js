import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from "../actions/actionTypes";
import { logoutSaga, checkAuthTimeoutSaga } from './auth';

// listen to actions
export function* watchAuth() {
    // order don't , mather!
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}
