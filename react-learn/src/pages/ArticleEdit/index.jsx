import { Errors } from "../../components/Errors"
import { useDispatch, useSelector } from "react-redux"
import {
  articleFileUpdate,
  articleAddTag,
  articleRemoveTag,
  articleResult,
  onUnload,
  ArticleBySlugResult
} from "../../store/modules/articleSlice"
import request from "../../request"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
function ArticleEdit() {
  const { title, description, body, tag, tags, errors, slug } = useSelector((state) => {
    return state.article
  })
  const dispatch = useDispatch()
  let watchEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(articleAddTag())
    }
  }
  let removeTag = (tag) => {
    return () => {
      dispatch(articleRemoveTag(tag))
    }
  }
  const navigate = useNavigate()
  let onSubmit = async (article) => {
    try {
      const result = await request.article.update(article)
      if (result.status === 1) {
        const { slug } = result.data
        navigate(`/article/${slug}`)
      } else {
        dispatch(articleResult(result.message))
      }
    } catch (error) {
      dispatch(articleResult(error))
    }
  }
  const { slug } = useParams()
  let getArticleBySlug = async (routeSlug) => {
    try {
      const result = await request.article.get(routeSlug)
      if (result.status === 1) {
        dispatch(ArticleBySlugResult(result.data))
      } else {
        dispatch(ArticleBySlugResult(result.message))
      }
    } catch (error) {
      dispatch(error)
    }
  }
  useEffect(() => {
    getArticleBySlug(slug)
    return () => {
      dispatch(onUnload())
    }
  }, [])
  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1>编辑文章</h1>
            <Errors errors={errors} />

            <form >
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type="text"
                  placeholder='文章标题'
                  value={title || ""}
                  onChange={(e) => {
                    dispatch(articleFiledUpdate(
                      { key: 'title', value: e.target.value }
                    ))
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
                    dispatch(articleFiledUpdate(
                      { key: 'description', value: e.target.value }
                    ))
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
                    dispatch(articleFiledUpdate(
                      { key: 'body', value: e.target.value }
                    ))
                  }}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type="text"
                  placeholder='输入标签'
                  value={tag || ""}
                  onChange={(e) => {
                    dispatch(articleFiledUpdate(
                      { key: 'tag', value: e.target.value }
                    ))
                  }}
                  onKeyUp={watchEnter}
                />

                {//新增
                  tags.map(tag => {
                    return (
                      <span
                        className='tag-default tag-pill'
                        key={tag} >
                        <i className="iconfont icon-denglong"
                          onClick={removeTag(tag)}
                        />
                        {tag}
                      </span>
                    )
                  })
                }
              </fieldset>
              <button
                className='btn btn-lg btn-primary pull-xs-right'
                type='button'
                onClick={
                  () => {
                    //新增传入slug
                    onSubmitForm({ slug, title, description, body, tags })
                  }
                }
              >
                更新文章
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
export default ArticleEdit