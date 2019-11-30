import { combineReducers } from 'redux';
import workspace from './workspace.reducers';
const rootReducer = combineReducers({
  workspace
});
export default rootReducer