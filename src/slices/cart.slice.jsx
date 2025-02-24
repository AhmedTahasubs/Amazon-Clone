import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
let toastId;
// actions
export const getCartProducts = createAsyncThunk("cart/getCartProducts",async(_,{getState})=>{
    const token = getState().userReducer.token;
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart`,
        method: "GET",
        headers: {
            token,
        }
    }
    try {
        const {data} = await axios.request(options)
        return data
    }
    finally{
    }
})
export const addProductToCart = createAsyncThunk("cart/addProductToCart",async(productId,{getState})=>{
    toastId = toast.loading("Adding Product to your Cart ...")
    const token = getState().userReducer.token;
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart`,
        method: "POST",
        headers: {
            token,
        },
        data:{
            productId,
        }
    }
    try {
        const {data} = await axios.request(options)
        console.log(data);
        if(data.status === "success")
            {
                toast.success(data.message)
            }
            return data
    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error.response.data.message)
    }
    finally{
        toast.dismiss(toastId)
    }
})
export const deleteCartProduct = createAsyncThunk("cart/deleteCartProduct",async(productId,{getState})=>{
    toastId = toast.loading("Deleting Product ...")
    const token = getState().userReducer.token;
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
            token,
        }
    }
    try {
        const {data} = await axios.request(options)
        if(data.status === "success")
            {
                toast.dismiss(toastId)
                toast.success("Deleted Successfully")
            }
            return data
    }
    finally{
        toast.dismiss(toastId)
    }
})
export const deleteAllCart = createAsyncThunk("cart/deleteAllCart",async(_,{getState})=>{
    toastId = toast.loading("Deleting Cart ...")
    const token = getState().userReducer.token;
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
            token,
        }
    }
    try {
        const {data} = await axios.request(options)        
        if(data.message === "success")
            {
                toast.dismiss(toastId)
                toast.success("Deleted Successfully")
            }
            return data
    }
    finally{
        toast.dismiss(toastId)
    }
})
export const updateProductCount = createAsyncThunk("cart/updateProductCount",async({productId,count},{getState})=>{
    toastId = toast.loading("Updating ...")
    const token = getState().userReducer.token;
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
            token,
        },
        data:{
            count
        }   
    }
    try {
        const {data} = await axios.request(options)
        if(data.status === "success")
            {
                toast.dismiss(toastId)
                toast.success("Updated Successfully")
            }
            return data
    }
    finally{
        toast.dismiss(toastId)
    }
})
// actions

//slice
const cart = createSlice({
    name: "cart",
    initialState: {
        cartInfo: null,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartProducts.fulfilled,(state,action)=>{  
            state.cartInfo = action.payload;
            state.isLoading= false;
        }),
        builder.addCase(getCartProducts.pending,(state,action)=>{  
            state.isLoading= true;
        }),
        builder.addCase(addProductToCart.fulfilled,(state,action)=>{  
            state.cartInfo = action.payload;
        }),
        builder.addCase(deleteCartProduct.fulfilled,(state,action)=>{            
            state.cartInfo = action.payload;
        })
        builder.addCase(deleteAllCart.fulfilled,(state,action)=>{
            state.cartInfo = null
        })

        builder.addCase(updateProductCount.fulfilled,(state,action)=>{      
            state.cartInfo = action.payload
        })
    },
})
export const cartReducer = cart.reducer
//slice
