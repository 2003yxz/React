import { PureComponent } from "react"
import Banner from "./Banner"
import Tags from "./Tags"
import Main from "./Main"
import { connect } from "react-redux"
import {
  getTags
} from "../../store/modules/homeSlice"
class Home extends PureComponent {
  render() {
    console.log(this.props);
    
    return (
      <div className="home-page">
        {/* 上：banner  */}
        <Banner />

        {/* 下：左 文章列表 右边 标签 */}
        <div className="container page">
          {/* 标签 */}
          <div className="col-md-3">
            <div className="sidebar">
              <p>热门标签</p>
              <Tags tags={this.props.tags} />
            </div>
          </div>
          <div className="row">
            {/* 文章列表 */}
            文章列表
            <Main></Main>

          </div>
        </div>

      </div>
    )
  }
  componentDidMount() {
    this.props.getTags()
  }
}
const mapState = state => ({
  ...state.home
})
const mapDispatch = dispatch => ({
  getTags: () => dispatch(getTags())
})
export default connect(mapState, mapDispatch)(Home)