import { Value } from 'slate';
import moment from 'moment';
import initialValue from './value.json';
import {
  TODO_LIST_SUCCESS,
  TODO_LIST_FAILURE,
  TODO_CONTENT_CHANGE,
  TODO_BY_DATE_SUCCESS,
  TODO_BY_DATE_FAILURE
} from '../actions/todo.actions';

const initialState = {
  value: Value.fromJSON(initialValue),
  date: moment(new Date()).format("YYYY-MM-DD"),
  todoDisplayFlag: false,
};

const todo = (state = initialState, action) => {
  switch (action.type) {
    case TODO_LIST_SUCCESS:
      return {
        ...state
      }
    case TODO_LIST_FAILURE:
      return {
        ...state
      }
    case TODO_CONTENT_CHANGE:
      return {
        ...state,
        date: action.date,
        value: action.value
      }
    case TODO_BY_DATE_SUCCESS:
      return {
        ...state,
        todoDisplayFlag: true,
        date: action.resp.todo.date,
        value: Value.fromJSON(JSON.parse(action.resp.todo.record)),
      }
    case TODO_BY_DATE_FAILURE:
      return {
        ...state,
        value: Value.fromJSON(initialValue),
        todoDisplayFlag: true,
      }
    default:
      return state;
  }
}

export default todo;