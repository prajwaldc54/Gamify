import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
  name:"user",
  initialState:{
    user:""
  },
  reducers:{
    loginby:(state,action)=>{
      state.user=action.payload;
    },
    logout:(state)=>{
      state.user=""
    }
  }
})
export const {loginby,logout}=userSlice.actions;
export const selectUser=(state:any)=>state.user.user;
export default userSlice.reducer; 