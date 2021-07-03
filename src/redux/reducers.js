import { combineReducers } from 'redux';
import projectReducer, {moduleName as projectModule} from '../modules/projects-module'
import tasksReducer, { moduleName as tasksModule } from '../modules/tasks-module';

const rootReducer = combineReducers({
  [projectModule]: projectReducer,
  [tasksModule]: tasksReducer
});

export default rootReducer;