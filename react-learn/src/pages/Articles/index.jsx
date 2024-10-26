import Item from "./item"
import Pagtion from "./Pagination"
const Articles = props => {
  let { currentPage, count, onPageClick, isShowPage, articles } = props
  if (!articles) {
    return <div className="article-preview">加载中...</div>
  }
  if (articles && articles.length === 0) {
    return <div className="article-preview">此处没有文章</div>
  }
  return (
    <div>
      {
        articles.map(article => {
          return <Item article={article} key={article.slug} />
        })
      }
      {
        isShowPage ? <Pagtion
          count={count}
          currentPage={currentPage}
          onPageClick={onPageClick}
        /> : null
      }
    </div>

  )
}
export  default Articles