'use client'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import UserInfoModal from "./UserInfoModal";

export default function UserInfo(props) {
  const uvo = props.uvo;
  const handleOpen = props.handleOpen;
  var isauthorized = "미인증";

  if(uvo.isauthorized == 1){
    isauthorized = "인증";
  }


  const [openUI, setOpenUI] = useState(false);
  function handleCloseUI(){
    setOpenUI(false);
  }

    return (
      <>
        <TableContainer className="infoPart" component={Paper}>
          <Table className="detailInfoTable">
            <TableBody>
              <TableRow>
                <TableCell className="td" onClick={()=>handleOpen(`${uvo.imgurl}`)} title="원본 이미지 보기" style={{textAlign: "center", cursor:"pointer"}} rowSpan={2} colSpan={5}><img title="원본 이미지 보기" src={`${uvo.imgurl}`} style={{width:100}} /></TableCell>
                <TableCell className="th" colSpan={1}>유저번호</TableCell>
                <TableCell className="th" colSpan={2}>아이디</TableCell>
                <TableCell className="th" colSpan={2}>닉네임</TableCell>
              </TableRow>
                <TableRow>
                  <TableCell className="td" colSpan={1}>{uvo.userkey}</TableCell>
                  <TableCell className="td" colSpan={2}>{uvo.id}</TableCell>
                  <TableCell className="td" colSpan={2} style={{cursor:"pointer"}} onClick={()=>{setOpenUI(true);}}>{uvo.nickname}</TableCell>
                </TableRow>
              <TableRow>
                <TableCell className="th" colSpan={2}>이름</TableCell>
                <TableCell className="th" colSpan={3}>연락처</TableCell>
                <TableCell className="th" colSpan={4}>이메일</TableCell>
                <TableCell className="th" colSpan={2}>본인인증여부</TableCell>
              </TableRow>
                <TableRow>
                  <TableCell className="td" colSpan={2}>{uvo.name}</TableCell>
                  <TableCell className="td" colSpan={3}>{uvo.phone}</TableCell>
                  <TableCell className="td" colSpan={4}>{uvo.email}</TableCell>
                  <TableCell className="td" colSpan={2}>{isauthorized}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <UserInfoModal openUI={openUI} handleCloseUI={handleCloseUI} userkey={uvo.userkey}/>
      </>
    );
  }
  