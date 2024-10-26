import Errors from "../../components/Errors"
import { useDispatch, useSelector } from "react-redux"
import {
  articleFileUpdate,
  articleAddTag,
  articleRemoveTag,
  articleResult,
  onUnload,
  
} from "../../store/modules/articleSlice"
import request from "../../request"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"
function ArticleNew() {
  const navigate = useNavigate()
  let onSubmitForm = async (article)=>{
    try{
      const result = await request.article.create(article)
      if(result.status === 1){
        const {slug} = result.data
        navigate(`/article/${slug}`)
      }else{
        dispatch(articleResult(result.message))
      }
    }catch(error){
      dispatch(articleResult(error))
    }
  }
  useEffect(()=>{
    return ()=>{
      dispatch(onUnload())
    }
  },[])
  const { title, description, body, tag, tags, errors } = useSelector((state) => {
    return state.article
  })
  const dispatch = useDispatch()
  let watchEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      dispatch(articleAddTag())
    }
  }
  let removeTag = (tag) => {
    return (ev) => {
      dispatch(articleRemoveTag(tag))
    }
  }
  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1>创建文章</h1>
            <Errors errors={errors} />

            <form >
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type="text"
                  placeholder='文章标题'
                  value={title || ""}
                  onChange={(e) => {
                    dispatch(articleFileUpdate({
                      key: "title",
                      value: e.target.value
                    }))
                  }}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type="text"
                  placeholder='文章描述'
                  value={description || ""}
                  onChange={(e) => {
                    dispatch(articleFileUpdate({
                      key: "description",
                      value: e.target.value
                    }))
                  }}
                />
              </fieldset>
              <fieldset className='form-group'>
                <textarea
                  className='form-control form-control-lg'
                  rows={12}
                  placeholder='用markdown编辑文章'
                  value={body || ""}
                  onChange={(e) => {
                    dispatch(articleFileUpdate({
                      key: "body",
                      value: e.target.value
                    }))
                  }}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type="text"
                  placeholder='输入标签'
                  onKeyUp={watchEnter}
                  value={tag || ""}
                  onChange={(e) => {
                    dispatch(articleFileUpdate({
                      key: "tag",
                      value: e.target.value
                    }))
                  }}
                />
                {
                  tags.map(tag => {
                    return (
                      <span
                        style={{ marginRight: "4px" }}
                        className="btn btn-secondary btn-sm"
                        key={tag}>{tag}&nbsp;
                        <i
                          onClick={removeTag(tag)}
                          className="iconfont icon-denglong"></i>
                      </span>
                    )
                  })
                }                                                     </fieldset>
              <button
                className='btn btn-lg btn-primary pull-xs-right'
                type='button'
                onClick={()=>{
                  onSubmitForm({title,description,body,tags})
                }}
              >
                发布文章
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArticleNew