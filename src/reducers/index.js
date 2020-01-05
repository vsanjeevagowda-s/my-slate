import { combineReducers } from 'redux';
import workspace from './workspace.reducers';
import todo from './todo.reducers';
import signin from './signin.reducers';
import helper from './helper.reducers';
const rootReducer = combineReducers({
  workspace,
  todo,
  signin,
  helper
});
export default rootReducer