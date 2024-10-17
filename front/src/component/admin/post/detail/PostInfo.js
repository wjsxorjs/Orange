'use client'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import PostInfoModal from "@/component/admin/post/detail/PostInfoModal";
import PostImg from "./PostImg";

export default function PostInfo(props) {

  
  const [open_pi, setOpen_pi] = useState(false);

  const handleOpen_pi = (len) => {
                                    if(len>0){
                                      setOpen_pi(true);
                                    } else{
                                      alert("끌어올리기 정보가 없습니다.");
                                    }
                                };
  const handleClose_pi = () => setOpen_pi(false);

  
  const pvo = props.pvo;
  const handleOpen = props.handleOpen;
  

  var method = "판매";
  var poststatus = "임시저장";
  var canbargain = "불가";
  var range = "가까운 동네";

  var isdeleted = "X";
  var iscellvisible = "X";
  var isbuyvisible = "X";

  const price = pvo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat('원');
  var lastprice = " - "
  if(pvo.lastprice != null){
    lastprice = pvo.lastprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat('원');
  } 
  if(pvo.method == 1){
    method = "나눔";
  }

  if(pvo.canbargain == 1){
    canbargain = "가능";
  }

  switch(pvo.poststatus){
    case 1:
      poststatus = "판매중";
      break;
    case 2:
      poststatus = "예약중(거래중)";
      break;
    case 3:
      poststatus = "거래완료";
      break;
    case 4:
      poststatus = "숨김";
      break;
  }

  switch(pvo.range){
    case 1:
      range = "조금 가까운 동네";
      break;
    case 2:
      range = "조금 먼 동네";
      break;
    case 3:
      range = "먼 동네";
      break;
  }

  if(pvo.isdeleted == 1){
    isdeleted = "O";
  }

  if(pvo.iscellvisible == 1){
    iscellvisible = "O";
  }
  if(pvo.isbuyvisible == 1){
    isbuyvisible = "O";
  }

  return (
    <>
    <TableContainer className="infoPart" component={Paper}>
      <Table className="detailInfoTable">
        <TableBody>
          <TableRow>
            <TableCell className="th">게시글 번호</TableCell>
            <TableCell className="th" colSpan={2}>제목</TableCell>
            <TableCell className="th">조회수</TableCell>
          </TableRow>
            <TableRow>
              <TableCell className="td">{pvo.postkey}</TableCell>
              <TableCell className="td" colSpan={2}>{pvo.title}</TableCell>
              <TableCell className="td">{pvo.viewqty}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="th">거래방식</TableCell>
              <TableCell className="th">흥정가능여부</TableCell>
              <TableCell className="th" colSpan={2}>게시글 상태</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="td">{method}</TableCell>
              <TableCell className="td">{canbargain}</TableCell>
              <TableCell className="td" colSpan={2}>{poststatus}</TableCell>
            </TableRow>
            {pvo.poststatus==3 ?
              <>
                <TableRow>
                  <TableCell className="th" colSpan={2}>거래완료자명</TableCell>
                  <TableCell className="th" colSpan={2}>거래완료일자</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="td" colSpan={2}>{pvo.duvo ? pvo.duvo.nickname : '-'}</TableCell>
                  <TableCell className="td" colSpan={2}>{pvo.deal_dtm ? pvo.deal_dtm : '-'}</TableCell>
                </TableRow>
              </>
             : ''}
        </TableBody>
      </Table>
      {pvo.pimg_list.length>0 ? 
      <>
        <Table className="detailInfoTable">
          <TableBody>
            <TableRow>
              <TableCell className="th">게시글 이미지</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TableContainer className="postimgRow">
          <Table className="detailInfoTable">
            <TableBody>
              <PostImg postimg={pvo.pimg_list} handleOpen={handleOpen} />
            </TableBody>
          </Table>
        </TableContainer>
      </>
      : '' }
      <Table className="detailInfoTable">
        <TableBody>
          <TableRow>
            <TableCell className="th">가격</TableCell>
            <TableCell className="th">거래가격</TableCell>
            <TableCell className="th">희망거래장소명</TableCell>
          </TableRow>
            <TableRow>
              <TableCell className="td">{price}</TableCell>
              <TableCell className="td">{lastprice}</TableCell>
              <TableCell className="td">{pvo.hope_place ? pvo.hope_place : '-'}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
      <Table className="detailInfoTable">
        <TableBody>
          <TableRow>
            <TableCell className="th">내용</TableCell>
            
          </TableRow>
            <TableRow>
              <TableCell className="td">{pvo.content}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
      <Table className="detailInfoTable">
        <TableBody>
            <TableRow>
              <TableCell className="th">생성일자</TableCell>
              <TableCell className="th">수정일자</TableCell>
              <TableCell className="th">끌올일자{pvo.pinfo_list.length>0?`(${pvo.pinfo_list.length}회)`:''}</TableCell>
              <TableCell className="th">삭제여부</TableCell>
              {pvo.isdeleted==1 ?
                <TableCell className="th">삭제일자</TableCell>
              : ''}
            </TableRow>
            <TableRow>
              <TableCell className="td">{pvo.poststatus!=0 ? pvo.create_dtm : "임시저장"}</TableCell>
              <TableCell className="td">{pvo.poststatus!=0 ? pvo.update_dtm : "임시저장"}</TableCell>
              <TableCell className="td" onClick={()=>handleOpen_pi(pvo.pinfo_list.length)} style={{cursor:"pointer"}}>{pvo.pinfo_list.length>0?pvo.remind_dtm:'-'}</TableCell>
              <TableCell className="td">{isdeleted}</TableCell>
            {pvo.isdeleted==1 ?
              <TableCell className="td">{pvo.delete_dtm}</TableCell>
             : ''}
            </TableRow>
        </TableBody>
      </Table>
      {pvo.poststatus==3 ?
              
      <Table className="detailInfoTable">
        <TableBody>
          <TableRow>
            <TableCell className="th" colSpan={3}>판매자</TableCell>
            <TableCell className="th" colSpan={3}>구매자</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="th" colSpan={2}>후기</TableCell>
            <TableCell className="th">작성일자</TableCell>
            <TableCell className="th" colSpan={2}>후기</TableCell>
            <TableCell className="th">작성일자</TableCell>
            
          </TableRow>
            <TableRow>
              <TableCell className="td" colSpan={2}>{pvo.userreview ? pvo.userreview : '-'}</TableCell>
              <TableCell className="td">{pvo.userreview_dtm ? pvo.userreview_dtm : '-' }</TableCell>
              <TableCell className="td" colSpan={2}>{pvo.dealuserreview ? pvo.dealuserreview : '-' }</TableCell>
              <TableCell className="td">{pvo.dealuserreview_dtm ? pvo.dealuserreview_dtm : '-' }</TableCell>
            </TableRow>
        </TableBody>
      </Table>
      : ''}
      <Table className="detailInfoTable">
        <TableBody>
          <TableRow>
            <TableCell className="th">판매내역보기여부</TableCell>
            <TableCell className="th">구매내역보기여부</TableCell>
          </TableRow>
            <TableRow>
              <TableCell className="td">{iscellvisible}</TableCell>
              <TableCell className="td">{isbuyvisible}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    
    <PostInfoModal open_pi={open_pi} handleClose_pi={handleClose_pi} postinfo={pvo.pinfo_list} />
    </>
  );
}