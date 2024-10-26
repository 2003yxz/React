import { Link, useNavigate } from "react-router-dom"
import request from "../../request"
import {
  articleDeleteResult,
  articleFavoriteResult
} from "../../store/modules/articleSlice"
import { useDispatch } from "react-redux"
const FAVORITED_CLASS = "btn btn-sm btn-primary"
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary"
const ArticleAction = (props) => {
  const navigate = useNavigate();
  const { article, currentUser } = props
  const { slug, author } = article
  const dispatch = useDispatch();

  const deleteArticle = async (slug) => {
    try {
      const result = await request.article.delete(slug)
      if (result.status === 1) {
        navigate("/")
      } else {
        dispatch(articleDeleteResult(result.message))
      }
    } catch (error) {
      dispatch(articleDeleteResult(error))
    }
  }
  const favoriteArticle = async (slug) => {
    try {
      const result = await request.article.favorite(slug)
      if (result.status === 1) {
        dispatch(articleFavoriteResult(result.data))
      } else {
        dispatch(articleFavoriteResult(result.message))
      }
    } catch (error) {
      dispatch(articleFavoriteResult(error))
    }
  }

  const unfavoriteArticle = async (slug) => {
    try {
      const result = await request.article.unfavorite(slug)
      if (result.status === 1) {
        dispatch(articleFavoriteResult(result.data))
      } else {
        dispatch(articleFavoriteResult(result.message))
      }
    } catch (error) {
      dispatch(articleFavoriteResult(error))
    }
  }
  if (currentUser) {
    const isOWn = currentUser && author && currentUser.username === author.username
    if (isOWn) {
      return (
        <span>
          <Link to={`/article/edit/${slug}`}>
            <i className="iconfont icon-zhuanchezhuanyongbeifen"></i> 编辑
          </Link>
          {" "}
          <button
            className="btn  btn-outline-danger btn-sm"
            onClick={() => {
              deleteArticle(slug)
            }}
          >
            <i className="iconfont icon-denglong"></i> 删除
          </button>

        </span>

      )
    } else {
      return (
        <button
          className={article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS}
          onClick={() => {
            if (article.favorited) {
              unfavoriteArticle(slug)
            } else {
              favoriteArticle(slug)
            }
          }}
        >
          <i className="iconfont icon-xihuan"></i> {article.favoriteCount}
        </button>
      )
    }
  } else {
    return (
      <button
        className="btn  btn-outline-danger btn-sm"
        onClick={() => {
          console.log('重定向到登录页面');
        }}
      >
        <i className="iconfont icon-xihuan"></i> 喜欢
      </button>
    )
  }
}
export default ArticleAction