import {createSlice} from "@reduxjs/toolkit"
const initialState = {
  title:"",
  description:"",
  body:"",
  tags:[],
  tag:"",
  errors:null
}
export const articleSlice = createSlice({
  name:"article",
  initialState,
  reducers:{
    articleFileUpdate:(state,action)=>{
      const key = action.payload.key
      const value = action.payload.value
      state[key] = value
    },
    articleAddTag:(state)=>{
      const tags = state.tags.concat([state.tag])
      return {...state,tags,tag:""}
    },
    articleRemoveTag:(state,action)=>{
      const removeTag = action.payload
      const filterTags = state.tags.filter(tag=>{
        return tag !== removeTag
      })
      return {...state,tags:filterTags}
    },
    articleResult:(state,action)=>{
      state.errors = action.payload
    },
    onUnload:()=>{
      return {
        ...initialState
      }
    },
    ArticleBySlugResult:(state,action)=>{
      return {...state,...action.payload}
    },
    articleDeleteResult:(state,action)=>{
      state.errors = action.payload
    },
    articleFavoriteResult:(state,action)=>{
      return {...state,...action.payload}
    }
  }
})
export const {
  articleFileUpdate,
  articleAddTag,
  articleRemoveTag,
  articleResult,
  onUnload,
  ArticleBySlugResult,
  articleDeleteResult,
  articleFavoriteResult
} = articleSlice.actions
export default articleSlice.reducer