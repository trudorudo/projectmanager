import {
    all,
    take,
    put
} from 'redux-saga/effects';
import {
    createSelector
} from "reselect";
import axios from 'axios';

export const moduleName = 'types-module';

export const FETCH_TYPES_REQUEST = `${moduleName}/FETCH_TYPES_REQUEST`;
export const FETCH_TYPES_SUCCESS = `${moduleName}/FETCH_TYPES_SUCCESS`;
export const FETCH_TYPES_ERROR = `${moduleName}/FETCH_TYPES_ERROR`;
export const FETCH_TYPES_LOADER = `${moduleName}/FETCH_TYPES_LOADER`;

const initialState = {
    typesList: [],
    error: null,
    isLoading: false
}

export default function typesReducer(state = initialState, action = {}) {
    switch (action.type) {
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

// SELECTORS

export const moduleSelector = state => state[moduleName];
export const typesListSelector = createSelector(moduleSelector, state => state?.typesList?.data);

// ACTION CREATORS

export const getTypes = () => ({
    type: FETCH_TYPES_REQUEST
});

// SAGAS

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
        getTypesSaga()
    ])
}