'use client'
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import Button from "@mui/joy/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "/public/css/buylistDetail.css";
import "/public/css/myPage.css";
import "/public/css/profile.css";

export default function CellDetail(props) {
    const open = props.open;
    const closeDetail = props.closeDetail;
    const postkey = props.postkey;

    
    const [pvo, setPvo] = useState({});
    const [price, setPrice] = useState('0원');
    const [lastprice, setLastprice] = useState('0원');
    const [deal_dtm, setDeal_dtm] = useState('');
    const [dealuserreview_dtm, setDealUserreview_dtm] = useState('');
    const [method, setMethod] = useState('일반 판매');
  
    const API_URL = "/api/adpost/detail";


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
  
          setDeal_dtm(getDateFormat(response.data.pvo.deal_dtm));
          if(response.data.pvo.dealuserreview != null){
            setDealUserreview_dtm(getDateFormat(response.data.pvo.dealuserreview_dtm));
          }
        });
      }

      useEffect(() => {
        if(props.postkey!=0){
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
          <DialogTitle
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
          >
            판매내역 상세
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
                        구매자 후기
                    </div>
                    <div class="reviewDtm">
                        <p className='dtmDesc'>작성일자</p>
                        <p className='dtmVal'>{pvo.dealuserreview != null ? dealuserreview_dtm : '-'}</p>
                    </div>
                    </div>
                    {
                    pvo.dealuserreview != null ?
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
                            <p className='userreview'>후기: {pvo.dealuserreview}</p>
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
                    구매자 후기가 없습니다
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
