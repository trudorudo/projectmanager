import { all } from 'redux-saga/effects'
import { saga as projectSaga } from '../modules/projects-module'
import { saga as tasksSaga } from '../modules/tasks-module';
import { saga as typesSaga } from '../modules/types-module';
import { saga as statusesSaga } from '../modules/statuses-module';

export default function* rootSaga() {
  yield all([
    projectSaga(),
    tasksSaga(),
    typesSaga(),
    statusesSaga()
  ])
}