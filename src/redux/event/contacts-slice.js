import { createSlice } from '@reduxjs/toolkit';
import {
  fetchEvents
} from './contacts-operation';

const initialState = { items: [], isLoading: false, error: null , requestStutus:""};

const statusPending = state =>{
  state.isLoading=true;
  state.error=null
  state.requestStutus="Pending"
}

const statusRejected = (state , {payload})=>{
  state.isLoading=false;
  state.error=payload
  
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, statusPending)

      .addCase(fetchEvents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
        state.requestStutus="fetchFulfilled"
      })
      .addCase(fetchEvents.rejected, statusRejected)
      // .addCase(addContacts.pending, statusPending)

      // .addCase(addContacts.fulfilled, (state, { payload }) => {
      //   state.isLoading = false;
      //   state.items.push(payload);
      //   state.requestStutus="addFlfilled"
      // })
      // .addCase(addContacts.rejected,(state , {payload})=>{
      //   state.isLoading=false;
      //   state.error=payload;
      //   state.requestStutus="addRejected";
      // })
      
      // .addCase(deleteContacts.pending,statusPending)

      // .addCase(deleteContacts.fulfilled, (state, { payload }) => {
      //   state.isLoading = false;
      //   state.items = state.items.filter(({ id }) => id !== payload);
      //   state.requestStutus="deleteFulfilled"
      // })
      // .addCase(deleteContacts.rejected,(state , {payload})=>{
      //   state.isLoading=false;
      //   state.error=payload;
      //   state.requestStutus="deleteRejected";
      // })
  },
});

export default contactSlice.reducer;
