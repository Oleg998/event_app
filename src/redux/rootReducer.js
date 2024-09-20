import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import eventReducer from './event/events-slice';
import filterReducer from './filter/filter-slice';



const persistConfig={
  key:"root",
  storage,
  whitelist:["token"]
}
const persistedAuthReducer=persistReducer(persistConfig);

const rootReducer = combineReducers({
  event: eventReducer,
  filter: filterReducer,

});



export default rootReducer;
