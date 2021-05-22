import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
// import getProjectsSaga from '../modules/projects-module';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, logger)
);
// sagaMiddleware.run()

export default store;