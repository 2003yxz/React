import { memo } from "react"
import { connect } from "react-redux"
import {
  syncPage,
  syncTab,
  syncTag,
  getTabArticles
} from "../../store/modules/homeSlice"
const Tags = memo((props) => {
  const { tags } = props
  if (tags) {
    return (
      <div className='tag-list'>
        {
          tags.map(tag => {
            return (
              <button
                type="button"
                className='tag-default tag-pill'
                key={tag}
                onClick={() => {
                  props.syncTag(tag)
                  props.syncPage(1)
                  props.syncTab(null)
                  props.onTabClick()  //完成08-12在新增
                }}
              >
                {tag}
              </button>
            )
          })
        }

      </div>

    )
  } else {
    return <div>加载中...</div>
  }
})
const mapDispatch = dispatch => ({
  onTabClick: () => dispatch(getTabArticles()),
  syncPage: (page) => dispatch(syncPage(page)),
  syncTab: (tab) => dispatch(syncTab(tab)),
  syncTag: (tag) => dispatch(syncTag(tag))
})
export default connect(null, mapDispatch)(Tags)