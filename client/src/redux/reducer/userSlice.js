//import createSlice
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//make http post req to login user
export const userLogin=createAsyncThunk('loginUser', async(userObj,{rejectWithValue, getState, dispatch})=>{
    
    let response=await axios.post('/login',userObj)
    let data=response.data
    //console.log(data)
    //if login successful
    if(data.message==="Login successful"){
        //localStorage.setItem("userInfo",JSON.stringify(data.userInfo))
        return data.userInfo
    }
    //if login is not successful
    if(data.message==="Invalid credentials!" ){
        return rejectWithValue(data.message)
    }
    else{
        throw data.message
    }
})


//slice
let userSlice=createSlice({
    name:'user',
    initialState:{
        userObj:{},
        isuserError:false,
        isuserLoading:false,
        isuserSuccess:false,
        errMsg:'',
    },
    reducers:{
        clearLoginStatus:(state)=>{
            state.isuserError=false;
            state.userObj={};
            state.isuserLoading=false;
            state.isuserSuccess=false;
            state.errMsg='';
            return state;
        }
    },
    extraReducers:{
        //track life cycle of promise returned bt createAsyncThunk function
        [userLogin.pending]:(state,action)=>{
            state.isuserLoading=true;
        },
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj=action.payload;
            state.isuserError=false;
            state.isuserLoading=false;
            state.isuserSuccess=true;
            state.errMsg='';
        },
        [userLogin.rejected]:(state,action)=>{
            state.isuserError=true;
            state.isuserLoading=false;
            state.isuserSuccess=false;
            state.errMsg=action.payload.message;
        }
    }
})

//export action creator
export const {clearLoginStatus}=userSlice.actions
export default userSlice.reducer