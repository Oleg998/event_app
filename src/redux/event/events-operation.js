import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestEvent,
} from '../../api/event-api';


 export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async ({  page }, thunkAPI) => {
    try {
      const data = await requestEvent( page);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



