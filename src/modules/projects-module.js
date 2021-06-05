import {
  all,
  take,
  put
} from 'redux-saga/effects';
import { createSelector } from "reselect";
import axios from 'axios';

// CONSTANTS

export const moduleName = 'project-module'

export const FETCH_PROJECTS_REQUEST = `${moduleName}/FETCH_PROJECTS_REQUEST`
export const FETCH_PROJECTS_SUCCESS = `${moduleName}/FETCH_PROJECTS_SUCCESS`
export const FETCH_PROJECTS_ERROR = `${moduleName}/FETCH_PROJECTS_ERROR`
export const FETCH_PROJECTS_LOADER = `${moduleName}/FETCH_PROJECTS_LOADER`

// REDUCERS

const initialState = {
  projectsData: [],
  error: null,
  isLoading: false
}

export default function projectReducer(state = initialState, action = {}) {
  const newState = {
    ...state
  }

  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        newState,
        projectsData: action.payload
      }
      case FETCH_PROJECTS_ERROR:
        return {
          newState,
          error: action.payload
        }
        case FETCH_PROJECTS_LOADER:
          return {
            newState,
            isLoading: action.payload
          }
          default:
            return state
  }
}


// TODO: SELECTORS
export const moduleSelector = state => [moduleName];
export const projectListDataSelector = createSelector(moduleSelector, state => state.projectsData);
export const isFetchLadingSelector = createSelector(moduleSelector, state => state.isLoading);
export const errorSelector = createSelector(moduleSelector, state => state.error);



// ACTION CREATORS

export const getProjects = () => ({
  type: FETCH_PROJECTS_REQUEST
})

// SAGAS

export const getProjectsSaga = function* () {
  while (true) {
    yield take(FETCH_PROJECTS_REQUEST)

    yield put({
      type: FETCH_PROJECTS_LOADER,
      payload: true
    })

    try {
      const {
        data
      } = yield axios.get('http://localhost:8000/api/v1/projects/');
      yield put({
        type: FETCH_PROJECTS_SUCCESS,
        payload: data
      })
    } catch (err) {
      yield put({
        type: FETCH_PROJECTS_ERROR,
        payload: err.message
      })
    } finally {
      yield put({
        type: FETCH_PROJECTS_LOADER,
        payload: false
      })
    }
  }
}


export const saga = function* () {
  yield all([
    getProjectsSaga(),
  ])
}