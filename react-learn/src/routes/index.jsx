import {lazy} from "react"
const Home = lazy(()=>import("../pages/Home"))
const Login = lazy(()=>import("../pages/Login"))
const Regist = lazy(()=>import("../pages/Regist"))
const ArticleNew = lazy(()=>import("../pages/ArticleNew"))
const Setting = lazy(()=>import("../pages/Setting"))
const Profile = lazy(()=>import("../pages/Profile"))
const Article = lazy(()=>import("../pages/Article"))
export default [
  {
    path:"/",
    element:<Home />
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/regist",
    element:<Regist />
  }
  ,
  {
    path:"/article/new",
    element:<ArticleNew />
  }
  ,
  {
    path:"/article/:slug",
    element:<Article />
  }
  ,
  {
    path:"/setting",
    element:<Setting />
  }
  ,
  {
    path:"/profile/:username",
    element:<Profile />
  }
]