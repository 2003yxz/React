import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProfile, followResult } from "../../store/modules/profileSlice"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import request from "../../request"
import ButtonInfo from "./ButtonInfo"
import { articleAuthorResult } from "../../store/modules/articlesSlice"
import Articles from "../Articles"
const Profile = () => {
  const articlesSlice = useSelector((state) => {
    return state.articlesSlice
  }, shallowEqual)
  const {articles,currentPage,count} = articlesSlice
  const getAuthorResult = () => {
    request.article.getAuthor(username, 1).then(res => {
      if (res.status === 1) {
        dispatch(articleAuthorResult(res.data))
      }
    })
  }
  const getArticleByFavorite = () => {
    request.article.getFavorite(username, 1).then(res => {
      if (res.status === 1) {
        dispatch(articleAuthorResult(res.data))
      }
    })
  }


  const { username } = useParams()
  const profile = useSelector((state) => {
    return state.profile
  }, shallowEqual)
  const dispatch = useDispatch()
  const getUserInfo = () => {
    request.user.get(username).then(res => {
      if (res.status === 1) {
        dispatch(getProfile(res.data))
      } else {
        dispatch(getProfile(res.message))
      }
    })
  }
  const currentUser = useSelector((state) => {
    return state.login.currentUser
  }, shallowEqual)
  const isCurrentUser = currentUser && currentUser.username === profile.username
  useEffect(() => {
    getUserInfo()
    getAuthorResult()
    if (username && username !== profile.username) {
      getUserInfo()
      getAuthorResult()
    }
    return () => {
      if (username && username !== profile.username) {
        getUserInfo()
        getAuthorResult()
      }
    }
  }, [username, profile.username])
  let [tab, setTab] = useState(1)
  const follow = async (username) => {
    try {
      const result = await request.user.follow(username)
      dispatch(followResult(result.data))
    } catch (error) {
      dispatch(followResult(error))
    }
  }
  const unfollow = async (username) => {
    try {
      const result = await request.user.unfollow(username)
      dispatch(followResult(result.data))
    } catch (error) {
      dispatch(followResult(error))
    }
  }
  return (
    <div className='profile-page'>
      {/* 1 用户信息 */}
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              {/* 1.1 用户基本：头像 用户名 简介 */}
              <img src={profile.avatar || "http://localhost:8000/default.png"} style={{ width: 100, height: 100 }} alt="" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              {/* 1.2 用户行为：自己页面 编辑设置； 不是自己页面 关注/取消关注 */}
              <ButtonInfo
                isCurrentUser={isCurrentUser}
                profile={profile}
                follow={follow}
                unfollow={unfollow}
              ></ButtonInfo>
            </div>
          </div>
        </div>
      </div>

      {/* 用户文章 : 用户自己的文章  / 用户喜欢的文章*/}
      <div className='container'>
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            {/* 选项卡 */}
            <div className='aticles-toggle'>
              <ul className="nav nav-pills outline-active">
                <li className='nav-item'>
                  <button className={tab === 1 ? "nav-link active" : "nav-link"}
                    onClick={
                      () => {
                        setTab(1)
                        getAuthorResult()
                      }
                    }>我的文章</button>
                </li>
                <li className='nav-item'>
                  <button className={tab === 2 ? "nav-link active" : "nav-link"}
                    onClick={
                      () => {
                        setTab(2)
                        getArticlesByFavorite()
                      }
                    }>关注作者的文章</button>
                </li>
              </ul>
            </div>

            {/* 文章列表 */}
            <Articles
              articles={articles}
              count={count}
              currentPage={currentPage}
              isShowPage={true}
            ></Articles>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile