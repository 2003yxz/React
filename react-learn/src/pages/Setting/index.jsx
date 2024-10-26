import Errors from "../../components/Errors"
import SettingForm from "./SettingForm"
import {useDispatch} from "react-redux"
import {userlogout} from "../../store/modules/settingSlice"
import {useNavigate} from "react-router-dom"
function Setting() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logout = ()=>{
    dispatch(userlogout())
    navigate("/login")
  }
  return (
    <div className='container page'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-xs-12'>
          <h1 className='text-xs-center'>设置</h1>

          <Errors errors={null} />

          <SettingForm />

          <button
            className='btn btn-outline-danger pull-xs-right'
            onClick={logout}
          >
            退出
          </button>
        </div>
      </div>
    </div>

  )
}
export default Setting