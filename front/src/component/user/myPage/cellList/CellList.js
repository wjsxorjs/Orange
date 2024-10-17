'use client'
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import { Button, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SellerReviewModal from "../../manner/SellerReviewModal";
import ReviewDetail from "../buylist/ReviewDetail";
import CellDetail from "./CellDetail";
import "/public/css/celllist.css";

export default function CellList(props) {
  const celllist = props.celllist;
  const cellNow = props.cellNow;
  const getCellList = props.getCellList;
  const cPage = props.cPage;

  const router = useRouter();

  function getLatestRemind(clvo) {
    var remindDate = clvo.remind_dtm ? clvo.remind_dtm : clvo.create_dtm;
    return remindDate;
  }
  function getRemainRemind(clvo) {
    var latestRemind = clvo.remind_dtm ? clvo.remind_dtm : clvo.create_dtm;
    var timeDiff = new Date() - new Date(latestRemind);
    const target_time = 24 * 60 * 60 * 1000;

    var flownHours = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff = timeDiff - flownHours * 1000 * 60 * 60;

    var flownMinutes = Math.floor(timeDiff / (1000 * 60));
    timeDiff = timeDiff - flownMinutes * 1000 * 60;

    var flownSeconds = Math.floor(timeDiff / 1000);

    var remainTimes =
      target_time -
      flownSeconds * 1000 -
      flownMinutes * 1000 * 60 -
      flownHours * 1000 * 60 * 60;

    const remainHours = Math.floor(remainTimes / (1000 * 60 * 60));
    remainTimes = remainTimes - remainHours * 1000 * 60 * 60;
    const remainMinutes = Math.floor(remainTimes / (1000 * 60));
    remainTimes = remainTimes - remainMinutes * 1000 * 60;
    const remainSeconds = Math.floor(remainTimes / 1000);

    var remindDate = `${remainHours}시간 ${remainMinutes}분 ${remainSeconds}초`;
    return remindDate;
  }


  const[open,setOpen] = useState(false);
  const[postkey,setPostkey] = useState(0);
  function openDetail(postkey){
    setPostkey(postkey);
    setOpen(true);
  }
  function closeDetail(){
    setOpen(false);
    setPostkey(0);
  }

  const[reportOpen,setReportOpen] = useState(false);
  function handleReportOpen(postkey){
    setPostkey(postkey);
    setReportOpen(true);
  }
  function handleReportClose(){
    setReportOpen(false);
    setPostkey(0);
  }

  const [rdOpen, setRdOpen] = useState(false);
  const [rdvo, setRdvo] = useState({});
  const [review, setReview] = useState("");
  function openRd(rdvo, review){
    setRdvo(rdvo);
    setReview(review);
    setRdOpen(true);
  }
  function closeRd(){
    setRdOpen(false);
    setReview("");
    setRdvo({});
  }



  function canRemindFunc(latestRemind) {
    var canRemind = true;
    const timeDiff = new Date() - new Date(latestRemind);
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    canRemind = daysDiff > 1.0;
    return canRemind;
  }

  function remindPost(postkey) {
    const API_URL = "/api/adpost/remind";
    axios({
      url: API_URL,
      method: "get",
      params: {
        postkey: postkey,
      },
    }).then((res) => {
      getCellList(cPage);
    });
  }

  function unhidPost(postkey) {
    const API_URL = "/api/adpost/unhid";
    axios({
      url: API_URL,
      method: "get",
      params: {
        postkey: postkey,
      },
    }).then((res) => {
      getCellList(cPage);
    });
  }

  return celllist.length>0 ? (
    <>
    {celllist.map((clvo, index) => {
      var price =
        clvo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
      var latestRemind = getLatestRemind(clvo);
      var remainRemind = getRemainRemind(clvo);
      var canRemind = canRemindFunc(latestRemind);
      const detailLink = `/myPage/celllist/detail/${clvo.postkey}`;
      return (
          <TableRow
          key={index}
            // onDoubleClick={()=>{router.push(`/post/detail?postkey=${clvo.postkey}`)}}
          >
            <TableCell colSpan={3}>
                <div style={{
                    display:'flex',
                    alignItems: 'center',
                  }}>
                  {clvo.pimg_list &&
                    clvo.pimg_list.length > 0 &&
                    clvo.pimg_list[0].imgurl != undefined ? (
                      <img
                        alt="product_image"
                        src={clvo.pimg_list[0].imgurl}
                        style={{
                          backgroundColor: "#ebf0f5",
                          width: "80px",
                          minWidth: "80px",
                          height: "80px",
                          borderRadius: 23,
                          overflow: 'hidden',
                          }}
                      />
                    ) : (
                      <ImageNotSupportedRoundedIcon
                        style={{
                          width: "80px", // 아이콘의 너비를 100%로 설정
                          height: "80px", // 아이콘의 높이를 100%로 설정
                          borderRadius: 23,
                          overflow: 'hidden',
                        }}
                      />
                    )}
                  <div style={{
                    display:'flex',
                    flexDirection: 'column',
                    marginLeft: '10px',
                    width:'60%'
                  }}>
                    <div style={{
                      marginBottom: '5px',
                      fontSize:'16px',
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      }}>{clvo.title}</div>
                    <div style={{
                      marginTop: '5px',
                      fontSize:'10px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      }}>{clvo.cvo.categoryname}</div>
                  </div>
                  </div>
              </TableCell>
                <TableCell colSpan={2} style={{ color: "#22222280"}}>
                    {price}
                </TableCell>
                <TableCell colSpan={2} style={{ color: "#22222280"}}>
                    {cellNow == "Hidden"
                      ? clvo.update_dtm.split(" ")[0]
                      : cellNow == 3
                        ? clvo.create_dtm.split(" ")[0]
                        : clvo.create_dtm.split(" ")[0]}
                </TableCell>
                {cellNow==1?
                <TableCell colSpan={2}>
                <div>
                  <div
                    className="division_btn_box"
                  >
                    <button
                      className="btn_action"
                      style={
                        canRemind
                          ? {
                              backgroundColor: "rgb(239, 98, 83)",
                            }
                          : {
                              backgroundColor: "rgb(100, 100, 100)",
                              cursor: "default",
                            }
                      }
                      onClick={
                        canRemind
                          ? (e) => {
                              remindPost(clvo.postkey);
                              e.preventDefault();
                            }
                          : (e) => {
                              remainRemind = getRemainRemind(clvo);
                              alert(
                                `가장 최근 끌어올리기로부터 1일(24시간)이 지나야 다시 끌어올리기를 하실 수 있습니다.\n남은 시간: [${remainRemind}]`
                              );
                              e.preventDefault();
                            }
                      }
                    >
                      <strong className="button_name">
                        끌어올리기
                      </strong>
                    </button>
                  </div>
                  <div style={{ fontSize: 10, marginTop:'5px' }}>
                    최근일자: <br />
                    {latestRemind.substring(0,latestRemind.lastIndexOf(':'))}
                  </div>
                </div>
                </TableCell>
                :
                ''  
                }
                { cellNow==3 ? 
                  <TableCell colSpan={2}
                  style={{color: "#22222280",
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                  >
                  <div style={{
                        display: 'flex',
                        flexDirection:'column',
                        textAlign:'center'
                        }}>
                    <Button variant="text" onClick={(e)=>{handleReportOpen(clvo.postkey);}} style={{fontWeight:'bold', minWidth:'80px', color:"#fff", backgroundColor:"#12dd21", margin:'2px 0'}}>후기 작성</Button>
                    {clvo.dealuserreview!=null ? 
                    <Button variant="text" onClick={(e)=>{openRd(clvo, clvo.dealuserreview);}} style={{fontWeight:'bold', minWidth:'80px', color:"#fff", backgroundColor:"#ff5f00", margin:'2px 0'}}>받은 후기</Button>
                    :
                    <Button disableTouchRipple onClick={(e)=>{alert("아직 판매자가 후기를 등록하지 않았습니다.");}} style={{fontWeight:'bold', minWidth:'80px', color:"#fff", backgroundColor:"#aaaaaa", margin:'2px 0', cursor:'default'}}>받은 후기</Button>
                    }
                  </div>
                  </TableCell>
                  :
                  ''
              }
                <TableCell colSpan={2} style={{textAlign:'right'}}>
                  {cellNow == 4 ? (
                    <Link
                      href="#"
                      onClick={() => {
                        unhidPost(clvo.postkey);
                      }}
                      className="last_item_txt text-lookup last_description display_paragraph action_named_action"
                      style={{ color: "#222222CC" }}
                    >
                      해제
                    </Link>
                  ) : cellNow == 3 ? (
                    <Link
                      href="#"
                      onClick={()=>{
                        openDetail(clvo.postkey);
                      }}
                      className="last_item_txt text-lookup last_description display_paragraph action_named_action"
                      style={{ color: "#222222CC" }}
                    >
                      확인
                    </Link>
                  ) : cellNow == 2 ? (
                    <Link
                      href={`/post/detail?postkey=${clvo.postkey}`}
                      className="last_item_txt text-lookup last_description display_paragraph action_named_action"
                      style={{ color: "#222222CC" }}
                    >
                      확인
                    </Link>
                  ) : (
                    <Link
                      href={`/post/detail?postkey=${clvo.postkey}&edit`}
                      className="last_item_txt text-lookup last_description display_paragraph action_named_action"
                      style={{ color: "#222222CC" }}
                    >
                      수정
                    </Link>
                  ) 
                }
                </TableCell>
          {/* <!-- 여기까지 FOREACH --> */}
        </TableRow>
      );
    })}
    <CellDetail open={open} closeDetail={closeDetail} postkey={postkey} />
    <SellerReviewModal reportOpen={reportOpen} handleReportClose={handleReportClose} postkey={postkey}/>
    <ReviewDetail rdOpen={rdOpen} closeRd={closeRd} rdvo={rdvo}  who="Seller"/>
    </>
  ) : (
    <TableRow data-v-24868902="" data-v-eff62a72="" className="empty_area">
      <TableCell colSpan={cellNow==1 ? 11 : 9} style={{textAlign:'center'}}>
        {/* <!-- 없을 경우 --> */}
        <p data-v-24868902="" className="desc">
          {cellNow==1 ? '판매중' :
          cellNow==2 ? '예약중' :
          cellNow==3 ? '거래완료' : "숨김"} 내역이 없습니다.
        </p>
        {cellNow==1 ?
        <Link
          data-v-420a5cda=""
          data-v-24868902=""
          href="/post"
          className="btn outlinegrey small"
        >
          {" "}
          SHOP 바로가기{" "}
        </Link>
        : ''}
        {/* <!--  --> */}
      </TableCell>
    </TableRow>
  );
}
