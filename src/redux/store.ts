// Imports: Dependencies
import { createStore, applyMiddleware } from 'redux';
import { rootReduser } from './rootReduser';
// import { createLogger } from 'redux-logger'
// import createSagaMiddleware from 'redux-saga';
// import { rootSaga } from '../sagas/index';
// Middleware: Redux Saga
// const sagaMiddleware = createSagaMiddleware();
// Redux: Store
export const store = createStore(
    rootReduser,
    // applyMiddleware(
    //     // sagaMiddleware,
    //     // createLogger(),
    // ),
);
// Middleware: Redux Saga
// sagaMiddleware.run(rootSaga);
