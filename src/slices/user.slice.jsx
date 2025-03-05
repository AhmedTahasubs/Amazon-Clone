import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
let toastId;
// actions
export const signUp = createAsyncThunk("user/signUp", async (values) => {
  const options = {
    url: `https://ecommerce.routemisr.com/api/v1/auth/signup`,
    method: "POST",
    data: values,
  };
  toastId = toast.loading("Signing up...");
  try {
    const { data } = await axios.request(options);
    console.log(data);
    if (data.message === "success") {
      toast.success("Signed up successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
});
export const logIn = createAsyncThunk("user/logIn", async (values) => {
  const options = {
    url: `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    method: "POST",
    data: values,
  };
  toastId = toast.loading("Logging in...");
  try {
    const { data } = await axios.request(options);
    console.log(data);
    
    if (data.message === "success") {
      toast.success("Welcome back");
      setTimeout(() => {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }, 1500);
    }
    return data;
  } catch (error) {
    console.log(error);
    
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
});
export const forgetPassword = createAsyncThunk("user/forgetPassword",async(values)=>{
  toastId = toast.loading("Waiting...");
  const options = {
    url: `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
    method: "POST",
    data: values,
  };
  try {
  let {data} = await axios.request(options);
  toast.success(data.message)
  if(data.statusMsg== "success"){
    setTimeout(()=>{
      window.location.href = "/verifyResetCode"
    },1000)
  }
 } catch (error) {
  toast.error(error.response.data.message)
 }
 finally{
  toast.dismiss(toastId)
 }
})
export const verifyResetCode = createAsyncThunk("user/verifyResetCode",async(values)=>{
  toastId = toast.loading("Waiting...");
  const options = {
    url: `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
    method: "POST",
    data: values,
  };
  try {
  let {data} = await axios.request(options);
  if(data.status=== "Success"){
    toast.success("Verified, Please enter new password");
    setTimeout(()=>{
      window.location.href = "/resetPassword"
    },1000)
  }
 } catch (error) {
  toast.error(error.response.data.message)
 }
 finally{
  toast.dismiss(toastId)
 }
})
export const resetPassword = createAsyncThunk("user/resetPassword",async(values)=>{
  toastId = toast.loading("Resetting...");
  const options = {
    url: `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    method: "PUT",
    data: values,
  };
  try {
  let {data} = await axios.request(options);
  if(data.token){
    toast.success("Password reset successfully");
    setTimeout(()=>{
      window.location.href = "/login"
    },1000)
  }
 } catch (error) {
  toast.error("Error resetting password")
 }
 finally{
  toast.dismiss(toastId)
 }
})
// actions

//slice
const user = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    id: null,
    isLoadingUser:false
  },
  reducers: {
    logout:(state,action)=>{
      localStorage.removeItem('token')
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoadingUser = false
    });
    builder.addCase(logIn.pending, (state, action) => {
    state.isLoadingUser = true
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
    state.isLoadingUser = false
    });
    builder.addCase(signUp.pending, (state, action) => {
    state.isLoadingUser = true
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
    state.isLoadingUser = false
    });
    builder.addCase(forgetPassword.pending, (state, action) => {
    state.isLoadingUser = true
    });
    builder.addCase(verifyResetCode.fulfilled, (state, action) => {
    state.isLoadingUser = false
    });
    builder.addCase(verifyResetCode.pending, (state, action) => {
    state.isLoadingUser = true
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
    state.isLoadingUser = false
    });
    builder.addCase(resetPassword.pending, (state, action) => {
    state.isLoadingUser = true
    });
  },
});
export const userReducer = user.reducer;
export const {logout} = user.actions;
//slice
