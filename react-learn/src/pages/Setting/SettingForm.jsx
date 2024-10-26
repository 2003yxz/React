import {useSelector,useDispatch} from "react-redux"
import {
  settingFileUpdate,
  userUpdate,
  onUnload
} from "../../store/modules/settingSlice"
import request from "../../request"
import {avatarUpdate} from "../../store/modules/loginSlice"
import { useEffect } from "react"
function SettingForm() {
  const {username,password,avatar,bio} = useSelector((state)=>{
    return state.setting
  })
  const dispatch = useDispatch();
  const settingUpdate = async (e)=>{
    e.preventDefault()
    try{
      let result = await request.user.update({username,password,avatar,bio})
      if(result.status === 1){
        dispatch(userUpdate(result))
        dispatch(avatarUpdate())
      }
    }catch(errors){
      dispatch(userUpdate(errors))
    }
  }
  useEffect(()=>{
    return ()=>{
      dispatch(onUnload())
    }
  },[])
  return (
    <form onSubmit={settingUpdate}>
      <fieldset className="form-group">
        <input
          className='form-control form-control-lg'
          type="text"
          placeholder='用户名称'
          disabled
          value={username}
          onChange = {(e)=>{
            dispatch(settingFileUpdate({
              key:"username",
              value:e.target.value
            }))
          }}
        />
      </fieldset>
      <fieldset className="form-group">
        <input
          className='form-control form-control-lg'
          type="text"
          placeholder='用户头像'
          value={avatar}
          onChange = {(e)=>{
            dispatch(settingFileUpdate({
              key:"avatar",
              value:e.target.value
            }))
          }}
        />
      </fieldset>
      <fieldset className="form-group">
        <textarea
          rows="8"
          className='form-control form-control-lg'
          placeholder='用户简介'
          value={bio}
          onChange = {(e)=>{
            dispatch(settingFileUpdate({
              key:"bio",
              value:e.target.value
            }))
          }}
        />
      </fieldset>
      <fieldset className="form-group">
        <input
          className='form-control form-control-lg'
          type="password"
          placeholder='用户密码'
          value={password}
          onChange = {(e)=>{
            dispatch(settingFileUpdate({
              key:"password",
              value:e.target.value
            }))
          }}
        />
      </fieldset>
      <button
        className='btn btn-outline-danger pull-xs-left'
        type="submit"
      >
        更新
      </button>
    </form>

  )
}
export default SettingForm