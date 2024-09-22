import { combineReducers } from '@reduxjs/toolkit';


import eventReducer from './event/events-slice';
import filterReducer from './filter/filter-slice';
import userReducer from "./user/user-slice"



const rootReducer = combineReducers({
  event: eventReducer,
  filter: filterReducer,
  user:userReducer
});



export default rootReducer;
