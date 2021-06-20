import { combineReducers } from 'redux';
import projectReducer, {moduleName as projectModule} from '../modules/projects-module'
import tasksReducer, { moduleName as tasksModule } from '../modules/tasks-module';
import typesReducer, { moduleName as typesModule } from '../modules/types-module';
import statusesReducer, { moduleName as statusesModule } from '../modules/statuses-module';

const rootReducer = combineReducers({
  [projectModule]: projectReducer,
  [tasksModule]: tasksReducer,
  [typesModule]: typesReducer,
  [statusesModule]: statusesReducer
});

export default rootReducer;