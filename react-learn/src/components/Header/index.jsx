import React, { Component } from 'react'
import {Link} from "react-router-dom"
import Menu from "./menu"
const currentUser = {avatar:null}
class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          {/* 左侧的logo */}
          <Link to="/" className='navbar-brand'>
            BLOG-V1
          </Link>
          {/* 右侧 */}
          <Menu currentUser={currentUser}></Menu>
          <div className="iconfont icon-youhuiquan"></div>
        </div>
      </nav>
    )
  }
}
export default Header