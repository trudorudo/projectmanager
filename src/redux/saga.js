import {all} from 'redux-saga/effects'
import {saga as projectSaga} from '../modules/projects-module'

export default function* rootSaga() {
  yield all([
    projectSaga()
  ])
}