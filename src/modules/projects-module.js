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

export const moduleName = 'project-module'

export const FETCH_PROJECTS_REQUEST = `${moduleName}/FETCH_PROJECTS_REQUEST`
export const FETCH_PROJECTS_SUCCESS = `${moduleName}/FETCH_PROJECTS_SUCCESS`
export const FETCH_PROJECTS_ERROR = `${moduleName}/FETCH_PROJECTS_ERROR`
export const FETCH_PROJECTS_LOADER = `${moduleName}/FETCH_PROJECTS_LOADER`

export const SAVE_PROJECT_REQUEST = `${moduleName}/SAVE_PROJECT_REQUEST`
export const SAVE_PROJECT_REQUEST_SUCCESS = `${moduleName}/SAVE_PROJECT_REQUEST_SUCCESS`
export const SAVE_PROJECT_REQUEST_ERROR = `${moduleName}/SAVE_PROJECT_REQUEST_ERROR`
export const SAVE_PROJECT_REQUEST_LOADER = `${moduleName}/SAVE_PROJECT_REQUEST_LOADER`

export const DELETE_PROJECT_REQUEST = `${moduleName}/DELETE_PROJECT_REQUEST`
export const DELETE_PROJECT_REQUEST_SUCCESS = `${moduleName}/DELETE_PROJECT_REQUEST_SUCCESS`
export const DELETE_PROJECT_REQUEST_ERROR = `${moduleName}/DELETE_PROJECT_REQUEST_ERROR`
export const DELETE_PROJECT_REQUEST_LOADER = `${moduleName}/DELETE_PROJECT_REQUEST_LOADER`

// REDUCERS

const initialState = {
  projectsData: [],
  error: null,
  isLoading: false,
  newProject: null,
  isAddLoading: false,
  isProjectDeleted: false
}

export default function projectReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projectsData: action.payload,
        newProject: null
      }
    case FETCH_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case FETCH_PROJECTS_LOADER:
      return {
        ...state,
        isLoading: action.payload
      }
    case SAVE_PROJECT_REQUEST_SUCCESS:
      return {
        ...state,
        isProjectAdded: true,
        newProject: action.payload
      }
    case SAVE_PROJECT_REQUEST_ERROR:
      return {
        ...state,
        isProjectAdded: false,
        isAddLoading: false
      }
    case DELETE_PROJECT_REQUEST_LOADER:
      return {
        ...state,
        isProjectDeleted: false,
        isLoading: action.payload
      }
    case DELETE_PROJECT_REQUEST_SUCCESS:
      return {
        ...state,
        isProjectDeleted: true,
        newProject: action.payload
      }
    case DELETE_PROJECT_REQUEST_ERROR:
      return {
        ...state,
        isProjectDeleted: false,
        isLoading: false
      }
    case DELETE_PROJECT_REQUEST_LOADER:
      return {
        ...state,
        isProjectDeleted: false,
        isLoading: action.payload
      }
    default:
      return state
  }
}


// TODO: SELECTORS
export const moduleSelector = state => state[moduleName];
export const projectListDataSelector = createSelector(moduleSelector, state => state.projectsData?.data);
export const isFetchLadingSelector = createSelector(moduleSelector, state => state.isLoading);
export const errorSelector = createSelector(moduleSelector, state => state.error);

export const isAddNewProjectLoading = createSelector(moduleSelector, state => state.isAddLoading);
export const newProjectSelector = createSelector(moduleSelector, state => state.newProject);


// ACTION CREATORS

export const getProjects = () => ({
  type: FETCH_PROJECTS_REQUEST
});

export const saveProject = (obj) => ({
  type: SAVE_PROJECT_REQUEST,
  meta: obj
})

export const deleteProject = (id) => ({
  type: DELETE_PROJECT_REQUEST,
  meta: id
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

export const saveProjectSaga = function* () {
  while (true) {
    const { meta } = yield take(SAVE_PROJECT_REQUEST)

    yield put({
      type: SAVE_PROJECT_REQUEST_LOADER,
      payload: true,
      meta: meta ? meta : {}
    })

    try {
      const {
        data
      } = yield axios.post('http://localhost:8000/api/v1/projects/', {
        name: meta.projectName,
        code: meta.projectCode
      });
      yield put({
        type: SAVE_PROJECT_REQUEST_SUCCESS,
        payload: data
      })
    } catch (err) {
      yield put({
        type: SAVE_PROJECT_REQUEST_ERROR,
        payload: err.message
      })
    } finally {
      yield put({
        type: SAVE_PROJECT_REQUEST_LOADER,
        payload: false
      })
    }
  }
}

export const deleteProjectSaga = function* () {
  while (true) {
    const { meta } = yield take(DELETE_PROJECT_REQUEST)

    yield put({
      type: DELETE_PROJECT_REQUEST_LOADER,
      payload: true,
      meta: meta ? meta : {}
    })

    try {
      const {
        data
      } = yield axios.delete('http://localhost:8000/api/v1/projects/', {
        id: meta
      });
      yield put({
        type: DELETE_PROJECT_REQUEST_SUCCESS,
        payload: data
      })
    } catch (err) {
      yield put({
        type: DELETE_PROJECT_REQUEST_ERROR,
        payload: err.message
      })
    } finally {
      yield put({
        type: DELETE_PROJECT_REQUEST_LOADER,
        payload: false
      })
    }
  }
}

export const saga = function* () {
  yield all([
    getProjectsSaga(),
    saveProjectSaga(),
    deleteProjectSaga()
  ])
}