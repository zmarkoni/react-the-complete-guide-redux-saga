// Sagas are used for handling SIDE effects like ASYNC code, local storage...
// Sagas are related to ACTIONS
// function* is Generator so we can use ASYNC code
import {put, delay} from 'redux-saga/effects';
import axios from "axios";
import * as actions from "../actions/index";

export function* logoutSaga(action) {
    // yield means to execute that step and wait to finish
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    //https://firebase.google.com/docs/reference/rest/auth
    let myAppApiKey = 'AIzaSyCYwvl_XzNqcmI2vk4soqfEneliUMqPii0';
    let firebaseSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    let firebaseSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    let url = '';

    if (action.isSignup) {
        url = firebaseSignUp + myAppApiKey;
    } else {
        url = firebaseSignIn + myAppApiKey;
    }
    //console.log('url: ', url);
    try {
        const response = yield axios.post(url, authData); // yield will replace promise and return result, so we can continue synchronous
        //console.log(response);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch(error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate')); // convert to Date object
        if (expirationDate > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(actions.logout())
        }
    }
}