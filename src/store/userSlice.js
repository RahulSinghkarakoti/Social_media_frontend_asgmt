import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{},
    status:false,
    error:null
}

const userSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            // console.log("in userslice login",action.payload)
            state.user=action.payload
            state.status=true
        },
        logout:(state)=>{
            console.log("logout slice called")
            state.user={}
            state.status=false
            localStorage.clear();
            }
    }

})

export const {login,logout}=userSlice.actions
export default userSlice.reducer;