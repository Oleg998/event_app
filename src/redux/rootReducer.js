import { combineReducers } from '@reduxjs/toolkit';


import eventReducer from './event/events-slice';
import filterReducer from './filter/filter-slice';




const rootReducer = combineReducers({
  event: eventReducer,
  filter: filterReducer,

});



export default rootReducer;
