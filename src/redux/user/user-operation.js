import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  registerUser,getUserByEvent
} from '../../api/user-api';

export const register = createAsyncThunk(
  'user/regisrer',
  async (body, thunkAPI) => {
    try {
      const data = await registerUser(body);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, thunkAPI) => {
    try {
      const data = await getUserByEvent();
      
      return data;
      
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
