import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'Login',
    initialState: {
        token: null,
        userId: null,
        tryAutoLogin:false
    },
    reducers: {
        loginUser: (state, action) => {
            const { token, userId } = action.payload
            authDataStore(token, userId);
            state.token = token
            state.userId = userId
        },
        didTryAutoLogin:(state,action)=>{
            state.tryAutoLogin = true
        },
        logoutUser : (state,action)=>{
            AsyncStorage.removeItem('userLogin') 
            state.token = null; 
            state.userId = null; 
        }
    }
})

const authDataStore = (token, userId) => {
    console.log(token, userId)
    AsyncStorage.setItem('userLogin',
        JSON.stringify({
            token: token,
            userId: userId
        }))
}

// export const logout = ()=>{

// }

export const { loginUser,didTryAutoLogin,logoutUser } = authSlice.actions
export default authSlice.reducer