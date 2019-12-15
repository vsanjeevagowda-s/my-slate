import { combineReducers } from 'redux';
import workspace from './workspace.reducers';
import todo from './todo.reducers';
import signin from './signin.reducers';
const rootReducer = combineReducers({
  workspace,
  todo,
  signin
});
export default rootReducer