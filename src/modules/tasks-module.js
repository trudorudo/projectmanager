import {
    all,
    take,
    put
  } from 'redux-saga/effects';
  import {
    createSelector
  } from "reselect";
  import axios from 'axios';
  
  // CONSTANTS
  
  export const moduleName = 'tasks-module'
  
  export const FETCH_TASKS_REQUEST = `${moduleName}/FETCH_TASKS_REQUEST`
  export const FETCH_TASKS_SUCCESS = `${moduleName}/FETCH_TASKS_SUCCESS`
  export const FETCH_TASKS_ERROR = `${moduleName}/FETCH_TASKS_ERROR`
  export const FETCH_TASKS_LOADER = `${moduleName}/FETCH_TASKS_LOADER`

  // REDUCERS
  
  const initialState = {
    taksData: [],
    error: null,
    isLoading: false
  }
  
  export default function tasksReducer(state = initialState, action = {}) {
    switch (action.type) {
      case FETCH_TASKS_SUCCESS:
        return {
          ...state,
          taksData: action.payload,
          newProject: null
        }
      case FETCH_TASKS_ERROR:
        return {
          ...state,
          error: action.payload
        }
      case FETCH_TASKS_LOADER:
        return {
          ...state,
          isLoading: action.payload
        }
      default:
        return state
    }
  }
  
  
  // TODO: SELECTORS
  export const moduleSelector = state => state[moduleName];
  export const tasksListTasksSelector = createSelector(moduleSelector, state => state.taksData?.data);
  export const isFetchLadingSelector = createSelector(moduleSelector, state => state.isLoading);
  export const errorSelector = createSelector(moduleSelector, state => state.error);

  // ACTION CREATORS
  
  export const getTasks = () => ({
    type: FETCH_TASKS_REQUEST
  });
  
  
  // SAGAS
  
  export const getTasksSaga = function* () {
    while (true) {
      yield take(FETCH_TASKS_REQUEST)
  
      yield put({
        type: FETCH_TASKS_LOADER,
        payload: true
      })
  
      try {
        const {
          data
        } = yield axios.get('http://localhost:8000/api/v1/tasks/');
        yield put({
          type: FETCH_TASKS_SUCCESS,
          payload: data
        })
      } catch (err) {
        yield put({
          type: FETCH_TASKS_ERROR,
          payload: err.message
        })
      } finally {
        yield put({
          type: FETCH_TASKS_LOADER,
          payload: false
        })
      }
    }
  }
  
  export const saga = function* () {
    yield all([
      getTasksSaga()
    ])
  }