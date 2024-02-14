import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name:"counter",
    initialState:{value:0},
    reducers:{
        increment : (state,actions)=> {console.log('--',state),console.log('ff',actions)},
    }
})



export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
