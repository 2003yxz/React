import {createSlice} from "@reduxjs/toolkit"
import {
  saveData,
  getData,
  deleteData
} from "../../utils/localStorage"
const initUser = ()=>{
  const currentUser = getData("currentUser")
  if(currentUser){
    return currentUser
  }
  return null
}
const initToken = ()=>{
  const token = getData("token")
  if(token){
    return token
  }
  return null
}
const initialState = {
  ...initUser(),
  errors:null,
  currentUser:initUser(),
  token:initToken()
}
export const settingSlice = createSlice({
  name:"setting",
  initialState,
  reducers:{
    settingFileUpdate:(state,action)=>{
      const key = action.payload.key
      const value = action.payload.value
      state[key] = value
    },
    userlogout:(state)=>{
      deleteData("currentUser")
      deleteData("token")
    },
    userUpdate:(state,action)=>{
      if(action.payload.status === 1){
        const currentUser = action.payload.data
        const token = action.payload.data.token
        saveData("currentUser",currentUser)
        saveData("token",token)
        state = {...state,...initUser()}
      }else{
        state.errors = action.payload.message
      }
    },
    onUnload:(state)=>{
      return {
        ...state,
        ...initUser(),
        errors:null,
        token:initToken(),
        currentUser:initUser()
      }
    }
  }
})
export const {settingFileUpdate,userlogout,userUpdate,onUnload} = settingSlice.actions
export default settingSlice.reducer