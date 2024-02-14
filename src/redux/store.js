import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './reducer/increment'
import  cartSlice  from './reducer/CartSlice'
import productSlice  from './reducer/ProductSlice'
import authSlice from './reducer/authSlice'

const rootReducer = {
  counter : counterSlice,
  cart :cartSlice,
  product: productSlice,
  auth:authSlice

}

export const store = configureStore({
  reducer: rootReducer
})