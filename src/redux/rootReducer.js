import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactReducer from './contacts/contacts-slice';
import filterReducer from './filter/filter-slice';
import authReducer from './auth/auth-slice';


const persistConfig={
  key:"root",
  storage,
  whitelist:["token"]
}
const persistedAuthReducer=persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  contacts: contactReducer,
  filter: filterReducer,
  auth:persistedAuthReducer
});



export default rootReducer;
