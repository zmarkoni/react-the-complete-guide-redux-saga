import {put} from 'redux-saga/effects';
import axiosInstance from "../../axios-orders";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axiosInstance.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());

    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axiosInstance.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in re  sponse.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            },);
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}