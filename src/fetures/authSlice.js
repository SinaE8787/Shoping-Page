import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product : null,
    loding : false , 
}
export const getProducts =createAsyncThunk('api/product' , async()=>{
    const products = axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => console.log(response?.data));
})
const authSlice =createSlice({
    name : 'auth',
    initialState,
    reducers :{},
    extraReducers: (builder)=>{
        builder.addCase(getProducts.pending,(state , action)=>{

        })
        builder.addCase(getProducts.fulfilled,(state , action)=>{

        })
    }
})
export default authSlice.reducer;