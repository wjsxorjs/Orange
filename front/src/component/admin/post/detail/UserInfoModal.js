'use client'

import { Avatar, Backdrop, Box, CircularProgress, Modal, Pagination } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'

export default function UserInfoModal(props) {
    const open = props.openUI;
    const handleClose = props.handleCloseUI;
    const userkey = props.userkey;

    const [ar, setAr] = useState({});
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [postcount, setPostCount] = useState([]);
    const [pagecount, setPageCount] = useState([]);
    const [p_list, setP_list] = useState([]);
    const [m_list, setM_list] = useState([]);
    const [l_list, setL_list] = useState([]);
    const [ub_list, setUb_list] = useState([]);
    const [b_list, setB_list] = useState([]);
    const [n_list, setN_list] = useState([]);
    const [a_list, setA_list] = useState([]);
    const [s_list, setS_list] = useState([]);
    const [w_list, setW_list] = useState([]);
    const [k_list, setK_list] = useState([]);
    const [tvo, setTvo] = useState([]);
    const [userReportCount,setUserReportCount] = useState(0);


    const [loading, setLoading] = useState(false);
    
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: '80vh',
    maxHeight: '80vh', // 최대 높이 설정 (뷰포트 높이의 80%)
    overflowY: 'auto',  // 세로 스크롤 추가
    bgcolor: 'background.paper',
    border: '2px solid #blue',
    boxShadow: 24,
    p: 4,
  };

  function getP_list(cPage){
    axios.get("/user/api/admin/getPost",{
    params:{
        userkey: userkey,
        cPage: cPage,
        postCount: postcount,
    }
    }).then((res)=>{
        setP_list(res.data.p_list);
    })
  }

  useEffect(()=>{
    if(open){
        setLoading(true);
        axios.get("/user/api/admin/userEdit", {
            params: {
              userkey: userkey,
            }
          }).then((res)=>{
            axios.get("/user/api/admin/getPost",{
            params:{
                userkey: userkey,
                cPage: 1,
                postCount: res.data.postcount,
            }
            }).then((result)=>{
                setAr(res.data.ar);
                setPw(res.data.ar.pw || "");
                setName(res.data.ar.name || "");
                setEmail(res.data.ar.email || "");
                setPhone(res.data.ar.phone || "");
                setPostCount(res.data.postcount || []);
                setPageCount(res.data.pagecount || []);
                setP_list(result.data.p_list);
                setM_list(res.data.ar.m_list || []);
                setL_list(res.data.ar.l_list || []);
                setUb_list(res.data.ar.ub_list || []);
                setB_list(res.data.ar.b_list || []);
                setN_list(res.data.ar.n_list || []);
                setA_list(res.data.ar.a_list || []);
                setS_list(res.data.ar.s_list || []);
                setW_list(res.data.ar.w_list || []);
                setK_list(res.data.ar.k_list || []);
                setTvo(res.data.ar.a_list.tvo || []);
                setUserReportCount(res.data.userReportCount);
                setLoading(false);
            })
          })
    }
  },[open])

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
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
    <div id="wrap">
            <style jsx>{`
                #wrap {
                margin: 0 auto;
                max-width: 1200px;
                }

                #container {
                margin: 0 auto;
                padding-left: 20px;
                }
            `}</style>

        <div id="content">
            
            <div className="section" id="QA_register2">
            <div className="mToggleBar eToggle selected" id="basic">
                <h2 className="eToggleTitle">기본 정보</h2>
            </div>
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <form id="editForm" name="editForm" action="#" method="post">
                    <table summary="회원 기본 정보">
                    <caption>회원 기본 정보</caption>
                    <colgroup>
                        <col className="product" />
                        <col style={{ width: "auto" }} />
                    </colgroup>
                    <tbody>
                        <tr>
                        <th scope="row">유저번호</th>
                        <td>
                            <span
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ width: "400px", display: "inline-block" }}
                            >
                            {ar.userkey || ""}
                            </span>
                        </td>

                        </tr>
                        <tr>
                        <th scope="row">회원 사진</th>
                        <td>
                            <img
                            src={ar.imgurl || "/path/to/default-image.jpg"}
                            alt="회원 사진"
                            style={{ width: "100px", height: "100px"}}
                            />
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">아이디</th>
                        <td>
                            <span
                            className="fText eMarketChecker"
                            style={{ width: "400px", display: "inline-block" }}
                            >
                            {ar.id || ""}
                            </span>
                        </td>
                        </tr>
                    
                        <tr>
                        <th scope="row">이름</th>
                        <td>
                            <input
                            type="text"
                            name="name"
                            className="fText eMarketChecker"
                            style={{ width: "150px" }}
                            value={name}
                            onChange={(e) => {
                                setNAME(e.target.value);
                            }}
                            />
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">매너온도</th>
                        <td>
                        <span
                            className="fText eMarketChecker"
                            style={{ width: "400px", display: "inline-block" }}
                        >
                            {ar.mannertemp || "0"} 도
                        </span>
                        </td>
                    
                        </tr>
                        <tr>
                        <th scope="row">신고수</th>
                        <td>
                        <span
                            className="fText eMarketChecker"
                            style={{ width: "400px", display: "inline-block" }}
                        >
                            {userReportCount || "0"} 
                        </span>
                        </td>
                    
                        </tr>
                        <tr>
                        <th scope="row">이메일</th>
                        <td>
                            <input
                            type="text"
                            name="email"
                            className="fText eMarketChecker"
                            style={{ width: "150px" }}
                            value={email}
                            onChange={(e) => {
                                setEMAIL(e.target.value);
                            }}
                            onBlur={() => {
                                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailPattern.test(email)) {
                                alert("올바른 이메일 주소를 입력하세요.");
                                setEMAIL("");
                                }
                            }}
                            />
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">전화번호</th>
                        <td>
                            <input
                            type="tel"
                            name="phone"
                            className="fText eMarketChecker"
                            style={{ width: "150px" }}
                            value={phone}
                            onChange={(e) => {
                                setPHONE(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                const charCode = e.which ? e.which : e.keyCode;
                                if (charCode < 48 || charCode > 57) {
                                e.preventDefault();
                                alert("숫자만 입력할 수 있습니다.");
                                }
                            }}
                            />
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">가입일</th>
                        <td>
                        <span
                            className="fText eMarketChecker"
                            style={{ width: "400px", display: "inline-block" }}
                        >
                            {ar.create_dtm || ""}
                        </span>
                        </td>
                    
                        </tr>
                        <tr>
                        <th scope="row">삭제일</th>
                        <td>
                            <span
                            className="fText eMarketChecker"
                            style={{ width: "400px", display: "inline-block" }}
                            >
                            {ar.del_dtm || ""}
                            </span>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </form>
                </div>
            </div>
            </div>

            <div className="mButton gCenter" style={{ marginBottom: "20px" }}>
            <a onClick={() => {editUser1(userkey); }} className="btnSubmit" id="eProductRegister">
                <span>회원수정</span>
            </a>
            <a
                onClick={() => {deleteUser(userkey); }}
                className="btnEm btnPreview"
                id="eProductRegister"
            >
                <span>회원탈퇴</span>
            </a>
            </div>

            {/* 게시글 정보 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="게시글 정보">
                    <caption>게시글 정보</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">게시글 번호</th>
                        <th scope="col">제목</th>
                    </tr>
                    </thead>
                    <tbody>
                    {p_list.length > 0 ? (
                        p_list.map((post, postkey) => (
                        <tr key={postkey}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {post.postkey || ""}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{textAlign: "center" }}
                            >
                            {post.title || ""}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            게시글이 없습니다.
                        </td>
                        </tr>
                    )}
                    <tr style={{border:'none'}}>
                        <td style={{border:'none', textAlign: '-webkit-center'}} colSpan={2}>
                            <Pagination sx={{width: 'fit-content'}} count={pagecount} onChange={(event, newPage) =>{getP_list(newPage);}}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            

            {/* 매너 평가 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="매너 평가 목록">
                    <caption>매너 평가 목록</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">평가자</th>
                        <th scope="col">매너</th>
                        <th scope="col">간편후기</th>
                    </tr>
                    </thead>
                    <tbody>
                    {m_list.length > 0 ? (
                        m_list.map((manner, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            <Box gap={2} display="flex" alignItems="center">
                            <Avatar
                                alt={manner?.uvo?.nickname || "Unknown"} 
                                src={manner?.uvo?.imgurl || "/default-avatar.png"} 
                                />
                                {manner?.uvo?.nickname || "Unknown"}
                                </Box>
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {manner.ismanner ? "좋음" : "나쁨"}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {manner.rvo.review || ""}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                            매너 평가가 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* 관심 사용자 목록 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="관심 사용자 목록">
                    <caption>관심 사용자 목록</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">사용자</th>
                        <th scope="col">생성 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {l_list.length > 0 ? (
                        l_list.map((likeUser, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            
                            <Box gap={2} display="flex" alignItems="center">
                            <Avatar 
                                alt={likeUser?.uvo?.nickname || "Unknown"} 
                                src={likeUser?.uvo?.imgurl || "/default-avatar.png"} 
                                />
                                {likeUser?.uvo?.nickname || "Unknown"}
                                </Box>
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {likeUser.create_dtm || ""}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            좋아요 사용자가 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* 사용자 뱃지 목록 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="사용자 뱃지 목록">
                    <caption>사용자 뱃지 목록</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">뱃지 번호</th>
                        <th scope="col">뱃지명</th>
                        <th scope="col">생성 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ub_list.length > 0 ? (
                        ub_list.map((badge, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {badge.badgekey || ""}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {badge.bvo.name || ""}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {badge.create_dtm || ""}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                            사용자 뱃지가 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* 차단 사용자 목록 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="차단 사용자 목록">
                    <caption>차단 사용자 목록</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">차단 사용자</th>
                        <th scope="col">차단 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {b_list.length > 0 ? (
                        b_list.map((blockedUser, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar
                                    alt={blockedUser.uvo?.nickname || "Unknown"}  // 사용자 닉네임
                                    src={blockedUser.uvo?.imgurl || "/default-avatar.png"}  // 사용자 아바타 이미지
                                />
                                {blockedUser.uvo?.nickname || "Unknown"}
                            </Box>
                            
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {blockedUser.create_dtm || ""}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            차단된 사용자가 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* 미노출 사용자 목록 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="게시글 미노출 사용자 목록">
                    <caption>게시글 미노출 사용자 목록</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">미노출 사용자</th>
                        <th scope="col">생성 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {n_list.length > 0 ? (
                        n_list.map((noseeUser, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar
                                    alt={noseeUser.uvo?.nickname || "Unknown"}  // 사용자 닉네임
                                    src={noseeUser.uvo?.imgurl || "/default-avatar.png"}  // 사용자 아바타 이미지
                                />
                                {noseeUser.uvo?.nickname || "Unknown"}
                                </Box>
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {noseeUser.create_dtm || ""}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            미노출 사용자가 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* 주소 정보 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="주소 정보">
                    <caption>주소 정보</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">주소 번호</th>
                        <th scope="col">대표도시</th>
                        <th scope="col">알림 여부</th>
                    </tr>
                    </thead>
                    <tbody>
                    {a_list.length > 0 ? (
                        a_list.map((address, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {address.addresskey || ""}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {address.tvo.region2 || ""}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {address.isalarm ===0 ? "예" : "아니오"}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                            주소 정보가 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* 알람 설정 정보 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="알람 설정 정보">
                    <caption>알람 설정 정보</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">알람 종류</th>
                        <th scope="col">알람 여부</th>
                    </tr>
                    </thead>
                    <tbody>
                    {s_list.length > 0 ? (
                        s_list.map((setAlarm, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {setAlarm.setalarmkey || ""}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {setAlarm.isalarm ? "예" : "아니오"}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            알람 설정 정보가 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* 관심 목록 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="관심 목록">
                    <caption>관심 목록</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">관심목록 번호</th>
                        <th scope="col">생성 날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {w_list.length > 0 ? (
                        w_list.map((wishlist, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {wishlist.wishlistkey || ""}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {wishlist.create_dtm || ""}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            관심 목록이 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            {/* 키워드 정보 테이블 */}
            <div className="section" id="QA_register2">
            
            <div className="toggleArea" style={{ display: "block" }}>
                <div className="mBoard typeProduct">
                <table summary="키워드 목록">
                    <caption>키워드 목록</caption>
                    <colgroup>
                    <col className="product" />
                    <col style={{ width: "auto" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">키워드 번호</th>
                        <th scope="col">키워드 내용</th>
                    </tr>
                    </thead>
                    <tbody>
                    {k_list.length > 0 ? (
                        k_list.map((keyword, index) => (
                        <tr key={index}>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {keyword.keywordkey || ""}
                            </td>
                            <td
                            className="fText eMarketChecker eHasModifyProductAuth"
                            style={{ textAlign: "center" }}
                            >
                            {keyword.content || ""}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                            키워드가 없습니다.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

            
        </div>
    </div>
    </Box>
  </Modal>
  )
}
