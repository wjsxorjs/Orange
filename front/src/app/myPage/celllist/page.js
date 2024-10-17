'use client'

import MyPageSide from "@/component/user/layout/MyPageSide";
import CellList from "@/component/user/myPage/cellList/CellList";
import { Backdrop, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import "/public/css/buylist.css";
import "/public/css/celllist.css";
import "/public/css/myPage.css";
import "/public/css/paging.css";

export default function page() {

  const [celllist, setCelllist] = useState([]);
  const [whatNow, setWhatNow] = useState('onSale');
  const [cellStatus, setCellStatus] = useState(1);
  const [cellNow, setCellNow] = useState(1);
  const [cellCounts, setCellCounts] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState({});
  
  const API_URL = '/user/api/cellList';

  // 서버 사이드에서 SearchParams를 사용하지 않도록 useEffect에서 처리
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const cellCategory = searchParams.get("cellCategory");

      if (cellCategory && ['onSale', 'Selling', 'Sold', 'Hidden'].includes(cellCategory)) {
        setWhatNow(cellCategory);
        setCellStatus(['onSale', 'Selling', 'Sold', 'Hidden'].indexOf(cellCategory) + 1);
      }
    }
    setLoading(true);
    getCellList(1);
  }, [whatNow]);

  function getCellList(cPage) {
    axios({
      url: API_URL,
      method: 'post',
      params: {
        userkey: Cookies.get("userkey"),
        cPage: cPage,
        poststatus: cellStatus,
        start_date: startDate,
        end_date: endDate,
      }
    }).then((res) => {
      setCelllist(res.data.celllist);
      setCellCounts([
        res.data.cell1Count,
        res.data.cell2Count,
        res.data.cell3Count,
        res.data.cell4Count,
      ]);
      setPage(res.data.page);

      setTotalCount(Math.min(res.data.totalCount, 100));
      setTotalRecord(Math.min(res.data.totalRecord, 100));
      setCellNow(cellStatus);
      setLoading(false);
    });
  }

  function updateCellList(cellCategory) {
    setWhatNow(cellCategory);
    setCellStatus(['onSale', 'Selling', 'Sold', 'Hidden'].indexOf(cellCategory) + 1);
  }

  function changePage(pNum) {
    setLoading(true);
    getCellList(pNum);
  }

  function dateButton(months) {
    let end_day = new Date();
    let start_day = new Date();
    start_day.setMonth(end_day.getMonth() - months);
    setEndDate(formatDate(end_day));
    setStartDate(formatDate(start_day));
  }

  function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const [loading, setLoading] = useState(false);

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
              <div data-v-0a67d0b5="" className="my_purchase">
                <div
                  data-v-6b53f901=""
                  data-v-0a67d0b5=""
                  className="content_title"
                >
                  <div data-v-6b53f901="" className="title">
                    <h3 data-v-6b53f901="">판매내역</h3>
                  </div>
                </div>
                <div
                  data-v-2cbb289b=""
                  data-v-0a67d0b5=""
                  className="purchase_list_tab sell detail_tab"
                >
                  <div data-v-2cbb289b="" onClick={()=>updateCellList('onSale')} className={`tab_item ${cellNow == 1 ? 'tab_on' : ''}`}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          판매중
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          {cellCounts[0] > 99 ? '99+' : cellCounts[0]}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" onClick={()=>updateCellList('Selling')} className={`tab_item ${cellNow == 2 ? 'tab_on' : ''}`}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          예약중
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                        {cellCounts[1] > 99 ? '99+' : cellCounts[1]}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" onClick={()=>updateCellList('Sold')} className={`tab_item ${cellNow == 3 ? 'tab_on' : ''}`}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          거래완료
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                        {cellCounts[2] > 99 ? '99+' : cellCounts[2]}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" onClick={()=>updateCellList('Hidden')} className={`tab_item ${cellNow == 4 ? 'tab_on' : ''}`}>
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          숨김
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                        {cellCounts[3] > 99 ? '99+' : cellCounts[3]}
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
                        onClick={()=>{setLoading(true);getCellList(1)}}
                      >
                        조회
                      </button>
                    </div>
                  </div>
                </div>
                <ul
                  data-v-a54c4c26=""
                  data-v-0a67d0b5=""
                  className="search_info"
                >
                  {(cellNow==1 || cellNow==2)  ? 
                  <li data-v-a54c4c26="" className="info_item">
                    <p data-v-a54c4c26="">
                      판매중(예약중) 조회 결과는 등록일 기준으로 노출됩니다.
                    </p>
                  </li>
                  : cellNow==3 ?
                  <li data-v-a54c4c26="" className="info_item">
                    <p data-v-a54c4c26="">
                      거래완료 조회 결과는 판매일 기준으로 노출됩니다.
                    </p>
                  </li>
                  :
                  <li data-v-a54c4c26="" className="info_item">
                    <p data-v-a54c4c26="">
                      숨김 조회 결과는 숨김일 기준으로 노출됩니다.
                    </p>
                  </li>
                  }
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
                        <TableCell colSpan={2}>
                          <span data-v-eff62a72="" className="status_txt">
                            판매 가격
                          </span>
                        </TableCell>
                        <TableCell colSpan={2}>
                          <span data-v-eff62a72="" className="status_txt">
                          { (cellNow==1 || cellNow==2) ? '등록일' :  cellNow == 3 ? '판매일' : '숨김일'} 
                          </span>
                        </TableCell>
                        {cellNow == 1 ?
                        <TableCell colSpan={2}>
                          <span data-v-eff62a72="" className="status_txt">
                            끌어올리기
                          </span>
                        </TableCell>
                        : ''}
                        {cellNow == 3 ?
                        <TableCell style={{textAlign:'center'}} colSpan={2}>
                          <span data-v-eff62a72="" className="status_txt">
                            후기
                          </span>
                        </TableCell>
                        : ''}
                        <TableCell colSpan={2} align="right">
                          <span data-v-eff62a72="" className="status_txt">
                          { cellNow==1 ? '수정' : cellNow==2 ? '확인' :  cellNow == 3 ? '상세 내역' : '숨김 해제'}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <CellList celllist={celllist} cellNow={cellNow}  getCellList={(cPage)=>{setLoading(true);getCellList(cPage)}} cPage={page.nowPage}/>
                    </TableBody>
                  </Table>
                </TableContainer>
                  
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
            {/* <!-- 여기까지 컨텐츠 --> */}
          </section>
        </div>
      </article>
    </>
  );
}
