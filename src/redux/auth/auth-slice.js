import { createSlice } from "@reduxjs/toolkit";
import {signup , login , current ,logout } from "../auth/auth-operation"

const initialState = {
    user:{},
    token : "",
    isLogin :false,
    isLoading : false,
    error:null , 

}
const statusPending = state =>{
    state.isLoading=true;
    state.error=null
  }
  
  const statusRejected = (state , {payload})=>{
    state.isLoading=false;
    state.error=payload
  }

const auth = createSlice ({
    name :"auth",
    initialState,
    extraReducers: builder => {
        builder
          .addCase(signup.pending, statusPending)
    
          .addCase(signup.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.user = payload.user;
            state.token = payload.token;
            state.isLogin=true;
          })
          .addCase(signup.rejected, statusRejected)
          .addCase(login.pending, statusPending)
    
          .addCase(login.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.user = payload.user;
            state.token = payload.token;
            state.isLogin=true;
          })
          .addCase(login.rejected, statusRejected)
          .addCase(current.pending, statusPending)
    
          .addCase(current.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.user = payload;
            state.isLogin=true;
          })
          .addCase(current.rejected, (state,) => {
            state.isLoading = false;
            state.token =""
            
          })
          .addCase(logout.pending, statusPending)
    
          .addCase(logout.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.user = {};
            state.isLogin=false;
            state.token =""
          })
          .addCase(logout.rejected, statusRejected)
}})

export default auth.reducer