'use client'
import React, { Fragment, useEffect, useState } from "react";
import {
    Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/joy/Button";
import axios from "axios";
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import "/public/css/myPage.css";
import "/public/css/profile.css";
import "/public/css/buylistDetail.css";

export default function BuyDetail(props) {
    const open = props.open;
    const closeDetail = props.closeDetail;
    const postkey = props.postkey;

    
    const [pvo, setPvo] = useState({});
    const [price, setPrice] = useState('0원');
    const [lastprice, setLastprice] = useState('0원');
    const [deal_dtm, setDeal_dtm] = useState('');
    const [userreview_dtm, setUserreview_dtm] = useState('');
    const [method, setMethod] = useState('일반 판매');
  
    const API_URL = "/api/adpost/detail";

    const [loading, setLoading] = useState(false);

    function getDateFormat(dtm){
        var yyyymmdd = dtm.split(" ")[0];
        var hhmmss = dtm.split(" ")[1];
        var yyyy = yyyymmdd.split("-")[0];
        var mM = yyyymmdd.split("-")[1];
        var dd = yyyymmdd.split("-")[2];
        var hh = hhmmss.split(":")[0];
        var mm = hhmmss.split(":")[1];
        var formatted_dtm = yyyy+"년 "+mM+"월 "+dd+"일  "+hh+"시 "+mm+"분";
        return formatted_dtm;
    }

    function getPostDetail() {
        axios({
          url: API_URL,
          method: "post",
          params: { postkey: props.postkey },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
            
          setPvo(response.data.pvo);
          var price = response.data.pvo.price;
          var lastprice = response.data.pvo.lastprice;
          price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+"원";
          setPrice(price);
          lastprice = lastprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+"원";
          setLastprice(lastprice);
          if(response.data.pvo.method == 1){
            useState('나눔');
          }
          setLoading(false);
          setDeal_dtm(getDateFormat(response.data.pvo.deal_dtm));
          if(response.data.pvo.userreview != null){
              setUserreview_dtm(getDateFormat(response.data.pvo.userreview_dtm));
          }
        });
      }

      useEffect(() => {
        if(props.postkey!=0){
            setLoading(true);
            getPostDetail();
        }
      }, [postkey]);


  return (
    <Fragment>
        <Dialog
          className="MODAL"
          open={open}
          onClose={closeDetail}
        >
        {loading && (
          <Backdrop
            open={loading}
            sx={(theme) => ({
              position: "fixed", // fixed로 설정하여 화면의 중앙에 배치
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center", // 수평 중앙 정렬
              alignItems: "center", // 수직 중앙 정렬
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: "rgba(0, 0, 0, 0.2)", // 배경 투명도
            })}
          >
            <CircularProgress size={100} color="inherit" />
          </Backdrop>
        )}
          <DialogTitle
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
          >
            구매내역 상세
          </DialogTitle>
            <DialogContent 
            >
            <div className='detailInfos'>
                <div className='detailInfoItem'>
                    <div className='detailInfoPost'>
                    <div className='detailInfoPostDesc'>
                        <div className='detailInfoPostDescImg'>
                        {pvo.pimg_list &&
                        pvo.pimg_list.length > 0 &&
                        pvo.pimg_list[0].imgurl != undefined ? (
                        <img
                            alt="product_image"
                            src={pvo.pimg_list[0].imgurl}
                            className="list_item_img"
                            style={{ backgroundColor: "#ebf0f5" }}
                            data-v-53e92c51=""
                        />
                        ) : (
                        <ImageNotSupportedRoundedIcon
                            style={{
                            width: "80px", // 아이콘의 너비를 100%로 설정
                            height: "80px", // 아이콘의 높이를 100%로 설정
                            }}
                        />
                        )}
                        </div>
                        <div className='detailInfoPostDescTxt'>
                        <p className='title'>{pvo.title}</p>
                        <p className='category'>{pvo.cvo ? pvo.cvo.categoryname : pvo.title}</p>
                        <p className='hope_place'>{pvo.hope_place}</p>
                        </div>
                    </div>
                    <div className='detailInfoPostEtc'>
                        <p className='method'>{method}</p>
                    </div>
                    </div>
                </div>
                <div className='detailInfoItem'>
                    <div className='detailInfoTransaction'>
                    <div className='transactionFinal'>
                        <div className='transactionDesc'>
                        <p>최초금액</p>
                        </div>
                        <div className='transactionPrice'>
                            <p className='price'>{price}</p>
                        </div>
                        <div className='transactionDesc'>
                        <p>최종금액</p>
                        </div>
                        <div className='transactionPrice'>
                            <p className='lastprice'>{lastprice}</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='detailInfoItem'>
                    <div class="reviewTitle">
                    <div class="title">
                        판매자 후기
                    </div>
                    <div class="reviewDtm">
                        <p className='dtmDesc'>작성일자</p>
                        <p className='dtmVal'>{pvo.userreview != null ? userreview_dtm : '-'}</p>
                    </div>
                    </div>
                    {
                    pvo.userreview != null ?
                    <div className='detailInfoSeller'>
                    <div className='SellerProfile'>
                        <div className='profiileImg'>
                        <img src={pvo.uvo ? pvo.uvo.imgurl : ''} style={{width: 50, marginTop: 10}}/>
                        </div>
                        <div className='profileDesc'>
                            <p className='nickname'>{pvo.uvo ? pvo.uvo.nickname : ''}</p>
                            <p className='userId'>@{pvo.uvo ? pvo.uvo.id : ''}</p>
                        </div>
                    </div>
                    <div className='SellerReview'>
                        <div class="reviewLeft">
                        <div className='userreviewtxt'>
                            <p className='userreview'>후기: {pvo.userreview}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    :
                    <div
                    style={{
                        textAlign: 'center',
                        padding: '30px',
                    }}>
                    판매자 후기가 없습니다
                    </div>
                    }
                </div>
                <div className='detailInfoItem'>
                    <div className='detailInfoTransaction'>
                    <div className='transactionFinal'>
                        <div className='transactionDesc'>
                        <p>거래일시</p>
                        </div>
                        <div className='transactionPrice'>
                            <p className='price'>{deal_dtm}</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      </Fragment>
  )
}
