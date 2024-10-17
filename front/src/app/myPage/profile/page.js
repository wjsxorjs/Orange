'use client'

import MyPageSide from "@/component/user/layout/MyPageSide";
import BadgeList from "@/component/user/myPage/BadgeList";
import Manner from "@/component/user/myPage/Manner";
import Review from "@/component/user/myPage/Review";
import { Backdrop, Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "/public/css/buylist.css";
import "/public/css/myPage.css";
import "/public/css/paging.css";

export default function page() {
  const API_URL = "/user/api/getUserProfile";

  const [selectedTab, setSelectedTab] = useState('');
  const [whatNow, setWhatNow] = useState('manner');
  const [status, setStatus] = useState(1);
  const [badgeCount, setBadgeCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [mannerCount, setMannerCount] = useState(0);
  const [mannerTemp, setMannerTemp] = useState(36.5);
  const [vo, setVo] = useState({});
  const userkey = Cookies.get("userkey");

  const categoryList = ['manner','review', 'badge'];
  
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
  
      if (category == 'manner') {
      setSelectedTab('1');
      } else if (category == 'review') {
      setSelectedTab('2');
      } else if (category == 'badge') {
      setSelectedTab('3');
      }
  }

  function getData() {
    axios.get(
      API_URL, {
        params: { userkey: userkey }
      }
    ).then((res) => {
      setVo(res.data.uvo);
      setMannerTemp(res.data.uvo.mannertemp);
      setLoading(false);
    });
  }

  const tab = useSearchParams().get('tab') || 'manner'; // 기본 탭은 'manner'
  useEffect(() => {
    setLoading(true);
    if (typeof window !== "undefined") {
      updateList(tab);
    }
    axios.get("/api/user/manner/getManner", {
      params: { userkey: userkey }
    }).then((res) => {
      const totalCount = (res.data.m_ar || []).reduce((sum, item) => sum + item.count, 0);
      setMannerCount(totalCount);
    });
      axios.get("/api/user/allReview", { params: { userkey: userkey} })
    .then((res) => {
      if (reviewCount === 0) {
        setReviewCount(res.data.count);
      }
    });
      axios.get("/api/user/badge/getBadgeCount", { params: { userkey: userkey } })
    .then((res) => {
      setBadgeCount(res.data.count);
    });
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
                      마이 페이지
                    </font>
                  </span>
                </div>
              </Link>
            </div>
          </section>
        </div>
        <div className="my_home container my md _6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
            {/* <jsp:include page="/WEB-INF/views/user/myPageSub/myPageSide.jsp" /> */}
            <MyPageSide />
            {/* <!-- 여기서부터 콘텐츠 --> */}
            <div data-v-0a67d0b5="" data-v-0adb81cc="" className="content_area my-page-content">
              <div data-v-0a67d0b5="" className="my_purchase">
                <div data-v-6b53f901="" data-v-0a67d0b5="" className="content_title">
                  <div data-v-6b53f901="" className="title">
                    <h3 data-v-6b53f901="">프로필</h3>
                  </div>
                </div>
                <div data-v-ed683452="" data-v-7b7d73d2="" className="user_membership">
                  <div data-v-ed683452="" className="user_detail">
                    <div data-v-ed683452="" className="user_thumb">
                      <img data-v-ed683452=""
                      src={vo.imgurl}
                      alt="사용자 이미지" className="thumb_img"/>
                    </div>
                    <div data-v-ed683452="" className="user_info">
                      <div data-v-ed683452="" className="info_box">
                        <strong data-v-ed683452="" className="name">
                          {vo.nickname}
                        </strong>
                        <p data-v-ed683452="" className="email">
                          {vo.id} [ {vo.email} ]
                        </p>
                      </div>
                      <div data-v-ed683452="" className="info-buttons">
                        <Link data-v-420a5cda="" data-v-ed683452="" href="/myPage/profile/edit" className="btn btn outlinegrey small" type="button" >
                          {" "}
                          프로필 수정{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '60px' }}>
                  <LinearProgressWithLabel temp={ mannerTemp } />
                </div>
                <div data-v-2cbb289b="" data-v-0a67d0b5="" className="purchase_list_tab sell detail_tab" >     
                  <div data-v-2cbb289b="" onClick={() => updateList('manner')} className={`tab_item ${status == 1 ? 'tab_on' : ''}`} style={{ borderBottom: status == 1 ? '2px solid #FF9800' : '2px solid transparent' }}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title" style={{ color: status == 1 ? '#FF9800' : '#000' }}>
                          {mannerCount}
                        </dt>
                        <dd data-v-2cbb289b="" className="count" style={{ color: status == 1 ? '#FF9800' : '#000' }}>
                          받은 매너 평가
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" onClick={() => updateList('review')} className={`tab_item ${status == 2 ? 'tab_on' : ''}`} style={{ borderBottom: status == 2 ? '2px solid #FF9800' : '2px solid transparent' }}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title" style={{ color: status == 2 ? '#FF9800' : '#000' }}>
                          {reviewCount}
                        </dt>
                        <dd data-v-2cbb289b="" className="count" style={{ color: status == 2 ? '#FF9800' : '#000' }}>
                          받은 거래 후기
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" onClick={() => updateList('badge')} className={`tab_item ${status == 3 ? 'tab_on' : ''}`} style={{ borderBottom: status == 3 ? '2px solid #FF9800' : '2px solid transparent' }}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title" style={{ color: status == 3 ? '#FF9800' : '#000' }}>
                          {badgeCount}
                        </dt>
                        <dd data-v-2cbb289b="" className="count" style={{ color: status == 3 ? '#FF9800' : '#000' }}>
                          활동 배지
                        </dd>
                      </dl>
                    </Link>
                  </div>
                </div>
                <div data-v-eff62a72="" data-v-0a67d0b5="" className="purchase_list bidding ask">
                    <div data-v-24868902="" className="empty_area" style={{paddingTop: '50px'}}>
                      {selectedTab == '1' && <Manner userKey={userkey} onMannerCountChange={handleMannerCount} />}
                      {selectedTab == '2' && <Review userKey={userkey} onReviewCountChange={handleReviewCount}/>}
                      {selectedTab == '3' && <BadgeList userKey={userkey} onBadgeCountChange={handleBadgeCount}/>}
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
