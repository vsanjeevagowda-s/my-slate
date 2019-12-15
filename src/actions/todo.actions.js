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
    const resp = await axios.get(`${API_PATH}/todo/${date}`, headers());
    const { todo } = resp.data;
    dispatch(TodoByDateSuccess({todo}));
    return Promise.resolve({ todo });
  } catch (error) {
    console.log({ error })
    dispatch(TodoByDateFilure({ error }));
    return Promise.reject({ error });
  }
}