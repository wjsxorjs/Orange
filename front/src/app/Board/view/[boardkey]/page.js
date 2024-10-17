'use client'
import { Button, Divider, Table, TableBody, TableRow } from '@mui/material'
import TableCell from '@mui/material/TableCell';
import React, { useEffect, useState } from 'react'
import "/public/css/myPage.css";
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from "next/link";
import BoardSide from "@/component/user/layout/BoardSide";
import Cookies from "js-cookie";

export default function page( props ) {

  const router = useRouter();  
  const [ar, setAr] = useState({});
  const boardkey = props?.params?.boardkey;

  const [cPage, setCPage] = useState(1);  // 초기값 설정
  const [categorykey, setCategorykey] = useState(null);
  const [bclist, setBclist] = useState([]); 
  const [viewqty, setViewqty] = useState(0);

  // 페이지가 클라이언트에서 렌더링된 후에 SearchParams 사용
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const categorykeyParam = searchParams.get('categorykey');
      const cPageParam = searchParams.get('cPage') || 1;

      setCategorykey(categorykeyParam);
      setCPage(cPageParam);
    }
  }, []);

  function updateViewqty(boardkey) {
    axios({
      url: "/api/admin/board/incHit",
      method: "get",
      params: {
        boardkey: boardkey,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.result > 0) {
        setViewqty(res.data.viewqty);
      }
    });
  }


  // 목록버튼 클릭 시 이전 페이지로 이동
  function handleGoBack() {
    if (categorykey) {
      router.push(`/Board/list/${categorykey}?cPage=${cPage}`);
    }
  }

  const API_URL = `/api/admin/board/getBbs?boardkey=${boardkey}`;
  function getData() {
    axios.get(API_URL).then((res) => {
        setAr(res.data.bvo); // 객체로 설정
    }).catch((error) => {
        //console.error("Error fetching data: ", error);
    });
  }

  useEffect(() => {
    incViewqty(boardkey);
    getData();
    getBcList();
  }, [boardkey]);

  // bclist 가져와서 BoardSide로 넘겨줄거임
  const bcUrl = "/api/admin/board/getAllBc";
  function getBcList() {  
    axios.get(bcUrl)
    .then((json) => { 
        setBclist(json.data.bc_list);
        const category = json.data.bc_list.find(bc => bc.key === categorykey);
    })
    .catch((error) => {
        //console.error("데이터 로딩 오류:", error);  
    });
  }

  function incViewqty(boardkey) {
    var userkey = Cookies.get("userkey");
    if (userkey == undefined) {
      userkey = 0;
    }
    var cookie = Cookies.get("viewedBoard");
    if (cookie != undefined) {
      if (cookie.includes(`/${userkey}`)) {
        // 유저가 있을 때
        var userCookieTmp = cookie.substring(cookie.indexOf(`/${userkey}`) + 1);
        var beforeCookie = cookie.substring(0, cookie.indexOf(`/${userkey}`));
        var userCookie = userCookieTmp;
        var afterCookie = "";
        if (userCookieTmp.indexOf("/") > 0) {
          userCookie = userCookieTmp.substring(0, userCookieTmp.indexOf("/"));
          afterCookie = userCookieTmp.substring(userCookieTmp.indexOf("/"));
        }
        if (!userCookie.includes(`[${boardkey}]`)) {
          // 새로운 페이지 일 때
          updateViewqty(boardkey);
          Cookies.remove("viewedBoard");
          Cookies.set("viewedBoard", `${beforeCookie}${userCookie}_[${boardkey}]${afterCookie}`, {
            expires: 1 / (24 * 60), // 1분
            // expires: 1, // 하루(24시간)
          });
        } // 이미 본 페이지 일 때는 다른 작업없음
      } else {
        // 새로운 유저
        updateViewqty(boardkey);
        Cookies.set("viewedBoard", `${cookie}/${userkey}_[${boardkey}]`, {
          expires: 1 / (24 * 60), // 1분
          // expires: 1, // 하루(24시간)
        });
      }
    } else {
      // 쿠키가 아예 없을 때
      updateViewqty(boardkey);
      Cookies.set("viewedBoard", `/${userkey}_[${boardkey}]`, {
        expires: 1 / (24 * 60), // 1분
        // expires: 1, // 하루(24시간)
      });
    }
  }

  return (
    <div>
        <article className="_1h4pbgy7wg _1h4pbgy7wz">
            <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
                <section style={{ borderBottom: "1px solid #ebebeb" }}>
                    <div className="_588sy41z _588sy421 _588sy42q _588sy415q _588sy417e">
                        <nav className="iq86zf0">
                            <ol className="iq86zf1 _588sy42q _588sy415q">
                                <li>
                                    <Link href="#">
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
                        <Link href="/Board/list/1">
                            <span className="_588sy4192 _588sy41x _588sy41b2 _588sy43">
                                쌍용소식
                            </span>
                        </Link>
                    </div>
                    <Link href="/Board/list/1">
                        <div className="_1h4pbgy7dk _1h4pbgy7j7 _1h4pbgy7j0 _1h4pbgy7il _1h4pbgy7w0">
                            <h1 className="_1h4pbgy78o _1h4pbgy796 _1h4pbgy79g _1h4pbgy7ag _1h4pbgy7c8">
                                쌍용소식
                            </h1>
                        </div>
                    </Link>
                </section>
            </div>
            <div className="my_home container my md _6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
                <article className="_1h4pbgy7wg _1h4pbgy7wz">
                    <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
                        
                        <div style={{ display: 'flex', alignItems: 'stretch' }}>
                            
                            <div style={{ flex: '1.5', marginRight: '20px', marginTop:'20px' }}>
                                <BoardSide bclist={bclist} categorykey={categorykey}/>
                            </div>
                           
                            <div style={{ flex: '8.5' }}>
                                {/* 테이블 */}
                                <div style={{ flex: '1' }} className="tableDiv">
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableBody>
                                            <TableRow
                                            key={ar.boardkey}  
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left" sx={{ 
                                                        width: '15%', 
                                                        fontWeight: 'bold', 
                                                        fontSize: '1.3rem',  
                                                        marginTop:'0px',
                                                    }}>
                                                    {ar.categorykey == 1 ? '공지사항' : '이벤트'}
                                                </TableCell>
                                                <TableCell align="left" sx={{ width: '70%' }}>
                                                    <div>{ar.create_dtm}</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{ar.title}</div> {/* 제목 굵게 */}
                                                </TableCell>
                                                <TableCell align="left" sx={{ width: '15%' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={{ fontWeight: 'bold' }}>조회수</div>
                                                        <div>{ar.viewqty}</div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow
                                                key={ar.boardkey + "_content"}  
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left" colSpan={2} sx={{ width: '100%', padding: '20px 16px' }}>
                                                    <div dangerouslySetInnerHTML={{ __html: ar.content }} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                
                                {/* 목록이동 버튼을 테이블 아래에 배치 */}
                                <Divider></Divider>
                                <div style={{ textAlign: 'right', marginTop: '20px' }}>
                                    
                                  <Button 
                                    variant="contained" 
                                    onClick={handleGoBack}
                                    style={{ backgroundColor: '#FF6F0F' }}  
                                  >
                                    목록
                                  </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </article>
    </div>
  )
}
