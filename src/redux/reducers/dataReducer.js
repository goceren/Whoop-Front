
// ----------> DATA REDUCER <-------------
// veriler, whoop işlemlerinin yapılıp componentlere hazır hale getirdiğimiz Javascript dosyası

import {
    SET_WHOOPS,
    LIKE_WHOOP,
    UNLIKE_WHOOP,
    LOADING_DATA,
    DELETE_WHOOP,
    POST_WHOOP,
    SET_WHOOP,
    SUBMIT_COMMENT
} from '../types';

const initialState = {
    whoops: [],
    whoop: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_WHOOPS:
            return {
                ...state,
                whoops: action.payload,
                loading: false
            };
        case LIKE_WHOOP:
        case UNLIKE_WHOOP:
            let index = state.whoops.findIndex(
                (whoop) => whoop.whoopId === action.payload.whoopId
            );
            state.whoops[index] = action.payload;
            if (state.whoop.whoopId === action.payload.whoopId) {
                state.whoop = action.payload;
            }
            return {
                ...state
            };
        case DELETE_WHOOP:
            return {
                ...state,
                whoops: state.whoops.filter((whoop) => whoop.whoopId !== action.payload)
            }
        case POST_WHOOP:
            return {
                ...state,
                whoops: [action.payload, ...state.whoops]
            };
        case SET_WHOOP:
            return {
                ...state,
                whoop: action.payload
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                whoop: {
                    ...state.whoop,
                    comments: [action.payload, ...state.whoop.comments]
                }
            };
        default:
            return state;
    }
}