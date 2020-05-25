import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Toast from 'src/componentCommon/toast'

export default ({visible, setVisible, createComment, getComment, id, parentId,reply}) => {
  const [value, setValue] = useState('');

  async function submitComment(){
    const createRes = await createComment({id,body:value,parentId,replyId:reply.id});
    if(createRes && createRes.success){
      Toast.success(createRes.data.message);
      setValue('')
      await getComment(id);
    }
  }

  return (
    <Collapse in={visible}>
      {reply.name ? <div className='reply-to-wrap'>回复 {reply.name } :</div> : ''}
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
      />
      <div className='comment-btns-wrap'>
        <Button size='small' variant="outlined" color="primary" onClick={() => setVisible(false)}>取消</Button>
        <Button size='small' variant="contained" color="primary" disableElevation disabled={!value} onClick={submitComment}>提交</Button>
      </div>
    </div>
    </Collapse>
  )
}