
// ----------> VERİ İŞLEMLERİ <-------------

import {
  SET_WHOOPS,
  LOADING_DATA,
  LIKE_WHOOP,
  UNLIKE_WHOOP,
  DELETE_WHOOP,
  SET_ERRORS,
  POST_WHOOP,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_WHOOP,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// Nütün Whoopları Getir
export const getWhoops = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/whoops')
    .then((res) => {
      dispatch({
        type: SET_WHOOPS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_WHOOPS,
        payload: []
      });
    });
};

// Whoop Beğen
export const likeWhoop = (whoopId) => (dispatch) => {
  axios
    .get(`/whoop/${whoopId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_WHOOP,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Beğeniyi Geri Al
export const unlikeWhoop = (whoopId) => (dispatch) => {
  axios
    .get(`/whoop/${whoopId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_WHOOP,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// Whoop Sil
export const deleteWhoop = (whoopId) => (dispatch) => {
  axios
    .delete(`/whoop/${whoopId}`)
    .then(() => {
      dispatch({ type: DELETE_WHOOP, payload: whoopId });
    })
    .catch((err) => console.log(err));
};

// Whoop At

export const postWhoop = (newWhoop) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/whoop', newWhoop)
    .then((res) => {
      dispatch({
        type: POST_WHOOP,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Whoop detayları

export const getWhoop = (whoopId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/whoop/${whoopId}`)
    .then((res) => {
      dispatch({
        type: SET_WHOOP,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Yorum Yap
export const submitComment = (whoopId, commentData) => (dispatch) => {
  axios
    .post(`/whoop/${whoopId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Kullanıcı Bilgilerini Getiren Fonksiyonumuz
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_WHOOPS,
        payload: res.data.whoops
      });
    })
    .catch(() => {
      dispatch({
        type: SET_WHOOPS,
        payload: null
      });
    });
};

// Hata Silme Fonksiyonumuz
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
