import { combineReducers } from 'redux';
import projectReducer, {moduleName as projectModule} from '../modules/projects-module'

const rootReducer = combineReducers({
  [projectModule]: projectReducer
});

export default rootReducer;