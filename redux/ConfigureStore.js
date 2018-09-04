import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {restaurants} from './restaurants';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            //to be configured
            restaurants
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}