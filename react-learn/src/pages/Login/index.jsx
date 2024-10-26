import { Link } from "react-router-dom"
import Errors from "../../components/Errors"
import {useSelector,useDispatch} from "react-redux"
import {
  loginFileUpdate,
  loginSubmit,
  onUnload
} from "../../store/modules/loginSlice"
import request from "../../request"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"
const errors = "网络错误"
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {email,errors,password} = useSelector((state)=>{
    return state.login
  })
  const toNavigation = async (e)=>{
    e.preventDefault();
    try{
      let result = await request.user.login(email,password)
      dispatch(loginSubmit(result))
      if(result.status === 1){
        navigate("/")
      }
    }catch(error){
      dispatch(loginSubmit(error))
    }
  }
  useEffect(()=>{
    return ()=>{
      dispatch(onUnload())
    }
  },[])
  return (
    <div className='container page'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <h1>注册</h1>
          <p className='text-xs-center'>
            <Link to="/regist">
              没有账号前往注册？
            </Link>
          </p>
          <Errors errors={errors} />
          <form onSubmit={toNavigation}>
            <fieldset className='form-group'>
              <input
                className='form-control form-control-lg'
                type="text"
                placeholder='用户邮箱'
                value={email}
                onChange={(e)=>{
                  dispatch(loginFileUpdate({key:"email",value:e.target.value}))
                }}
              />
            </fieldset>
            <fieldset className='form-group'>
              <input
                className='form-control form-control-lg'
                type="password"
                placeholder='用户密码'
                value={password}
                onChange={(e)=>{
                  dispatch(loginFileUpdate({key:"password",value:e.target.value}))
                }}
              />
            </fieldset>
            <button
              className='btn btn-lg btn-primary pull-xs-right'
              type='submit'
            >
              登录
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}
export default Login