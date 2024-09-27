import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice'
import cartReducer from './CartSlice'
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER  } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(logger),
  });

export const persistor = persistStore(store);