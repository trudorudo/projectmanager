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

// REDUCERS

const initialState = {
  tasksData: [],
  error: null,
  isLoading: false,
  isTaskUpdated: false,
  newTask: null,
  isTaskDeleted: false
}

export default function tasksReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasksData: action.payload,
        newTask: null
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
        tasksData: action.payload,
        newTask: action.payload
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
        newTask: action.payload
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
        isLoading: false,
        newTask: action.payload
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
    default:
      return state
  }
}


// TODO: SELECTORS
export const moduleSelector = state => state[moduleName];
export const tasksListSelector = createSelector(moduleSelector, state => state.tasksData?.data);
export const isFetchLadingSelector = createSelector(moduleSelector, state => state.isLoading);
export const errorSelector = createSelector(moduleSelector, state => state.error);
export const newTaskSelector = createSelector(moduleSelector, state => state.newTask);

// ACTION CREATORS

export const getTasks = () => ({
  type: FETCH_TASKS_REQUEST
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

export const updateTaskSaga = function* () {
  while (true) {
    const { payload } = yield take(UPDATE_TASK_REQUEST)

    yield put({
      type: UPDATE_TASK_LOADER,
      payload: true,
      payload: payload ? payload : {}
    })

    try {
      const {
        data
      } = yield axios({

        url: 'http://localhost:8000/api/v1/tasks/',
        data: {
          id: payload.id,
          project_id: payload.project_id,
          name: payload.taskName,
          code: payload.taskCode,
          description: payload.taskDescription,
          type: payload.taskType,
          task_status: payload.taskStatus
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
      payload: true,
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

    yield put({
      type: SAVE_TASK_LOADER,
      payload: true,
      payload: payload ? payload : {}
    })

    try {
      const {
        data
      } = yield axios.post('http://localhost:8000/api/v1/tasks/', {
        project_id: 35,
        name: payload.taskName,
        code: payload.taskCode,
        description: payload.taskDescription,
        type: payload.taskType,
        task_status: payload.taskStatus
      });
      yield put({
        type: SAVE_TASK_SUCCESS,
        payload: data
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

export const saga = function* () {
  yield all([
    getTasksSaga(),
    updateTaskSaga(),
    deleteTaskSaga(),
    saveTaskSaga()
  ])
}