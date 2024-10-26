import {createSlice} from "@reduxjs/toolkit"
const initialState={
  emali:"",
  username:"",
  password:"",
  errors:null
}
export const registSlice = createSlice({
  name:"regist",
  initialState,
  reducers:{
    registSubmit:(state,action)=>{
      console.log(action.payload)
    },
    registFiledUpdate:(state,action)=>{
      const key = action.payload.key
      const value = action.payload.value
      state[key] = value
    },
    onUnload:()=>{
      return {...initialState}
    }
  }
})
export const {registSubmit,registFiledUpdate,onUnload} = registSlice.actions
export default registSlice.reducer