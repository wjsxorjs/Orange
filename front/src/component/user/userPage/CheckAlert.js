'use client'
import { Button } from '@mui/joy';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import * as React from 'react';
import { Fragment } from 'react';
import "/public/css/checkalert.css";

export default function CheckAlert(props) {
    const open = props.open;
    const handleClose = props.handleClose;

    const yourName = props.yourName;
    const tarFunc = props.tarFunc;
    const isLiked = props.isLiked;
    const isNosee = props.isNosee;
    const isBlocked = props.isBlocked;


  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={()=>{handleClose(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='checkAlert'
      >
        <DialogTitle className='title' id="alert-dialog-title">
          { tarFunc=='like' ? isLiked ? `${yourName}에 대한 관심을 해제하시겠습니까?`: `${yourName}에 대한 관심을 등록하시겠습니까?` :
            tarFunc=='nosee' ? isNosee ? `${yourName}에 대한 게시글 미노출을 해제하시겠습니까?`: `${yourName}의 게시글을 미노출 시키시겠습니까?` :
            /*tarFunc=='block' ?*/ isBlocked ? `${yourName}에 거셨던 차단을 해제하시겠습니까?`: `${yourName}를 차단하시겠습니까?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='content' id="alert-dialog-description">
            { tarFunc=='like' ? isLiked ? '해제할 경우 해당 유저로부터의 알림을 더 이상 받지 않게 됩니다.' : '등록할 경우 해당 유저가 상품을 등록할 경우 알림을 받게 됩니다.' :
              tarFunc=='nosee' ? isNosee ? '해제할 경우 해당 유저의 게시글이 다시 표시됩니다.' : '등록할 경우 해당 유저의 게시글이 표시되지 않습니다.' :
              /*tarFunc=='block' ?*/ isBlocked ? '해제할 경우 해당 유저의 게시글이 표시되며 해당 유저에게도 사용자님의 게시글이 표시됩니다.' : '등록할 경우 해당 유저의 게시글이 표시되지않으며 해당 유저 또한 사용자님의 게시글이 표시되지 않습니다.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='btn agreee' onClick={()=>handleClose(true)} autoFocus>{`${(tarFunc=='like' && isLiked || tarFunc=='nosee' && isNosee || tarFunc=='block' && isBlocked) ? '해제' : '등록'}`}</Button>
          <Button className='btn disagree' onClick={()=>handleClose(false)}>취소</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}