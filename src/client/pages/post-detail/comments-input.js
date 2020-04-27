import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Toast from 'src/componentCommon/toast'

export default ({type, createComment, getComment,id}) => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  function handlerTextFocus (){
    setVisible(true)
  }

  async function submitComment(){
    const createRes = await createComment({id,body:value});
    if(createRes && createRes.success){
      Toast.success(createRes.data.message);
      setValue('')
      await getComment(id);
    }
  }

  function getClassName (){
    if(type !== 'post' ) return 'op-btns-wrap btns-visible';
    if(visible) return 'op-btns-wrap btns-visible';

    return 'op-btns-wrap';
  }

  return type === 'post' 
    ? 
    <div className='add-comments-content'>
      <TextField
        className='comment-input'
        rows={4}
        fullWidth
        multiline
        variant='outlined'
        placeholder='写下你的评论'
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={handlerTextFocus}
      />
      <Collapse in={getClassName() === 'op-btns-wrap btns-visible'}>

  
      <div className='comment-btns-wrap'>
        <Button size='small' variant="outlined" color="primary" onClick={() => setVisible(false)}>取消</Button>
        <Button size='small' variant="contained" color="primary" disableElevation disabled={!value} onClick={submitComment}>提交</Button>
      </div>
      </Collapse>
    </div>
    :
    ''
}

  