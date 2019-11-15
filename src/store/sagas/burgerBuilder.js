import {put} from 'redux-saga/effects';
import axiosInstance from "../../axios-orders";
import * as actions from "../actions/index";

export function* initIngredientsSaga(action) {
    try {
        const response = yield axiosInstance.get('https://react-my-burger-e5a66.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch(error) {
        yield put(actions.fetchIngredientsFailed());
    }
}