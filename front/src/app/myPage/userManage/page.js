'use client'
import MyPageSide from "@/component/user/layout/MyPageSide";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "/public/css/myPage.css";
import "/public/css/buylist.css";
import "/public/css/celllist.css";
import "/public/css/paging.css";

import UserList from "@/component/user/myPage/userList/UserList";
import Cookies from "js-cookie";


export default function page(props) {

    const [userlist, setUserlist] = useState([]);
    const [whatNow, setWhatNow] = useState(props.searchParams.category ? props.searchParams.category : 'likeUser');
    const [changeNow, setChangeNow] = useState('');
    const [userCounts, setUserCounts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalRecord, setTotalRecord] = useState(0);
    const [page, setPage] = useState({});
  
    const API_URL = '/user/api/lbiUsers';
    const userkey = Cookies.get("userkey");
  
    function changePage(pNum) { 
        getUserList(whatNow,pNum);
    }
  
    function getUserList(whatnow,cPage){
      setWhatNow(whatnow);
      axios({
        url: API_URL,
        method: 'post',
        params: {
            userkey: userkey,
            cPage: cPage,
            userType: whatnow,
        }
      }).then((res) => {
          // console.log(res.data);
          setUserlist(res.data.userlist);
          setUserCounts([res.data.user1Count,
                         res.data.user2Count,
                         res.data.user3Count])
          setPage(res.data.page);
  
          if(res.data.totalCount > 99){
            setTotalCount(100);
          } else {
            setTotalCount(res.data.totalCount);
          }
          if(res.data.totalRecord > 99){
            setTotalRecord(100);
          } else {
            setTotalRecord(res.data.totalRecord);
          }
          setChangeNow(whatnow);
        });
    }
  
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
    }
  
    function dateButton(months){
      let end_day = new Date();
      let start_day = new Date();
      start_day.setMonth(end_day.getMonth()-months);
      setEndDate(formatDate(end_day));
      setStartDate(formatDate(start_day));
    }
  
    useEffect(()=>{
        getUserList(props.searchParams.category, page.nowPage);
    },[props.searchParams.category]);
  
  
    return (
      <>
        <article className="_1h4pbgy7wg _1h4pbgy7wz">
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
              <div
                data-v-0a67d0b5=""
                data-v-0adb81cc=""
                className="content_area my-page-content"
              >
                <div data-v-0a67d0b5="" className="my_purchase">
                  <div
                    data-v-6b53f901=""
                    data-v-0a67d0b5=""
                    className="content_title"
                  >
                    <div data-v-6b53f901="" className="title">
                      <h3 data-v-6b53f901="">사용자 관리</h3>
                    </div>
                  </div>
                  <div
                    data-v-2cbb289b=""
                    data-v-0a67d0b5=""
                    className="purchase_list_tab sell detail_tab"
                  >
                    <div data-v-2cbb289b="" onClick={()=>getUserList('likeUser',1)} className={`tab_item ${changeNow == 'likeUser' ? 'tab_on' : ''}`}>
                      <Link data-v-2cbb289b="" href="#" className="tab_link">
                        <dl data-v-2cbb289b="" className="tab_box">
                          <dt data-v-2cbb289b="" className="title">
                            모아보기
                          </dt>
                          <dd data-v-2cbb289b="" className="count">
                            {userCounts[0] > 99 ? '99+' : userCounts[0]}
                          </dd>
                        </dl>
                      </Link>
                    </div>
                    <div data-v-2cbb289b="" onClick={()=>getUserList('blockedUser',1)} className={`tab_item ${changeNow == 'blockedUser' ? 'tab_on' : ''}`}>
                      <Link data-v-2cbb289b="" href="#" className="tab_link">
                        <dl data-v-2cbb289b="" className="tab_box">
                          <dt data-v-2cbb289b="" className="title">
                            차단
                          </dt>
                          <dd data-v-2cbb289b="" className="count">
                          {userCounts[1] > 99 ? '99+' : userCounts[1]}
                          </dd>
                        </dl>
                      </Link>
                    </div>
                    <div data-v-2cbb289b="" onClick={()=>getUserList('noseeUser',1)} className={`tab_item ${changeNow == 'noseeUser' ? 'tab_on' : ''}`}>
                      <Link data-v-2cbb289b="" href="#" className="tab_link">
                        <dl data-v-2cbb289b="" className="tab_box">
                          <dt data-v-2cbb289b="" className="title">
                            게시글 미노출
                          </dt>
                          <dd data-v-2cbb289b="" className="count">
                          {userCounts[2] > 99 ? '99+' : userCounts[2]}
                          </dd>
                        </dl>
                      </Link>
                    </div>
                  </div>
                  <div
                    data-v-eff62a72=""
                    data-v-0a67d0b5=""
                    className="purchase_list bidding ask"
                  >
                    <div data-v-eff62a72="" className="purchase_head">
                      <div data-v-eff62a72="" className="head_product">
                        <div data-v-eff62a72="" className="btn_filter">
                          {" "}
                          전체
                            <div style={{display:"inline-block", textAlign:'center', paddingLeft:10}}>
                              {totalRecord > 999 ? '999+' : totalRecord}
                            </div>
                            <div style={{display:"inline-block", position:'absolute', right:15}}>건</div>
                        </div>
                      </div>
                      <div data-v-eff62a72="" className="head_status">
                        <div
                          data-v-eff62a72=""
                          className="status_box field_date_purchased"
                        >
                          <Link
                            data-v-eff62a72=""
                            href="#"
                            className="status_link"
                          >
                            <span data-v-eff62a72="" className="status_txt">
                                등록일 
                            </span>
                          </Link>
                        </div>
                        <div
                          data-v-eff62a72=""
                          className="status_box field_status ascending"
                        >
                          <Link
                            data-v-eff62a72=""
                            className="status_link"
                            href="#"
                          >
                            <span data-v-eff62a72="" className="status_txt">
                            { changeNow=="likeUser" ? '모아보기 취소' :  changeNow == "blockedUser" ? '차단 해제' : '미노출 해제'}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <UserList userlist={userlist} changeNow={changeNow} getUserList={getUserList} cPage={page.nowPage}/>
                  {/* 페이징 시작*/}
                <div className="mPaginate">
                    {page.startPage > 1 && (
                      <Link href="#" onClick={() => {changePage(page.startPage - page.pagePerBlock)}} className="prev">
                        이전 {page.pagePerBlock}페이지
                      </Link>
                    )}
                    <ol>
                      {Array.from({ length: page.endPage - page.startPage + 1 }, (_, i) => page.startPage + i).map((pNum) => (
                        <li key={pNum}>
                          {page.nowPage == pNum ? (
                            <strong title="현재페이지">{pNum}</strong>
                          ) : (
                            <Link href="#" onClick={() => {changePage(pNum)}}>{pNum}</Link>
                          )}
                        </li>
                      ))}
                    </ol>
                    {page.endPage < page.totalPage && (
                      <Link href="#" onClick={() => {changePage(page.endPage + 1)}} className="next">
                        다음 {page.pagePerBlock}페이지
                      </Link>
                    )}
                  </div>
                  {/* 페이징 끝*/}
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
