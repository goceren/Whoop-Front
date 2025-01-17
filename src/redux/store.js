
// REDUX YÖNLENDİRİCİ

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';

const initialState = {};

const midleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    UI: uiReducer,
    data: dataReducer
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...midleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;