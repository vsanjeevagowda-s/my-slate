import axios from 'axios';
import { headers } from './helper.actions';

const API_PATH = process.env.REACT_APP_API_PATH;

export const TODO_LIST_SUCCESS = 'TODO_LIST_SUCCESS';
export const TODO_LIST_FAILURE = 'TODO_LIST_FAILURE';
export const TODO_CONTENT_CHANGE = 'TODO_CONTENT_CHANGE';
export const TODO_BY_DATE_SUCCESS = 'TODO_BY_DATE_SUCCESS';
export const TODO_BY_DATE_FAILURE = 'TODO_BY_DATE_FAILURE';
export const SYNC_TODO_SUCCESS = 'SYNC_TODO_SUCCESS';
export const SYNC_TODO_FAILURE = 'SYNC_TODO_FAILURE';
export const TODO_LIST_API_CALL = 'TODO_LIST_API_CALL';
export const GET_VERSIONS_REQUEST = 'GET_VERSIONS_REQUEST';
export const HIDE_VERSION_LIST_MODAL = 'HIDE_VERSION_LIST_MODAL';
export const GET_VERSIONS_SUCCESS = 'GET_VERSIONS_SUCCESS';
export const GET_VERSIONS_FAILURE = 'GET_VERSIONS_FAILURE';

const syncTodoSuccess = res => {
  return {
    type: SYNC_TODO_SUCCESS,
    res,
  }
}

const syncTodoFailure = error => {
  return {
    type: SYNC_TODO_FAILURE,
    error,
  }
}

export const syncTodoContent = body => async dispatch => {
  try {
    dispatch({ type: TODO_LIST_API_CALL });
    const resp = await axios.put(`${API_PATH}/todo`, body, headers());
    dispatch(syncTodoSuccess(resp));
    return Promise.resolve({ resp });
  } catch (error) {
    dispatch(syncTodoFailure({ error }));
    return Promise.reject({ error });
  }
};

export const todoContentChange = ({ date, value }) => {
  return {
    type: TODO_CONTENT_CHANGE,
    value,
    date,
  }
};

export const TodoByDateSuccess = (resp) => {
  return {
    type: TODO_BY_DATE_SUCCESS,
    resp,
  }
}

export const TodoByDateFilure = (error) => {
  return {
    type: TODO_BY_DATE_FAILURE,
    error,
  }
}

export const getTodoRecordByDate = ({ date }) => async dispatch => {
  try {
    dispatch({ type: TODO_LIST_API_CALL });
    const resp = await axios.get(`${API_PATH}/todo/${date}`, headers());
    const { todo } = resp.data;
    dispatch(TodoByDateSuccess({todo}));
    return Promise.resolve({ todo });
  } catch (error) {
    console.log(error)
    dispatch(TodoByDateFilure({ error }));
    return Promise.reject({ error });
  }
}

const getVersionSuccess = resp => {
  return {
    type: GET_VERSIONS_SUCCESS,
    resp
  }
}

const getVersionFailure = error => {
  return {
    type: GET_VERSIONS_FAILURE,
    error
  }
}

export const getVersions = ({ date }) => async dispatch => {
  try {
    dispatch({ type: GET_VERSIONS_REQUEST });
    const resp = await axios.get(`${API_PATH}/todo/${date}/versions?limit=30&page=1`, headers());
    dispatch(getVersionSuccess(resp))
  } catch (error) {
    console.log('showVersions', error)
    dispatch(getVersionFailure(error))
  }
}