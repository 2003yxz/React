import { Link } from "react-router-dom"
const ButtonInfo = (props) => {
  const { profile, isCurrentUser,follow,unfollow } = props
  const handleClick = (e) => {
    e.preventDefault();
    if(profile.following){
      unfollow(profile.username)
    }else{
      follow(profile.username)
    }
  }
  if (isCurrentUser) {
    return (
      <Link
        to={"/setting"}
        className="btn btn-outline-info">
        编辑 <i className="iconfont icon-zhuanchezhuanyongbeifen"></i>
      </Link>
    )
  } else {
    return (
      <button
        className={profile.following ? 'btn-secondary' : 'btn-outline-secondary'}
        onClick={handleClick}
      >
        <i className="iconfont icon-xihuan"></i>{" "}
        {
          profile.following ? "取消关注" : "添加关注"
        }
      </button>

    )
  }
}
export default ButtonInfo