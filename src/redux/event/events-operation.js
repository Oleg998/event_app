import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestEvent,
} from '../../api/event-api';

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await requestEvent();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


