import { combineReducers, configureStore } from '@reduxjs/toolkit';
import localForage from 'localforage';
import { persistStore, persistReducer } from 'redux-persist';
import shopSlice from './shop';

const persistConfig = {
  key: 'root',
  storage: localForage,
}

const rootReducer = combineReducers({
  shop: shopSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware() })

export const persistor = persistStore(store);

export default store;