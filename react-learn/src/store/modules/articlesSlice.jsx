import {createSlice} from "@reduxjs/toolkit"
const initialState = {
  articles:[],
  count:0,
  currentPage:1,
  tags:[],
  tag:""
}
export const articlesSlice = createSlice({
  name:"articles",
  initialState,
  reducers:{
    articleAuthorResult:(state,action)=>{
      state.articles = action.payload.articles
    }
  }
})
export const {articleAuthorResult}  = articlesSlice.actions
export default articlesSlice.reducer