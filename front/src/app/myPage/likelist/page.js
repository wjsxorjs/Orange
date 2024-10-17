'use client'

import MyPageSide from "@/component/user/layout/MyPageSide";
import React, { useEffect, useState } from "react";
import "/public/css/myPage.css";
import "/public/css/likelist.css";
import "/public/css/paging.css";
import Link from "next/link";
import axios from "axios";
import LikePost from "@/component/user/myPage/likelist/LikePost";
import LikeCategory from "@/component/user/myPage/likelist/LikeCategory";
import LikeKeyword from "@/component/user/myPage/likelist/LikeKeyword";
import Cookies from "js-cookie";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import PriceOfferModal from "@/component/user/post/detail/PriceOfferModal";
import AddLikeCateModal from "@/component/user/myPage/likelist/AddLikeCateModal";
import AddLikeKeyModal from "@/component/user/myPage/likelist/AddLikeKeyModal";

export default function Page() {

  const [likeWhat, setLikeWhat] = useState('post');
  const [likeList, setLikeList] = useState([]);
  const [whatNow, setWhatNow] = useState('post');
  const [totalCount, setTotalCount] = useState(0);
  const [display, setDisplay] = useState('게시글');
  const [page, setPage] = useState({});

  const API_URL = '/user/api/likeLists';
  const DEL_URL = '/api/adpost/delLike';

  const userkey = Cookies.get("userkey");


  const [loading, setLoading] = useState(false);

  const [openLC, setOpenLC] = useState(false);
  const [openLK, setOpenLK] = useState(false);

  const handleCloseLC = (e) => {
    setOpenLC(false);
    if(e){
      getLikeList(likeWhat,1);
    }
  }
  const handleCloseLK = (e) => {
    setOpenLK(false);
    if(e){
      getLikeList(likeWhat,1);
    }
  }

  function changePage(pNum) { 
    setLoading(true);
    getLikeList(likeWhat,pNum);
  }

  function getLikeList(likeWhat,cPage){
    setLikeList([]);
      axios({
        url: API_URL,
        method: "post",
        params: {
          "likewhat": likeWhat,
          "userkey": userkey,
          "cPage": cPage,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setLikeList(res.data.likeList);
        setWhatNow(likeWhat);
        setPage(res.data.page);
        setTotalCount(res.data.totalCount);
        setLoading(false);
      });
  }

  function likeCate(){
    setOpenLC(true);

  }
  
  function likeKey(){
    setOpenLK(true);
  }

  function getDelLike(likeWhat,likeKey){
      axios({
        url: DEL_URL,
        method: "post",
        params: {
          "likeWhat": likeWhat,
          "likeKey": likeKey,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if(res.data.result_delete > 0){
          alert("관심목록에서 삭제했습니다.");
          setLoading(true);
          getLikeList(likeWhat,page.nowPage);
        } else{
          alert("오류가 발생했습니다");
        }
      });
  }

  useEffect(()=>{
    setLoading(true);
    getLikeList(likeWhat);
    switch(likeWhat){
      case "post":
        setDisplay("게시글");
        break;
      case "category":
        setDisplay("카테고리");
        break;
      case "keyword":
        setDisplay("키워드");
        break;
    }
    
  },[likeWhat]);

  
   return(
    <>
      <article className="_1h4pbgy7wg _1h4pbgy7wz">
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section style={{ borderBottom: "1px solid #ebebeb" }} className="">
            <div className="_588sy41z _588sy421 _588sy42q _588sy415q _588sy417e">
              <nav className="iq86zf0">
                <ol className="iq86zf1 _588sy42q _588sy415q">
                  <li>
                    <a href="/">
                      <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf3 iq86zf2 _588sy41n">
                        <font style={{ verticalAlign: "inherit" }}>홈</font>
                      </span>
                    </a>
                    <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8">
                      <font style={{ verticalAlign: "inherit" }}> &gt;</font>
                    </span>
                  </li>
                </ol>
              </nav>
              <a href="/myPage">
                <div className="_588sy41z _588sy421 _588sy42q _588sy415q">
                  <span className="_588sy4192 _588sy41x _588sy41b2 _588sy43">
                    <font style={{ verticalAlign: "inherit" }}>
                      마이 페이지
                    </font>
                  </span>
                </div>
              </a>
            </div>
          </section>
        </div>
        <div className="my_home container my md _6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
            {/* <jsp:include page="/WEB-INF/views/user/myPageSub/myPageSide.jsp"/> */}
            <MyPageSide />
            {/* <!-- 여기서부터 콘텐츠 --> */}
            <AddLikeCateModal
              openPO={openLC}
              handleClosePO={handleCloseLC}
              likeList = {likeList}
            />
            <AddLikeKeyModal
              openPO={openLK}
              handleClosePO={handleCloseLK}
              likeList = {likeList}
            />
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
            <div
              data-v-81750584=""
              data-v-0adb81cc=""
              className="content_area my-page-content"
            >
              <div
                data-v-6b53f901=""
                data-v-81750584=""
                className="content_title border"
              >
                <div data-v-6b53f901="" className="title">
                  <h3 data-v-6b53f901="">관심목록</h3>
                </div>
              </div>
              <div
                data-v-09af5873=""
                data-v-81750584=""
                className="saved-chips-container"
              >
                <button data-v-09af5873="" onClick={()=>setLikeWhat('post')} className={likeWhat == 'post' ? "saved-chip active" : "saved-chip"}>
                  게시글
                </button>
                <button data-v-09af5873="" onClick={()=>setLikeWhat('category')} className={likeWhat == 'category' ? "saved-chip active" : "saved-chip"}>
                  카테고리
                </button>
                <button data-v-09af5873="" onClick={()=>setLikeWhat('keyword')} className={likeWhat == 'keyword' ? "saved-chip active" : "saved-chip"}>
                  키워드
                </button>
              </div>
              <div data-v-81750584="" className="saved-product">
                <div data-v-3d362ce8="">
                  { likeList.length == 0 ?
                  /* <!-- 없을 경우 --> */
                  <div data-v-3d362ce8="" className="content">
                    <div
                      data-v-24868902=""
                      data-v-eff62a72=""
                      className="empty_area"
                    >
                      <p data-v-24868902="" className="desc">
                        관심 {display}{display=="게시글"?'이':'가'} 없습니다.
                      </p>
                      {display=="게시글"?
                      <a
                        data-v-420a5cda=""
                        data-v-24868902=""
                        href="/post"
                        className="btn outlinegrey small"
                      >
                        {" "}
                        SHOP 바로가기{" "}
                      </a>
                      :
                      display=="카테고리"?
                      <div
                        data-v-420a5cda=""
                        data-v-24868902=""
                        variant="contained"
                        className="btn outlinegrey small"
                        onClick={likeCate}
                      >
                        {" "}
                        등록하기
                        {" "}
                      </div>
                      :
                      <div
                        data-v-420a5cda=""
                        data-v-24868902=""
                        variant="contained"
                        className="btn outlinegrey small"
                        onClick={likeKey}
                      >
                        {" "}
                        등록하기
                        {" "}
                      </div>
                      }
                    </div>
                  </div>
                  : /* 있을 경우 */
                  <div data-v-3d362ce8="" className="my_interest">
                    <div data-v-3d362ce8="" className="content-header">
                      <div data-v-3d362ce8="" className="total-rows" style={{fontSize:17}}>
                        전체 {totalCount}
                      </div>
                      {whatNow=="post" ? '':
                      whatNow=="category" ?
                      totalCount < 3 ?
                      <div
                        data-v-69f3b122=""
                        data-v-3d362ce8=""
                        className="filter_sorting"
                      >
                        <Button
                          variant="contained"
                          sx={{
                            fontSize:'18px',
                            backgroundColor:'#ee3e00',
                            ":hover" : {
                              backgroundColor: '#ff4f00'
                            }
                          }}
                          onClick={likeCate}
                        >
                          {" "}
                          등록하기
                          {" "}
                        </Button>
                      </div>
                      :
                      <div
                        data-v-69f3b122=""
                        data-v-3d362ce8=""
                        className="filter_sorting"
                      >
                        <Button
                          variant="contained"
                          disableRipple
                          onMouseOver={(e)=>{e.preventDefault()}}
                          sx={{
                            fontSize:'18px',
                            backgroundColor: '#efefef',
                            boxShadow: 'none',
                            ":hover" : {
                              display: 'block',
                              boxShadow: 'none',
                              background: '#efefef',
                              cursor: 'default',
                            }
                          }}
                          onClick={(e)=>{e.preventDefault; alert("관심 카테고리는 최대 3개까지 등록하실 수 있습니다.")}}
                        >
                          {" "}
                          등록하기
                          {" "}
                        </Button>
                      </div>
                      :
                      totalCount<10
                      ?
                      <div
                        data-v-69f3b122=""
                        data-v-3d362ce8=""
                        className="filter_sorting"
                      >
                        <Button
                          variant="contained"
                          sx={{
                            fontSize:'18px',
                            backgroundColor:'#ee3e00',
                            ":hover" : {
                              backgroundColor: '#ff4f00'
                            }
                          }}
                          onClick={likeKey}
                        >
                          {" "}
                          등록하기
                          {" "}
                        </Button>
                      </div>
                      :
                      <div
                        data-v-69f3b122=""
                        data-v-3d362ce8=""
                        className="filter_sorting"
                      >
                        <Button
                          variant="contained"
                          disableRipple
                          onMouseOver={(e)=>{e.preventDefault()}}
                          sx={{
                            fontSize:'18px',
                            backgroundColor: '#efefef',
                            boxShadow: 'none',
                            ":hover" : {
                              display: 'block',
                              boxShadow: 'none',
                              background: '#efefef',
                              cursor: 'default',
                            }
                          }}
                          onClick={(e)=>{e.preventDefault; alert("관심 키워드는 최대 10개까지 등록하실 수 있습니다.")}}
                        >
                          {" "}
                          등록하기
                          {" "}
                        </Button>
                      </div>
                      }
                    </div>
                    <ul
                      data-v-6aa963fd=""
                      data-v-3d362ce8=""
                      className="wish_list"
                    >
                      {/* ForEach로 돌리기 */}
                      { whatNow == 'post' ? <LikePost likelist={likeList} getDelLike={getDelLike}/> : whatNow == 'category' ? <LikeCategory likelist={likeList} getDelLike={getDelLike}/>: <LikeKeyword likelist={likeList} getDelLike={getDelLike}/>}
                    </ul>
                    {/* 페이징 시작*/}
                    <div className="mPaginate">
                      {page.startPage > 1 && (
                        <Link href="#" onClick={() => changePage(page.startPage - page.pagePerBlock)} className="prev">
                          이전 {page.pagePerBlock}페이지
                        </Link>
                      )}
                      <ol>
                        {Array.from({ length: page.endPage - page.startPage + 1 }, (_, i) => page.startPage + i).map((pNum) => (
                          <li key={pNum}>
                            {page.nowPage == pNum ? (
                              <strong title="현재페이지">{pNum}</strong>
                            ) : (
                              <Link href="#" onClick={() => changePage(pNum)}>{pNum}</Link>
                            )}
                          </li>
                        ))}
                      </ol>
                      {page.endPage < page.totalPage && (
                        <Link href="#" onClick={() => changePage(page.endPage + 1)} className="next">
                          다음 {page.pagePerBlock}페이지
                        </Link>
                      )}
                    </div>
                    {/* 페이징 끝*/}
                  </div>
                }
                </div>
              </div>
            </div>
            {/* 여기까지 컨텐츠 */}
          </section>
        </div>
      </article>
    </>
  );
}
