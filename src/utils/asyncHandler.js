function onSuccess({ type, result }) {
}

function onError({ type, error }) {
  if(error.config && (error.config.url === '/auth-api/login'|| error.config.url === '/auth-api/login/sms-verify')){
    console.log(error.config )
    // message.error(error.response.data && (error.response.data.resultMsg || '服务端错误'))
  }else{
    if (error.response) {
      console.log(error.response.data && (error.response.data.message || error.response.data.resultMsg || '服务端错误'))
    } else {
      if (error.data) {
        console.log(error.data.message || '服务端错误')
      }else{
        console.log(error)
      }
    }
  }
}


export default {
  onSuccess,
  onError
}
