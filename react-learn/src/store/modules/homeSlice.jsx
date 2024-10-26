import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import request from "../../request"
const initialState = {
  count:0,
  articles:[],
  tags:[],
  tag:null,
  tab:"all",
  currentPage:1
}
export const getTags = createAsyncThunk("home/getTags",async ()=>{
  const response = await request.tag.getAll()
  return response.data
})
export const getTabArticles = createAsyncThunk("home/getTabArticles",async (msg,action)=>{
  let {tab,tag,currentPage} = action.getState().home
  let result = {}
  if(tab){
    if(tab === "follow"){
      result = await request.article.byFollow(currentPage)
    }else if(tab === "all"){
      result = await request.article.getAll(currentPage)
    }
  }
  if(tag){
    result = await request.article.byTag(tag,currentPage)
  }
  return result.data
})
export const homeSlice = createSlice({
  name:"home",
  initialState,
  reducers:{
    syncTag:(state,action)=>{
      return {...state,tag:action.payload}
    },
    syncTab:(state,action)=>{
      return {...state,tab:action.payload}
    },
    syncPage:(state,action)=>{
      return {...state,currentPage:action.payload}
    },
    homeUnmount:()=>{
      return {...initialState}
    }
  },
  extraReducers:builder=>{
    builder.addCase(getTags.fulfilled,(state,action)=>{
      const tags = action.payload
      return {...state,tags}
    }).addCase(getTabArticles.fulfilled,(state,action)=>{
      return {...state,...action.payload}
    })
  }
});
export const  {
  syncTag,syncTab,syncPage,homeUnmount
} = homeSlice.actions
export default homeSlice.reducer