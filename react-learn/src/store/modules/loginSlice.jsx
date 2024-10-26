import {createSlice} from "@reduxjs/toolkit"
import {saveData,getData} from "../../utils/localStorage"
const initUser = ()=>{
  const currentUser = getData("currentUser")
  if(currentUser){
    return currentUser
  }
  return null
}
const initialState = {
  email:"",
  username:"",
  password:"",
  currentUser:initUser(),
  errors:null
}
export const loginSlice = createSlice({
  name:"login",
  initialState,
  reducers:{
    loginFileUpdate:(state,action)=>{
      const key = action.payload.key
      const value = action.payload.value
      state[key] = value
    },
    loginSubmit:(state,action)=>{
      const {status,message,data} = action.payload
      if(status === 1){
        let currentUser = data;
        let token = data.token
        saveData("currentUser",currentUser)
        saveData("token",token)
        return {...state,...data,currentUser:initUser()}
      }else{
        return {...state,errors:message}
      }
    },
    onUnload:()=>{
      return {...initialState,currentUser:initUser()}
    },
    avatarUpdate:(state)=>{
      state.currentUser = initUser()
    }
  }
})

export const {loginFileUpdate,loginSubmit,onUnload,avatarUpdate} = loginSlice.actions
export default loginSlice.reducer