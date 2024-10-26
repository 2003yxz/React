import { Link } from "react-router-dom"
import Errors from "../../components/Errors"
import {useSelector,useDispatch} from "react-redux"
import {
  registSubmit,
  registFiledUpdate,
  onUnload
} from "../../store/modules/registSlice"
import request from "../../request"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react"
const errors = null;
const Regist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const toNavigation = async (e)=>{
    e.preventDefault()
    try{
      let result = await request.user.regist({email,username,password})
      if(result.status === 1){
        navigate("/login")
      }else{
        dispatch(registSubmit(result.message))
      }
    }catch(error){
      dispatch(registSubmit(error))
    }
  }
  const {email,errors,password,username} = useSelector((state)=>{
    return state.regist
  })
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
            <Link to="/login">
              有账号直接登录？
            </Link>
          </p>
          <Errors errors={errors}></Errors>
          <form 
            // onSubmit={(e)=>{
            //   e.preventDefault()
            //   dispatch(registSubmit({email,password,username}))
            // }}
            onSubmit={toNavigation}
          >
            <fieldset className='form-group'>
              <input
                className='form-control form-control-lg'
                type="text"
                placeholder='用户邮箱'
                value = {email}
                onChange = {(e)=>{
                  dispatch(registFiledUpdate({key:"email",value:e.target.value}))
                }}
              />
            </fieldset>
            <fieldset className='form-group'>
              <input
                className='form-control form-control-lg'
                type="text"
                placeholder='用户名称'
                value={username}
                onChange = {(e)=>{
                  dispatch(registFiledUpdate({key:"username",value:e.target.value}))
                }}
              />
            </fieldset>
            <fieldset className='form-group'>
              <input
                className='form-control form-control-lg'
                type="password"
                placeholder='用户密码'
                value={password}
                onChange = {(e)=>{
                  dispatch(registFiledUpdate({key:"password",value:e.target.value}))
                }}
              />
            </fieldset>
            <button
              className='btn btn-lg btn-primary pull-xs-right'
              type='submit'
            >
              注册
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Regist