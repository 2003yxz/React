import apiClient from "./apiClient"
const LIMIT = 5
const OFFSET = (page)=>{
  return (page - 1) * LIMIT
}
export default {
  create: article=>apiClient.post("/articles",{article}),
  get:slug=>apiClient.get("/articles/"+slug),
  update:article=>apiClient.put("/articles/"+article.slug,{article}),
  delete:slug=>apiClient.delete("/articles/"+slug),
  favorite:slug=>apiClient.post("/favorites/"+slug),
  unfavorite:slug=>apiClient.delete("/favorites/"+slug),
  getAuthor:(author,page)=>apiClient.get(`/articles?author=${author}&limit=${LIMIT}&offset=${OFFSET(page)}`),
  getFavorite:(author,page)=>apiClient.get(`/articles?favorite=${author}&limit=${LIMIT}&offset=${OFFSET(page)}`),
  getAll:(page)=>apiClient.get(`/articles?limit=${LIMIT}&offset=${OFFSET(page)}`),
  byTag:(tag,page)=>apiClient.get(`/articles?tag=${tag}&limit=${LIMIT}&offset=${OFFSET(page)}`),
  byFollow:(page)=>apiClient.get(`/articles/follow?limit=${LIMIT}&offset=${OFFSET(page)}`)
}