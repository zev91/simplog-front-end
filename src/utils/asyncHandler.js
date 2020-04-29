
import Toast from 'src/componentCommon/toast'

function onSuccess({ type, result }) {
}

function onError({ type, error }) {
  if(window){
    if (error.response) {

      Toast.error(error.response.data && (error.response.data.message || error.response.data.resultMsg || '服务端错误'))
    } else {
      if (error.data) {
        Toast.error(error.data.message || '服务端错误')
        // console.log(error.data.message || '服务端错误')
      }else{
        Toast.error(error)
      }
    };
  }
  
}


export default {
  onSuccess,
  onError
}
