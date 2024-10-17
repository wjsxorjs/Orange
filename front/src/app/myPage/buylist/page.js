'use client'
import MyPageSide from "@/component/user/layout/MyPageSide";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "/public/css/myPage.css";
import "/public/css/buylist.css";
import "/public/css/paging.css";
import axios from "axios";
import BuyList from "@/component/user/myPage/buylist/BuyList";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Page() {

  const [buylist, setBuylist] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState({});

  const API_URL = '/user/api/buyList';
  const userkey = Cookies.get("userkey");

  const [loading, setLoading] = useState(false);

  function changePage(pNum) { 
    setLoading(true);
    getBuyList(pNum);
  }

  function getBuyList(cPage){
    axios({
      url: API_URL,
      method: 'post',
      params: {
          userkey: userkey,
          cPage: cPage,
          start_date: startDate,
          end_date: endDate,
      }
    }).then((res) => {
        setBuylist(res.data.buylist);
        setPage(res.data.page);
        if(res.data.totalCount > 999){
          setTotalCount(1000);
        } else {
          setTotalCount(res.data.totalCount);
        }
        if(res.data.totalRecord > 999){
          setTotalRecord(1000);
        } else {
          setTotalRecord(res.data.totalRecord);
        }
        setLoading(false);
        
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
    setLoading(true);
    getBuyList(1);
  },[]);


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
            <MyPageSide />
            
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
            {/* <!-- 여기서부터 콘텐츠 --> */}
            <div
              data-v-3b1b5d32=""
              data-v-0adb81cc=""
              className="content_area my-page-content"
            >
              <div data-v-3b1b5d32="" className="my_purchase">
                <div
                  data-v-6b53f901=""
                  data-v-3b1b5d32=""
                  className="content_title"
                >
                  <div data-v-6b53f901="" className="title">
                    <h3 data-v-6b53f901="">구매내역</h3>
                  </div>
                </div>
                <div
                  data-v-2cbb289b=""
                  data-v-3b1b5d32=""
                  className="purchase_list_tab detail_tab"
                >
                  <div data-v-2cbb289b="" className="tab_item tab_on">
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          거래완료
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          {totalCount > 999 ? '999+' : totalCount}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                </div>
                <div
                  data-v-77765e40=""
                  data-v-3b1b5d32=""
                  className="period_search"
                >
                  <div data-v-77765e40="" className="period_month">
                    <ul data-v-77765e40="" className="month_list">
                      <li data-v-77765e40="" className="month_item">
                        <Link
                          data-v-77765e40=""
                          href="#"
                          className="month_link"
                          onClick={()=>{dateButton(2)}}
                        >
                          최근 2개월
                        </Link>
                      </li>
                      <li data-v-77765e40="" className="month_item">
                        <Link
                          data-v-77765e40=""
                          href="#"
                          className="month_link"
                          onClick={()=>{dateButton(4)}}
                        >
                          4개월
                        </Link>
                      </li>
                      <li data-v-77765e40="" className="month_item">
                        <Link
                          data-v-77765e40=""
                          href="#"
                          className="month_link"
                          onClick={()=>{dateButton(6)}}
                        >
                          6개월
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div
                    data-v-14e5ae1c=""
                    data-v-77765e40=""
                    className="period_calendar_wrapper"
                  >
                    <div style={{ float: "left" }}>
                        <span
                          className="gLabel"
                          style={{ float: "left", marginLeft: "5px" }}
                        >
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="fText gDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          <span className="ec-mode-common-period-area">~</span>
                          <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="fText gDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </span>
                      </div>
                    <div data-v-14e5ae1c="" className="period_btn_box">
                      <button
                        data-v-14e5ae1c=""
                        className="btn_search is_active"
                        onClick={()=>{setLoading(true);getBuyList(1);}}
                      >
                        조회
                      </button>
                    </div>
                  </div>
                </div>
                <ul
                  data-v-a54c4c26=""
                  data-v-3b1b5d32=""
                  className="search_info"
                >
                  <li data-v-a54c4c26="" className="info_item">
                    <p data-v-a54c4c26="">
                      기간별 조회 결과는 구매일 기준으로 노출됩니다.
                    </p>
                  </li>
                </ul>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={3}>
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
                        </TableCell>
                        <TableCell>
                          <div style={{
                                display: 'flex',
                                flexDirection:'column',
                                }}>
                            <span data-v-eff62a72="" className="status_txt">
                              구매금액
                            </span>
                            <span data-v-eff62a72="" className="status_txt">
                              (구매일)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{textAlign:'center'}}>
                          후기
                        </TableCell>
                        <TableCell style={{textAlign:'right'}}>
                          <span data-v-eff62a72="" className="status_txt">
                            상세 내역
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    { buylist.length>0 ?
                      <BuyList buylist={buylist}/>
                      :
                      <TableRow>
                        <TableCell style={{textAlign:'center'}} colSpan={6}>
                          <p data-v-24868902="" className="desc">
                            구매 내역이 없습니다.
                          </p>
                          <Link
                            data-v-420a5cda=""
                            data-v-24868902=""
                            href="/post"
                            className="btn outlinegrey small"
                          >
                            {" "}
                            SHOP 바로가기{" "}
                          </Link>
                          </TableCell>
                        </TableRow>
                    }
                    </TableBody>
                  </Table>
                </TableContainer>
                <div
                  data-v-eff62a72=""
                  data-v-3b1b5d32=""
                  className="purchase_list bidding bid"
                >
                  
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
