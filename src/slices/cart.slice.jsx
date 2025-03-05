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
export const addProductToCart = createAsyncThunk("cart/addProductToCart",async({productId, count=1},{getState})=>{
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
        if(data.status === "success")
            {
                //the API returns 2 different formats To handle this:
                const product = getState().cartReducer.cartInfo.data.products.find(item => item.product.id === productId);
                const product2 = getState().cartReducer.cartInfo.data.products.find(item => item.product === productId);
                const oldCount = product ? product.count : product2? product2.count : 0;

                //add the quantity because API does not provide this directly 
                updateProductCountInAdd({productId, count,token, oldCount});

                toast.success(data.message);
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
const updateProductCountInAdd = async({productId,count, token, oldCount})=>{
    const newCount = oldCount + count; // Add new count to old count
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
            token,
        },
        data:{
           count: newCount
        }   
    }
    try {
        const {data} = await axios.request(options)
        return data
    }
    catch (error) {
        toast.dismiss(toastId)
        toast.error(error.response.data.message)
    }
};
export const BuyNow = createAsyncThunk("cart/BuyNow",async(productId,{getState})=>{
    toastId = toast.loading("Redirecting ...")
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
        if(data.status === "success")
            {
                location.href = "/checkout"
            }
            return data
    } catch (error) {
        toast.dismiss(toastId)
        toast.error("Error Occurred")
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
        isLoadingCart: false,
        isLoadingUpdateCart: false,
        quantityItem:0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartProducts.fulfilled,(state,action)=>{  
            state.cartInfo = action.payload;
            state.isLoadingCart= false;
        }),
        builder.addCase(getCartProducts.pending,(state,action)=>{  
            state.isLoadingCart= true;
        }),
        builder.addCase(addProductToCart.fulfilled,(state,action)=>{  
            state.cartInfo = action.payload;
            state.isLoadingUpdateCart= false;
        }),
        builder.addCase(addProductToCart.pending,(state,action)=>{  
            state.isLoadingUpdateCart= true;
        }),
        builder.addCase(deleteCartProduct.fulfilled,(state,action)=>{            
            state.cartInfo = action.payload;
            state.isLoadingUpdateCart= false;
        })
        builder.addCase(deleteCartProduct.pending,(state,action)=>{            
            state.isLoadingUpdateCart= true;
        })
        builder.addCase(deleteAllCart.fulfilled,(state,action)=>{
            state.cartInfo = null
        })
        builder.addCase(updateProductCount.fulfilled,(state,action)=>{      
            state.cartInfo = action.payload
            state.isLoadingUpdateCart= false;
        })
        builder.addCase(updateProductCount.pending,(state,action)=>{      
            state.isLoadingUpdateCart= true;
        })
    },
})
export const cartReducer = cart.reducer
//slice
