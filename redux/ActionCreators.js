import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const fetchRestaurants = () => (dispatch) => {
    dispatch(restaurantsLoading());
    return fetch(baseUrl + 'restaurants')
    .then(
        response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }
    )
    .then(response => response.json())
    .then(restaurants => dispatch(addRestaurants(restaurants)))
    .catch(error => dispatch(restaurantsFailed(error.message)));
};

export const restaurantsLoading = () => ({
    type: ActionTypes.RESTAURANTS_LOADING
});

export const addRestaurants = (restaurants) => ({
    type: ActionTypes.ADD_RESTAURANTS,
    payload: restaurants
});

export const restaurantsFailed = (errmess) => ({
    type: ActionTypes.RESTAURANTS_FAILED,
    payload: errmess
});

export const fetchDishes = (restaurantId) => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseUrl + 'dishes/?restaurantId=' + restaurantId)
    .then(
        response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }
    )
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});