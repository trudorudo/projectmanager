import { all } from 'redux-saga/effects'
import { saga as projectSaga } from '../modules/projects-module'
import { saga as tasksSaga } from '../modules/tasks-module';

export default function* rootSaga() {
  yield all([
    projectSaga(),
    tasksSaga()
  ])
}