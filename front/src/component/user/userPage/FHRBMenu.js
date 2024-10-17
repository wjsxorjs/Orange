'use client'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import CheckAlert from './CheckAlert';

export default function FHRBMenu(props) {
  const [openCA, setOpenCA] = useState(false);
  const [tarFunc, setTarFunc] = useState('');

  function openCheckAlert(funct){
    setTarFunc(funct);
    setOpenCA(true);
  }

  const closeCA = (e) => {
    if(e){
      switch(tarFunc){
        case "like":
          likeItOrNot();
          break;
        case "nosee":
          noseeItOrNot();
          break;
        case "block":
          blockItOrNot();
          break;

      }
    }
    setOpenCA(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if(me==undefined){
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLiked = props.isLiked;
  const setIsLiked = props.setIsLiked ;

  const isNosee = props.isNosee;
  const setIsNosee = props.setIsNosee ;

  const isBlocked = props.isBlocked;
  const setIsBlocked = props.setIsBlocked ;

  const me = Cookies.get("userkey");
  const you = props.you;
  const yourName = props.yourName;
  const setIfReport = props.setIfReport;

  useEffect(()=>{
    setIsLiked(props.isLiked);
    setIsNosee(props.isNosee);
    setIsBlocked(props.isBlocked);
  },[])

  function likeItOrNot(){
    axios.get("/user/api/likeIoN", {
      params: {
        me: me,
        you: you,
        isLiked: isLiked,
    }
    }).then((res) => {
        setIsLiked(!isLiked);
    });
  }
  function noseeItOrNot(){

    axios.get("/user/api/noseeIoN", {
      params: {
        me: me,
        you: you,
        isNosee: isNosee,
    }
    }).then((res) => {
        setIsNosee(!isNosee);
    });
  }
  function blockItOrNot(){
    axios.get("/user/api/blockIoN", {
      params: {
        me: me,
        you: you,
        isBlocked: isBlocked,
    }
    }).then((res) => {
        setIsBlocked(!isBlocked);
    });
  }

  return (
    <div>
      <Button
        className="MenuBtn"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{openCheckAlert('like')}}>모아보기 {isLiked ? "해제" : "등록"}</MenuItem>
        <MenuItem onClick={()=>{openCheckAlert('nosee')}}>게시글 미노출 {isNosee ? "해제" : "등록"}</MenuItem>
        <MenuItem onClick={()=>{setIfReport(true);}}>사용자 신고</MenuItem>
        <MenuItem onClick={()=>{openCheckAlert('block')}}>사용자 차단 {isBlocked ? "해제" : ""}</MenuItem>
        <CheckAlert open={openCA} handleClose={closeCA} yourName={yourName} isLiked={isLiked} isNosee={isNosee} isBlocked={isBlocked} tarFunc={tarFunc}/>
      </Menu>
    </div>
  );
}