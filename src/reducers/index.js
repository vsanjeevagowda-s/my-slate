import { combineReducers } from 'redux';
import workspace from './workspace.reducers';
import todo from './todo.reducers';
const rootReducer = combineReducers({
  workspace,
  todo
});
export default rootReducer