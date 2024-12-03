import { configureStore } from '@reduxjs/toolkit'
import authSlice from './fetures/authSlice'

export const store = configureStore({
  reducer : {
    auth : authSlice
  },
})