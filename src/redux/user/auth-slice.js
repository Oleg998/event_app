import { createSlice } from "@reduxjs/toolkit";
import {register} from "../../redux/user/user-operation"

const initialState = {
    user:{},
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

const user = createSlice ({
    name :"user",
    initialState,
    extraReducers: builder => {
        builder
          
          .addCase(register.pending, statusPending)
    
          .addCase(register.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.user = payload.user;
            state.isLogin=true;
          })
          .addCase(register.rejected, statusRejected)
          
}})

export default user.reducer