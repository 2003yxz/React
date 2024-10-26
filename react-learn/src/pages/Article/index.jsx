import { useParams } from "react-router-dom"
import { useEffect } from "react"
import request from "../../request"
import { useDispatch, useSelector } from "react-redux"
import {
  ArticleBySlugResult,
  onUnload
} from "../../store/modules/articleSlice"
import ArticleAction from "./ArticleAction"
import { Link } from "react-router-dom"
import { marked } from "marked"
import Comments from "../Comments"
function Article() {
  const { slug } = useParams();
  const dispatch = useDispatch()
  const getArticleBySlug = async (routeSlug) => {
    let result = await request.article.get(routeSlug)
    if (result.status === 1) {
      dispatch(ArticleBySlugResult(result.data))
    } else {
      dispatch(ArticleBySlugResult(result.message))
    }
  }
  useEffect(() => {
    getArticleBySlug(slug)
    return () => {
      dispatch(onUnload())
    }
  }, [])
  const article = useSelector((state) => {
    return state.article
  })
  const { title, description, body, tags, author } = article
  const currentUser = useSelector((state) => {
    return state.login.currentUser
  })
  if (!body) {
    return null
  }
  const markdata = body;
  const markhtml = marked.parse(markdata, { sanitize: true })
  const markObj = { __html: markhtml }
  return (
    <div className='article-page'>
      {/* 文章头信息 */}
      <div className='banner'>
        <div className='container'>
          <h1>{title}</h1>
          <div className='article-meta'>
            <div className="info">
              <Link to={`/profile/${author && author.username}`}>
                <img src={(author && author.avatar) || "http://localhost:8000/default.png"} alt={author && author.username} />
              </Link>
            </div>
            <div className="info">
              <Link to={`/profile/${author && author.username}`}>
                {author && author.username}
              </Link>
              {"  "}
            </div>

            {/* button :行为 */}
            <ArticleAction article={article} currentUser={currentUser} />
          </div>

        </div>
      </div>


      {/* 文章信息：内容和标签 */}
      <div className="row article-content">
        <div className="col-xs-12">
          {/* 文章内容 */}
          <div dangerouslySetInnerHTML={markObj}></div>
          {/* 文章标签 */}
          <ul className='tag-list'>
            {
              tags.map(tag => {
                return (
                  <li className='tag-default tag-pill'
                    key={tag}>
                    {tag}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      {/* 文章评论 */}
      {/* 
          评论信息 ： 
          未登录 ： 登录和注册 / 评论列表
          已登录 ： 添加评论 / 评论列表
        */}
      <Comments slug={slug} currentUser = {currentUser}></Comments>
    </div>

  )
}
export default Article