import {
    all,
    take,
    put
} from 'redux-saga/effects';
import {
    createSelector
} from "reselect";
import axios from 'axios';

export const moduleName = 'statuses-module';

export const FETCH_STATUSES_REQUEST = `${moduleName}/FETCH_STATUSES_REQUEST`;
export const FETCH_STATUSES_SUCCESS = `${moduleName}/FETCH_STATUSES_SUCCESS`;
export const FETCH_STATUSES_ERROR = `${moduleName}/FETCH_STATUSES_ERROR`;
export const FETCH_STATUSES_LOADER = `${moduleName}/FETCH_STATUSES_LOADER`;

// REDUCERS 

const initialState = {
    statusesList: [],
    error: null,
    isLoading: false
}

export default function statusesReducer(state = initialState, action = {}) {
    switch (action.type) {
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
        default:
            return state
    }
}

// SELECTORS

export const moduleSelector = state => state[moduleName];
export const statusesListSelector = createSelector(moduleSelector, state => state?.statusesList?.data);

// ACTION CREATORS

export const getStatuses = () => ({
    type: FETCH_STATUSES_REQUEST
});

// SAGAS

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

export const saga = function* () {
    yield all([
        getStatusesSaga()
    ])
}