import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestContacts,
  requestAddContacts,
  requestDeleteContacts,
} from '../../api/contants-api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await requestContacts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContacts',
  async (body, thunkAPI) => {
    try {
      const data = await requestAddContacts(body);
      return data;
    } 
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition :({name} , {getState})=>{
      const {contacts}=getState()
      const normalazeName = name.toLowerCase();
      const dublicate = contacts.items.find(item => {
        const normalizedCurrentName = item.name.toLowerCase();
        return normalazeName === normalizedCurrentName;
      })
      if(dublicate)
     { alert(`Name ${name} already in Phonebook`)
     return false;}
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/delContats',
  async (id, thunkAPI) => {
    try {
      await requestDeleteContacts(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


