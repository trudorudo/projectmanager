import {
  all,
  take,
  put,
  select
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

export const UPDATE_TASK_REQUEST = `${moduleName}/UPDATE_TASK_REQUEST`
export const UPDATE_TASK_SUCCESS = `${moduleName}/UPDATE_TASK_SUCCESS`
export const UPDATE_TASK_ERROR = `${moduleName}/UPDATE_TASK_ERROR`
export const UPDATE_TASK_LOADER = `${moduleName}/UPDATE_TASK_LOADER`

export const SAVE_TASK_REQUEST = `${moduleName}/SAVE_TASK_REQUEST`
export const SAVE_TASK_SUCCESS = `${moduleName}/SAVE_TASK_SUCCESS`
export const SAVE_TASK_ERROR = `${moduleName}/SAVE_TASK_ERROR`
export const SAVE_TASK_LOADER = `${moduleName}/SAVE_TASK_LOADER`

export const DELETE_TASK_REQUEST = `${moduleName}/DELETE_TASK_REQUEST`
export const DELETE_TASK_SUCCESS = `${moduleName}/DELETE_TASK_SUCCESS`
export const DELETE_TASK_ERROR = `${moduleName}/DELETE_TASK_ERROR`
export const DELETE_TASK_LOADER = `${moduleName}/DELETE_TASK_LOADER`

export const FETCH_STATUSES_REQUEST = `${moduleName}/FETCH_STATUSES_REQUEST`;
export const FETCH_STATUSES_SUCCESS = `${moduleName}/FETCH_STATUSES_SUCCESS`;
export const FETCH_STATUSES_ERROR = `${moduleName}/FETCH_STATUSES_ERROR`;
export const FETCH_STATUSES_LOADER = `${moduleName}/FETCH_STATUSES_LOADER`;

export const FETCH_TYPES_REQUEST = `${moduleName}/FETCH_TYPES_REQUEST`;
export const FETCH_TYPES_SUCCESS = `${moduleName}/FETCH_TYPES_SUCCESS`;
export const FETCH_TYPES_ERROR = `${moduleName}/FETCH_TYPES_ERROR`;
export const FETCH_TYPES_LOADER = `${moduleName}/FETCH_TYPES_LOADER`;

// REDUCERS

const initialState = {
  tasksData: [],
  error: null,
  isLoading: false,
  isTaskUpdated: false,
  isTaskDeleted: false,
  statusesList: [],
  typesList: []
}

export default function tasksReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasksData: action.payload
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
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasksData: action.payload
      }
    case UPDATE_TASK_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SAVE_TASK_LOADER:
      return {
        ...state,
        isLoading: action.payload
      }
    case SAVE_TASK_SUCCESS:
      return {
        ...state,
        tasksData: { ...state.tasksData, data: action.payload }
      }
    case SAVE_TASK_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case UPDATE_TASK_LOADER:
      return {
        ...state,
        isLoading: action.payload
      }
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        isTaskDeleted: true,
        isLoading: false
      }
    case DELETE_TASK_ERROR:
      return {
        ...state,
        isTaskDeleted: false,
        isLoading: false,
        error: action.payload
      }
    case DELETE_TASK_LOADER:
      return {
        ...state,
        isLoading: true,
        isTaskDeleted: false
      }
    case FETCH_STATUSES_SUCCESS:
      return {
        ...state,
        statusesList: action.payload
      }
    case FETCH_STATUSES_LOADER:
      return {
        ...state,
        isLoading: action.payload
      }
    case FETCH_STATUSES_ERROR:
      return {
        ...state,
        error: action.payload,
        statusesList: []
      }
    case FETCH_TYPES_SUCCESS:
      return {
        ...state,
        typesList: action.payload
      }
    case FETCH_TYPES_LOADER:
      return {
        ...state,
        isLoading: action.payload
      }
    case FETCH_TYPES_ERROR:
      return {
        ...state,
        error: action.payload,
        typesList: []
      }

    default:
      return state
  }
}


// TODO: SELECTORS
export const moduleSelector = state => state[moduleName];
export const tasksListSelector = createSelector(moduleSelector, state => state.tasksData?.data || []);
export const isFetchLadingSelector = createSelector(moduleSelector, state => state.isLoading);
export const errorSelector = createSelector(moduleSelector, state => state.error);
export const statusesListSelector = createSelector(moduleSelector, state => state?.statusesList?.data);
export const typesListSelector = createSelector(moduleSelector, state => state?.typesList?.data);


// ACTION CREATORS

export const getTasks = (project_id) => ({
  type: FETCH_TASKS_REQUEST,
  payload: project_id
});

export const updateTask = (obj) => ({
  type: UPDATE_TASK_REQUEST,
  payload: obj
});

export const saveTask = (obj) => ({
  type: SAVE_TASK_REQUEST,
  payload: obj
});

export const deleteTask = (id) => ({
  type: DELETE_TASK_REQUEST,
  payload: id
});

export const getStatuses = () => ({
  type: FETCH_STATUSES_REQUEST
});

export const getTypes = () => ({
  type: FETCH_TYPES_REQUEST
});



// SAGAS

export const getTasksSaga = function* () {
  while (true) {
    const { payload } = yield take(FETCH_TASKS_REQUEST)

    yield put({
      type: FETCH_TASKS_LOADER,
      payload: true
    })

    try {
      const {
        data
      } = yield axios.get('http://localhost:8000/api/v1/tasks/' + payload);
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

export const updateTaskSaga = function* () {
  while (true) {
    const { payload } = yield take(UPDATE_TASK_REQUEST)

    yield put({
      type: UPDATE_TASK_LOADER,
      payload: payload ? payload : {}
    })

    try {
      const {
        data
      } = yield axios({

        url: 'http://localhost:8000/api/v1/tasks/',
        data: {
          id: payload.id,
          name: payload.name,
          code: payload.code,
          description: payload.description,
          type_name: payload.type_name,
          status_id: payload.status_id
        },
        method: 'PUT',
        // params: {
        //   id: payload.id
        // }
      });
      yield put({
        type: UPDATE_TASK_SUCCESS,
        payload: data
      })
    } catch (err) {
      yield put({
        type: UPDATE_TASK_ERROR,
        payload: err.message
      })
    } finally {
      yield put({
        type: UPDATE_TASK_LOADER,
        payload: false
      })
    }
  }
}

export const deleteTaskSaga = function* () {
  while (true) {
    const { payload } = yield take(DELETE_TASK_REQUEST)

    yield put({
      type: DELETE_TASK_LOADER,
      payload: payload ? payload : {}
    })

    try {
      const {
        data
      } = yield axios({
        url: 'http://localhost:8000/api/v1/tasks/',
        data: JSON.stringify({ id: payload }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      yield put({
        type: DELETE_TASK_SUCCESS,
        payload: data
      })
    } catch (err) {
      yield put({
        type: DELETE_TASK_ERROR,
        payload: err.message
      })
    } finally {
      yield put({
        type: DELETE_TASK_LOADER,
        payload: false
      })
    }
  }
}

export const saveTaskSaga = function* () {
  while (true) {
    const { payload } = yield take(SAVE_TASK_REQUEST)
    const {tasksList} = yield select(tasksListSelector)

    yield put({
      type: SAVE_TASK_LOADER,
      payload: payload ? payload : {}
    })

    try {
      const {
        data
      } = yield axios.post('http://localhost:8000/api/v1/tasks/', {
        ...payload
      });
      yield put({
        type: SAVE_TASK_SUCCESS,
        payload: [...tasksList, data]
      })
    } catch (err) {
      yield put({
        type: SAVE_TASK_ERROR,
        payload: err.message
      })
    } finally {
      yield put({
        type: SAVE_TASK_LOADER,
        payload: false
      })
    }
  }
}

export const getStatusesSaga = function* () {
  while (true) {
    yield take(FETCH_STATUSES_REQUEST)

    yield put({
      type: FETCH_STATUSES_LOADER,
      payload: true
    })

    try {
      const {
        data
      } = yield axios.get('http://localhost:8000/api/v1/status/');
      yield put({
        type: FETCH_STATUSES_SUCCESS,
        payload: data
      })
    } catch (err) {
      yield put({
        type: FETCH_STATUSES_ERROR
      })
    } finally {
      yield put({
        type: FETCH_STATUSES_LOADER,
        payload: false
      })
    }
  }
}

export const getTypesSaga = function* () {
  while (true) {
    yield take(FETCH_TYPES_REQUEST)

    yield put({
      type: FETCH_TYPES_LOADER,
      payload: true
    })

    try {
      const {
        data
      } = yield axios.get('http://localhost:8000/api/v1/types/');
      yield put({
        type: FETCH_TYPES_SUCCESS,
        payload: data
      })
    } catch (err) {
      yield put({
        type: FETCH_TYPES_ERROR
      })
    } finally {
      yield put({
        type: FETCH_TYPES_LOADER,
        payload: false
      })
    }
  }
}

export const saga = function* () {
  yield all([
    getTasksSaga(),
    updateTaskSaga(),
    deleteTaskSaga(),
    saveTaskSaga(),
    getStatusesSaga(),
    getTypesSaga()
  ])
}