import { memo } from "react"
const Pagination = memo(props => {
  const LIMIT = 5
  let { currentPage, count, onPageClick } = props
  if (count <= LIMIT) {
    return null
  }
  const pageNum = []
  for (let page = 1; page <= Math.ceil(count / LIMIT); page++) {
    pageNum.push(page)
  }
  return (
    <nav>
      <ul>
        {
          pageNum.map(pagenum => {
            const isCurrentPage = currentPage === pagenum
            return (
              <li key={pagenum}
                className={isCurrentPage ? "page-item active" : "page-item "}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={
                    () => {
                      // console.log(pagenum);
                      onPageClick(pagenum)
                    }
                  }
                >
                  {pagenum}
                </button>
              </li>
            )
          })
        }
      </ul>
    </nav>

  )
})
export default Pagination