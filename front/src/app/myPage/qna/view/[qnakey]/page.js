"use client"
import Link from "next/link";
import "/public/css/myPage.css";
import "/public/css/qnaView.css";
import "/public/css/paging.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPageSide from "@/component/user/layout/MyPageSide";
import { useParams, useRouter } from "next/navigation";
import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

export default function () {
    const [qvo, setQvo] = useState([]);
    const listUrl = `/api/qna/getQuestion`;
    
    const params = useParams();
    const router = useRouter();

    function toList(){
        router.push("/myPage/qna");
    }

    // 페이지 변경시 모든 공지사항 로드
    function getData(qna_key) {  
      axios.get(listUrl, {
        params: {
          qnakey: qna_key,
        }
      })
      .then((res) => {
          setQvo(res.data.qvo);
          
      })
      .catch((error) => {
          console.error("데이터 로딩 오류:", error);  // 에러 콘솔에 출력
      });
    }


    useEffect(() => {
        getData(params.qnakey);
    }, []);



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
                            <MyPageSide pathname="/myPage/qna"/>
                            {/* 여기서부터 콘텐츠 */}
                            <div
                                data-v-81750584=""
                                data-v-0adb81cc=""
                                className="content_area my-page-content"
                                style={{ display: 'flex', flexDirection: 'column' }} // flex 설정
                            >
                                <div
                                    className="questionsTitle"
                                    style={{
                                        margin: '5px 0',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                    }}    
                                >
                                    나의 문의사항 상세
                                </div>
                                <div
                                    data-v-6b53f901=""
                                    data-v-81750584=""
                                    className="content_title border"
                                />
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell rowSpan={2} colSpan={1}>제목</TableCell>
                                                <TableCell rowSpan={2} style={{borderLeft: '1px solid #efefef'}} colSpan={2}>{qvo ? qvo.title : ''}</TableCell>
                                                <TableCell colSpan={1} style={{borderLeft: '1px solid #efefef'}}>작성일자</TableCell>
                                                <TableCell colSpan={2} style={{borderLeft: '1px solid #efefef'}}>{qvo ? qvo.create_dtm : ''}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={1} style={{borderLeft: '1px solid #efefef'}}>답변일자</TableCell>
                                                <TableCell colSpan={2} style={{borderLeft: '1px solid #efefef'}}>{qvo ? qvo.isanswered==1 ? qvo.answer_dtm : "-" : ''}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={1}>문의 내용</TableCell>
                                                <TableCell colSpan={5} style={{height:'200px', borderLeft: '1px solid #efefef'}} dangerouslySetInnerHTML={{__html:qvo ? qvo.content : ''}}></TableCell>
                                            </TableRow>
                                            {qvo ? qvo.isanswered==1 ?
                                                <TableRow>
                                                    <TableCell colSpan={1}>답변 내용</TableCell>
                                                    <TableCell colSpan={5} style={{height:'200px', borderLeft: '1px solid #efefef'}} dangerouslySetInnerHTML={{__html:qvo ? qvo.answer : ''}}></TableCell>
                                                </TableRow>
                                                :
                                                "" : ''
                                                    }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div style={{textAlign:'right'}}>
                                    <Button style={{
                                        width: '80px',
                                        backgroundColor:'#efefef',
                                        color:'#000000',
                                        marginTop: '10px',
                                    }}
                                    onClick={toList}
                                    >목록</Button>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </article>
        </div>
    )
}
