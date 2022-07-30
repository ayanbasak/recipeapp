import { createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { watcherSaga } from "./sagas/rootSaga";
import thunk from 'redux-thunk';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
import rootReducer from "./reducers/rootReducer";

// const persistConfig = {
//   key: 'recipe-store',
//   storage
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(persistedReducer, {}, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(watcherSaga);

const store =  createStore(rootReducer, applyMiddleware(thunk));

// export const persistor = persistStore(store)
export default store;
