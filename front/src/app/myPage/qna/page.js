"use client"

import Link from "next/link";
import "/public/css/myPage.css";
import "/public/css/paging.css";
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import Cookies from "js-cookie";
import MyPageSide from "@/component/user/layout/MyPageSide";
import { Box, Button, TableHead } from "@mui/material";
import { useRouter } from "next/navigation";
import QnaModal from "@/component/user/customer/QnaModal";

export default function () {
    const [qnaOpen, setQnaOpen] = useState(false);

    const handleQnaOpen = (e) => {
      e.preventDefault(); // 링크의 기본 동작 방지
      setQnaOpen(true);
    };

    const handleQnaClose = () => {
      setQnaOpen(false);
      getData(nowPage);
    };
    
    const [q_ar, setQ_ar] = useState([]);
    const listUrl = `/api/qna/userAll`;
    const [nowPage, setNowPage] = useState(1);
    const [page, setPage] = useState({});
    const [title, setTitle] = useState("");  // title을 searchNotice 함수에서 사용
    const router = useRouter();

    function getData(cPage) {  
      axios.get(listUrl, {
        params: {
          cPage: cPage,
          userkey: Cookies.get("userkey"),
        }
      })
      .then((res) => {
          setQ_ar(res.data.q_list);
          setPage(res.data.page);
          setNowPage(res.data.nowPage);
      })
      .catch((error) => {
          console.error("데이터 로딩 오류:", error);  // 에러 콘솔에 출력
      });
    }

    function changePage(cPage) { 
      setNowPage(cPage); 
      if (title) {
        searchNotice(cPage.toString());  // cPage를 문자열로 변환
      } else {
        getData(cPage.toString());  // cPage를 문자열로 변환
      }
    }

    useEffect(() => {
        getData(nowPage);
    }, [nowPage]);

    return (
        <div>
            <article className="_1h4pbgy7wg _1h4pbgy7wz">
                <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
                    <section style={{ borderBottom: "1px solid #ebebeb" }}>
                        <div className="_588sy41z _588sy421 _588sy42q _588sy415q _588sy417e">
                            <nav className="iq86zf0">
                                <ol className="iq86zf1 _588sy42q _588sy415q">
                                    <li>
                                        <Link href="/">
                                            <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf3 iq86zf2 _588sy41n">
                                                홈
                                            </span>
                                        </Link>
                                        <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8">
                                            &gt;
                                        </span>
                                    </li>
                                </ol>
                            </nav>
                            <Link href="/myPage">
                                <span className="_588sy4192 _588sy41x _588sy41b2 _588sy43">
                                    마이페이지
                                </span>
                            </Link>
                        </div>
                        <Link href="/myPage/qna">
                            <div className="_1h4pbgy7dk _1h4pbgy7j7 _1h4pbgy7j0 _1h4pbgy7il _1h4pbgy7w0">
                                <h1 className="_1h4pbgy78o _1h4pbgy796 _1h4pbgy79g _1h4pbgy7ag _1h4pbgy7c8">
                                    문의사항
                                </h1>
                            </div>
                        </Link>
                    </section>
                </div>
                <div className="my_home container my md _6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
                    <article className="_1h4pbgy7wg _1h4pbgy7wz">
                        <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
                            <MyPageSide />
                            <div
                                data-v-81750584=""
                                data-v-0adb81cc=""
                                className="content_area my-page-content"
                                style={{ display: 'flex', flexDirection: 'column' }} // flex 설정
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '10px' }} >
                                  <div className="questionsTitle" style={{ margin: '5px 0', fontSize: '30px', fontWeight: 'bold', }}>
                                    나의 문의사항
                                  </div>
                                  <Button variant="contained" onClick={handleQnaOpen} sx={{ backgroundColor: '#FF8000',  color: 'white', '&:hover': { backgroundColor: '#e67300', }, }}>
                                    문의하기
                                  </Button>
                                  <QnaModal qnaOpen={qnaOpen} handleQnaClose={handleQnaClose} />
                                </Box>
                                {/* 테이블 */}
                                <div className="tableDiv">
                                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow
                                        sx={{ 
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            backgroundColor:"#d1d1d1",
                                            }}
                                        >
                                        <TableCell align="left" sx={{ width: '10%', textAlign:'center' }}>
                                            번호
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: '50%', textAlign:'center' }}>
                                            제목
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: '20%', textAlign:'center' }}>
                                            문의일자
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: '20%', textAlign:'center' }}>
                                            처리현황
                                        </TableCell>
                                        </TableRow>
                                    </TableHead>
                                  <TableBody>
                                      {q_ar && q_ar.length > 0 ? (
                                        q_ar.map((qvo, i) => {
                                            var status = "답변 대기중";
                                            const isAns = (qvo.isanswered==1);
                                            if(isAns){
                                                status="답변완료"
                                            }
                                            return(
                                          <TableRow
                                            key={i}
                                            className="questRow"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 },
                                                  cursor:'pointer',
                                                  '&:hover':{backgroundColor:"#f5f5f5"},
                                                }}
                                            onClick={()=>{ router.push(`/myPage/qna/view/${qvo.qnakey}`)}}
                                          >
                                                    <TableCell align="left" sx={{ width: '20%', textAlign:'center' }}>
                                                      {page.begin+i}
                                                    </TableCell>
                                                    <TableCell align="left" sx={{ width: '50%' }}>
                                                        {qvo.title}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ width: '20%' }}>
                                                        {qvo.create_dtm.substr(0,10)}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ width: '10%' }}>
                                                        {status}
                                                    </TableCell>
                                            </TableRow>
                                        )})
                                      ) : (
                                        <TableRow>
                                          <TableCell colSpan={4} align="center">
                                            검색된 게시글이 없습니다.
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                                <div className="mPaginate" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} >
                                  {page && page.startPage > 1 && (
                                    <a href="#" onClick={() => changePage(page.startPage - page.pagePerBlock)} className="prev">
                                      이전 {page.pagePerBlock}페이지
                                    </a>
                                  )}
                                  <ol style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                                    {page && Array.from({ length: page.endPage - page.startPage + 1 }, (_, i) => page.startPage + i).map((pNum) => (
                                      <li key={pNum} style={{ margin: '0 5px' }}>
                                        {page.nowPage === pNum ? (
                                          <strong title="현재페이지">{pNum}</strong>
                                        ) : (
                                          <a href="#" onClick={() => changePage(pNum)}>{pNum}</a>
                                        )}
                                      </li>
                                    ))}
                                  </ol>
                                  {page && page.endPage < page.totalPage && (
                                    <a href="#" onClick={() => changePage(page.endPage + 1)} className="next">
                                      다음 {page.pagePerBlock}페이지
                                    </a>
                                  )}
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </article>
        </div>
    )
}
