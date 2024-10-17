'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import "/public/css/buylist.css";
import "/public/css/myPage.css";
// import "/public/css/paging.css";
import axios from "axios";
import "/public/css/popcatelist.css";

import BadgeList from "@/component/user/myPage/BadgeList";
import Manner from "@/component/user/myPage/Manner";
import Review from "@/component/user/myPage/Review";
import UserCellList from "@/component/user/post/detail/UserCellList";
import DisapproveModal from "@/component/user/userPage/DisapproveModal";
import FHRBMenu from "@/component/user/userPage/FHRBMenu";
import PraiseModal from "@/component/user/userPage/PraiseModal";
import UserReport from "@/component/user/userPage/UserReport";
import { Backdrop, Box, Button, CircularProgress, LinearProgress, Typography } from '@mui/material';
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";


export default function page() {
  const API_URL = "/user/api/getUser";

  const [selectedTab, setSelectedTab] = useState('');
  const [whatNow, setWhatNow] = useState('cell');
  const [status, setStatus] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isNosee, setIsNosee] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [cellCount, setCellCount] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [mannerCount, setMannerCount] = useState(0);
  const [mannerTemp, setMannerTemp] = useState(36.5);
  const [vo, setVo] = useState({});
  const [cellList, setCellList] = useState([]);

  const [userkey, setUserkey] = useState(null);
  const params = useSearchParams();
  useEffect(() => {
    // 클라이언트에서만 실행되는 코드
    if (typeof window !== 'undefined') {
      setUserkey(params.get("userkey"));
    }
  }, []);

  const date_today = new Date();
  const date_end = yyyymmdd(date_today,0);
  const date_start = yyyymmdd(date_today,1);

  function yyyymmdd(date, month){
    var yyyy = date.getFullYear();
    var mm = date.getMonth()+(1-month);
    var dd = date.getDate();
    return yyyy+"-"+mm+"-"+dd;
  }

  

  const categoryList = ['cell','badge','manner','review'];
  
  const [canPoN, setCanPoN] = useState(false);
  const [limitpostkey, setLimitpostkey] = useState(0);
  const [lastpostkey, setLastpostkey] = useState(0);
  const [isnextexist, setIsnextexist] = useState(true);

  const [ifReport, setIfReport] = useState(false);
  const [praiseOpen, setPraiseOpen] = useState(false);
  const [disapproveOpen, setDisapproveOpen] = useState(false);


  function getCanPoN(){
    axios.get(
      "/user/userPage/canPoN", {
        params: { 
          userkey_me: Cookies.get("userkey"),
          userkey_you: params.get("userkey"),
          date_start: date_start,
          date_end: date_end,
         }
      }
    ).then((res) => {
      if(res.data.result>0){
        setCanPoN(true);
      }
    });
  }

  function showMorePost(){
    axios.get(
      "/user/userPage/getMorePost", {
        params: { 
          userkey: params.get("userkey"),
          limitpostkey: limitpostkey,
          lastpostkey: lastpostkey,
         }
      }
    ).then((res) => {
      setLastpostkey(res.data.lastpostkey);
      setCellList([...cellList,...res.data.cellList]);
      setIsnextexist(res.data.isnextexist);
    });
  }

  function openPraise(){
    if(Cookies.get("userkey")==undefined){
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    if(!canPoN){
      alert("최근 1개월 내에 중고거래 채팅을 한 사용자에게만 평가하실 수 있습니다.");
      return;
    }
    setPraiseOpen(true);
  }
  function openDisapprove(){
    if(Cookies.get("userkey")==undefined){
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    if(!canPoN){
      alert("최근 1개월 내에 중고거래 채팅을 한 사용자에게만 평가하실 수 있습니다.");
      return;
    }
    setDisapproveOpen(true);
  }



 
  const handleCellCount = (count) => {
    setCellCount(count);
  };

  const handleBadgeCount = (count) => {
    setBadgeCount(count);
  };

  const handleReviewCount = (count) => {
    setReviewCount(count);
  };

  const handleMannerCount = (count) => {
    setMannerCount(count);
  };

  function updateList(category){
      setWhatNow(category);
      setStatus(categoryList.indexOf(category)+1);
  
      if (category == 'cell') {
      setSelectedTab('1');
      } else if (category == 'badge') {
      setSelectedTab('2');
      } else if (category == 'manner') {
      setSelectedTab('3');
      } else if (category == 'review') {
      setSelectedTab('4');
      }
  }

  function getData() {
    axios.get(
      "/user/userPage/getData", {
        params: { userkey: params.get("userkey") }
      }
    ).then((res) => {
      console.log(res.data);
      setVo(res.data.uvo);
      setMannerTemp(res.data.uvo.mannertemp);
      setCellList(res.data.cellList);
      handleCellCount(res.data.cellCount);
      setLimitpostkey(res.data.limitpostkey);
      setLastpostkey(res.data.lastpostkey);
      setIsnextexist(res.data.isnextexist);
      setLoading(false);
    });
  }

  useEffect(() => {
    const me = Cookies.get("userkey");
    const you = params.get("userkey");
    if(me!=undefined){
        if(me == you){
            window.location.replace("/myPage");
        }
    }
    getCanPoN();
    axios.get("/user/api/FHRBCheck", {
      params: {
        me: me,
        you: you,
    }
    }).then((res) => {
        setIsLiked(res.data.isLiked);
        setIsNosee(res.data.isNosee);
        setIsBlocked(res.data.isBlocked);
    });
    updateList('cell');
    axios.get("/api/user/badge/getBadge", {
      params: { userkey: you }
  }).then((res) => {
    setBadgeCount((res.data.b_ar&&res.data.b_ar!=undefined)?res.data.b_ar.length:0);
  })
    axios.get("/api/user/manner/getManner", {
      params: { userkey: you }
    }).then((res) => {
      const totalCount = (res.data.m_ar || []).reduce((sum, item) => sum + item.count, 0);
      setMannerCount(totalCount);
    });
    axios.get("/api/user/allReview", { params: { userkey: you} 
    }).then((res) => {
      setReviewCount(res.data.count);
    });
    setLoading(true);
    getData();
  }, []);

  function getTemperatureEmoji(temp) {
    if (temp <= 15) {
      return '😟';
    } else if (temp <= 30) {
      return '😞';
    } else if (temp <= 45) {
      return '🙂'; 
    } else if (temp <= 60) {
      return '😊';
    } else if (temp <= 80) {
      return '😁';
    } else {
      return '😆';
    }
  }

  function getProgressColor(temp) {
    if (temp <= 15) {
      return '#555555';
    } else if (temp <= 30) {
      return '#58D3F7';
    } else if (temp <= 45) {
      return '#F2F5A9';
    } else if (temp <= 60) {
      return '#FFFF00';
    } else if (temp <= 80) {
      return 'orange';
    } else {
      return '#FF4000';
    }
  }

  function LinearProgressWithLabel({ temp }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', marginTop: '20px' }}>
        <Box sx={{ position: 'absolute', left: 0, top: -35, display: 'flex', alignItems: 'center' }}>
          <h3>매너 온도</h3>
        </Box>
        <Box sx={{ position: 'absolute', right: 0, top: -25, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`${temp}℃`}</Typography>
          <Typography variant="body2" sx={{ marginLeft: 0.2, fontSize: '1.2rem' }}>{getTemperatureEmoji(temp)}</Typography>
        </Box>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={temp} 
                          sx={{ '& .MuiLinearProgress-bar': { backgroundColor: getProgressColor(temp) }, '&.MuiLinearProgress-root': { backgroundColor: '#e0e0e0' } }}/>
        </Box>
      </Box>
    );
  }
  
  const [loading, setLoading] = useState(false);

  return (
    <>
      <article className="_1h4pbgy7wg _1h4pbgy7wz">
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
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section style={{ borderBottom: "1px solid #ebebeb" }} className="">
            <div className="_588sy41z _588sy421 _588sy42q _588sy415q _588sy417e">
              <nav className="iq86zf0">
                <ol className="iq86zf1 _588sy42q _588sy415q">
                  <li>
                    <Link href="/">
                      <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf3 iq86zf2 _588sy41n">
                        <font style={{ verticalAlign: "inherit" }}>홈</font>
                      </span>
                    </Link>
                    <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8">
                      <font style={{ verticalAlign: "inherit" }}> &gt;</font>
                    </span>
                  </li>
                </ol>
              </nav>
              <Link href="/myPage">
                <div className="_588sy41z _588sy421 _588sy42q _588sy415q">
                  <span className="_588sy4192 _588sy41x _588sy41b2 _588sy43">
                    <font style={{ verticalAlign: "inherit" }}>
                      유저 페이지
                    </font>
                  </span>
                </div>
              </Link>
            </div>
          </section>
        </div>
        <div className="my_home container my md _6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
            {/* <!-- 여기서부터 콘텐츠 --> */}
            <div data-v-0a67d0b5="" data-v-0adb81cc="" className="content_area my-page-content" style={{minWidth:600}}>
              <div data-v-0a67d0b5="" className="my_purchase">
                <div data-v-6b53f901="" data-v-0a67d0b5="" className="content_title">
                  <div data-v-6b53f901="" className="title">
                    <h3 data-v-6b53f901="">프로필</h3>
                  </div>
                </div>
                <div data-v-ed683452="" data-v-7b7d73d2="" className="user_membership UserPageShip">
                    <div className="UserProfileGrid">
                            <div data-v-ed683452="" className="user_detail UserPageDetail">
                                <div data-v-ed683452="" className="user_thumb">
                                    <img data-v-ed683452=""
                                        src={vo.imgurl}
                                        alt="사용자 이미지" className="thumb_img"/>
                                </div>
                                <div data-v-ed683452="" className="user_info">
                                    <div data-v-ed683452="" className="info_box" style={{width:'fit-content'}}>
                                        <strong data-v-ed683452="" className="name" style={{width:'fit-content'}}>
                                        {vo.nickname}
                                        </strong>
                                        <p data-v-ed683452="" className="email" style={{width:'fit-content'}}>
                                        {vo.id} [ {vo.email} ]
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="BtnPart">
                                <div className="PraiseOrNot">
                                    <button type="button" className="PraiseBtn" onClick={()=>{openPraise()}}>매너 평가</button>
                                    <button type="button" className="DisapproveBtn" onClick={()=>{openDisapprove()}}>비매너 평가</button>
                                </div>
                                <FHRBMenu yourName={vo.nickname} you={userkey} setIfReport={setIfReport} isLiked={isLiked}  setIsLiked={setIsLiked} isNosee={isNosee} setIsNosee={setIsNosee}  isBlocked={isBlocked} setIsBlocked={setIsBlocked} />
                                <UserReport ifReport={ifReport}  setIfReport={setIfReport} userkey={userkey} />
                                <PraiseModal praiseOpen={praiseOpen} setPraiseOpen={setPraiseOpen} userkey={userkey}/>
                                <DisapproveModal disapproveOpen={disapproveOpen} setDisapproveOpen={setDisapproveOpen} userkey={userkey}/>
                            </div>
                            <div className="mannerTemp">
                                <LinearProgressWithLabel temp={ mannerTemp } />
                            </div>
                    </div>
                </div>
                <div data-v-2cbb289b="" data-v-0a67d0b5="" className="purchase_list_tab sell detail_tab" >
                  <div data-v-2cbb289b="" onClick={()=>updateList('cell')} className={`tab_item ${status == 1 ? 'tab_on' : ''}`}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          {cellCount}
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          판매 목록
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" onClick={()=>updateList('badge')} className={`tab_item ${status == 2 ? 'tab_on' : ''}`}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          {badgeCount}
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          활동 배지
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" onClick={()=>updateList('manner')} className={`tab_item ${status == 3 ? 'tab_on' : ''}`}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                            {mannerCount}
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                            받은 매너 평가
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" onClick={()=>updateList('review')} className={`tab_item ${status == 4 ? 'tab_on' : ''}`}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                            {reviewCount}
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                            받은 거래 후기
                        </dd>
                      </dl>
                    </Link>
                  </div>
                </div>
                <div data-v-eff62a72="" data-v-0a67d0b5="" className="purchase_list bidding ask">
                    <div data-v-24868902="" data-v-eff62a72="" className={`empty_area ${selectedTab == '1' ? 'userPage' : ''}`} style={{paddingTop: '50px'}}>
                        {selectedTab == '1' && (
                            <p data-v-24868902="" className="desc">
                                {cellList.length > 0
                                ? 
                                <div className="UserPageGrid" >
                                  {cellList.map((clvo, index) => {
                                    return <UserCellList key={index} pvo={clvo} />;
                                })}
                                </div> : 
                                <div style={{
                                  width: 'fit-content',
                                  margin: '0 auto',
                                  fontSize: '27px'
                                }}>
                                    판매 내역이 존재하지 않습니다
                                </div>
                                }
                                {isnextexist ?
                                <Button
                                  variant="contained"
                                  style={{ width: "100%", marginTop: "15px" }}
                                  className="seed-box-button"
                                  data-size="medium"
                                  data-variant="secondary"
                                  onClick={showMorePost}
                                >
                                  더보기
                                </Button>
                                : ''}
                            </p>
                        )}
                        {selectedTab == '2' && ( <p data-v-24868902="" className="desc"><BadgeList userKey={userkey} onBadgeCountChange={handleBadgeCount}/></p>)}
                        {selectedTab == '3' && ( <p data-v-24868902="" className="desc"><Manner userKey={userkey} onMannerCountChange={handleMannerCount} /></p>)}
                        {selectedTab == '4' && ( <p data-v-24868902="" className="desc"><Review userKey={userkey} onReviewCountChange={handleReviewCount}/></p>)}
                    </div>
                </div>
              </div>
            </div>
            {/* <!-- 여기까지 컨텐츠 --> */}
          </section>
        </div>
      </article>
    </>
  );
}