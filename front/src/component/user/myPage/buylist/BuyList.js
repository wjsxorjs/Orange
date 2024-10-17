'use client'
import Link from "next/link";
import React, { useState } from "react";
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import BuyDetail from "./BuyDetail";
import { Button, TableCell, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";
import BuyerReviewModal from "../../manner/BuyerReviewModal";
import ReviewDetail from "./ReviewDetail";


export default function BuyList(props) {
  const buylist = props.buylist;

  const router = useRouter();

  const[open,setOpen] = useState(false);
  const[postkey,setPostkey] = useState(0);
  const[selluserkey, setSelluserkey] = useState(0);
  function openDetail(postkey){
    setPostkey(postkey);
    setOpen(true);
  }
  function closeDetail(){
    setOpen(false);
    setPostkey(0);
  }

  const[reportOpen,setReportOpen] = useState(false);
  function handleReportOpen(postkey, selluserkey){
    setPostkey(postkey);
    setSelluserkey(selluserkey);
    setReportOpen(true);
  }
  function handleReportClose(){
    setReportOpen(false);
    setPostkey(0);
    setSelluserkey(0);
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


  return (
    <>
      {
      buylist.map((blvo, index) => {
        const lastprice =
        blvo.lastprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
        return (
          <TableRow
            key={index}
            // onDoubleClick={()=>{router.push(`/post/detail?postkey=${blvo.postkey}`);}}
            >
            
            <TableCell colSpan={3}>
                <div style={{
                    display:'flex',
                    alignItems: 'center',
                  }}>
                  {blvo.pimg_list &&
                    blvo.pimg_list.length > 0 &&
                    blvo.pimg_list[0].imgurl != undefined ? (
                      <img
                        alt="product_image"
                        src={blvo.pimg_list[0].imgurl}
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
                      }}>{blvo.title}</div>
                    <div style={{
                      marginTop: '5px',
                      fontSize:'10px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      }}>{blvo.cvo.categoryname}</div>
                  </div>
                  </div>
              </TableCell>
              <TableCell
                style={{color: "#22222280",
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                >
                  <div style={{
                        display: 'flex',
                        flexDirection:'column',}}>
                    <p>{lastprice}</p>
                    <p>({blvo.deal_dtm.split(" ")[0]})</p>
                  </div>
              </TableCell>
              <TableCell
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
                  <Button variant="text" onClick={(e)=>{handleReportOpen(blvo.postkey, blvo.userkey);}} style={{fontWeight:'bold', minWidth:'80px', color:"#fff", backgroundColor:"#12dd21", margin:'2px 0'}}>후기 작성</Button>
                  {blvo.userreview!=null ? 
                  <Button variant="text" onClick={(e)=>{openRd(blvo, blvo.userreview);}} style={{fontWeight:'bold', minWidth:'80px', color:"#fff", backgroundColor:"#ff5f00", margin:'2px 0'}}>받은 후기</Button>
                  :
                  <Button disableTouchRipple onClick={(e)=>{alert("아직 판매자가 후기를 등록하지 않았습니다.");}} style={{fontWeight:'bold', minWidth:'80px', color:"#fff", backgroundColor:"#aaaaaa", margin:'2px 0', cursor:'default'}}>받은 후기</Button>
                  }
                </div>
              </TableCell>
              <TableCell style={{textAlign:'right'}}>
                <Link
                  href="#"
                  onClick={()=>{
                    openDetail(blvo.postkey);
                  }}
                  className="last_item_txt text-lookup last_description display_paragraph action_named_action"
                  style={{ color: "#222222CC" }}
                >
                  확인
                </Link>
              </TableCell>
            {/* <!-- 여기까지 FOREACH --> */}
          </TableRow>
    );
  })
  }
      <BuyDetail open={open} closeDetail={closeDetail} postkey={postkey} />
      <BuyerReviewModal reportOpen={reportOpen} handleReportClose={handleReportClose} postkey={postkey} selluserkey={selluserkey}/>
      <ReviewDetail rdOpen={rdOpen} closeRd={closeRd} rdvo={rdvo}  who="Buyer"/>
    </>
  )
}
