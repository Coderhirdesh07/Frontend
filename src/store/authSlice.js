import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:null,
    status:false,
    data:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.token = action.payload.token
            state.data = action.payload.data;
        },
        logout:(state,action)=>{
            state.status = false;
            state.token=null;
            state.data = null;
        }
    }
})
export const {login,logout} = authSlice.actions;
export default authSlice.reducer;