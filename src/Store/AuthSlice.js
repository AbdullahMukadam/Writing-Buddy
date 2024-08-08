
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authStatus : false,
  userData : null
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login : (state,action)=>{
     state.authStatus = true,
     state.userData = action.payload.userData
    },
    logout : (state,action)=>{
      state.authStatus = false,
      state.userData= null
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = AuthSlice.actions

export default AuthSlice.reducer