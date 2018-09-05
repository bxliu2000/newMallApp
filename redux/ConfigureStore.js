import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {restaurants} from './restaurants';
import {dishes} from './dishes'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            restaurants,
            dishes
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}