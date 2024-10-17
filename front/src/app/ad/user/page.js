"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import "/public/css/admin/user.css";
import Link from "next/link";
import axios from "axios";
import PageContainer from "@/component/admin/container/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import PostDetail from "@/component/admin/post/detail/PostDetail";
import {
  Avatar,
  Box,
  Backdrop,
  CircularProgress,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Top_Analytic from "@/component/admin/dashboard/Top_Analytic";
import DashboardCard from "@/component/admin/shared/DashboardCard";
import { useRouter } from "next/navigation";

export default function Page() {
  //유저 카운트
  const API_URL = "/user/api/usercount";
  const [count, setCount] = useState({});
  const [del, setDel] = useState(0);
  const [act, setAct] = useState(0);
  //const [tCount, setTCount] = useState({});
  const [tDel, setTDel] = useState(0);
  const [tAct, setTAct] = useState(0);

  const [search_type, setSearch_type] = useState("name");
  const [type, setType] = useState("");
  const [regist_start_date, setRegist_start_date] = useState("");
  const [regist_end_date, setRegist_end_date] = useState("");
  const [isdeleted, setIsdeleted] = useState("");
  const [isauthorized, setIsauthorized] = useState("");
  const [recent_login_start_date, setRecent_login_start_date] = useState("");
  const [recent_login_end_date, setRecent_login_end_date] = useState("");
  const [userReportCount,setUserReportCount] = useState(0);

  //유저 검색
  const API_URL_2 = "/user/api/search_user_admin";
  const [userlist, setUserlist] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  //페이징
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState({});
  const router = useRouter();
  //체크한 유저 삭제
  const DEL_URL = "/user/api/admin/checkUserDel";
  const [allChecked, setAllChecked] = useState(false); // 전체 선택 체크박스
  const [checkedItems, setCheckedItems] = useState([]); // 개별 체크박스

  // 전체 선택 체크박스
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked); // 전체 선택 상태 업데이트
    if (checked) {
      // 전체 선택 시, 모든 유저의 키를 checkedItems에 추가
      const allCheckedItems = userlist.map((item) => item.userkey);
      setCheckedItems(allCheckedItems);
    } else {
      // 전체 선택 해제
      setCheckedItems([]);
    }
  };

  // 개별 체크박스 핸들러
  const handleRowCheck = (e, userkey) => {
    const checked = e.target.checked;
    let updatedCheckedItems = [...checkedItems];
    if (checked) {
      // 체크 시 해당 유저의 키를 checkedItems에 추가
      updatedCheckedItems.push(userkey);
    } else {
      // 체크 해제 시 유저의 키 checkedItems에서 제거
      updatedCheckedItems = updatedCheckedItems.filter(
        (key) => key !== userkey
      );
    }
    setCheckedItems(updatedCheckedItems);
    // 모든 유저가 선택되었는지 확인> 전체 선택 상태 업데이트
    setAllChecked(updatedCheckedItems.length === userlist.length);
  };

  // 페이지 로드 시 Count
  useEffect(() => {
    getCount();
    //doSrchFrm(0);
  }, []);

  function getCount() {
    axios.get(API_URL).then((response) => {
      setCount(response.data.ucvo);
      setDel(response.data.ucvo.cntDel);
      setAct(response.data.ucvo.cntNotDel);
      setTAct(response.data.ucvo.cntTNotDel);
      setTDel(response.data.ucvo.cntTDel);
    });
  }
  // 페이징 처리 함수
  function changePage(newPage) {
    doSrchFrm(newPage);
  }

  function doSrchFrm(cPage) {
    let now = cPage;
    setLoading(true);
    axios({
      url: `${API_URL_2}?cPage=${cPage}`,
      method: "post",
      params: {
        search_type: search_type,
        type: type,
        regist_start_date: regist_start_date,
        regist_end_date: regist_end_date,
        isdeleted: isdeleted,
        recent_login_start_date: recent_login_start_date,
        recent_login_end_date: recent_login_end_date,
        isauthorized: isauthorized,
      },
    })
      .then((response) => {
        setLoading(false);
        setUserlist(response.data.ar);
        setTotalPage(response.data.totalPage);
        setTotalRecords(response.data.totalRecord);
        setPage(response.data.page);
      })
      .catch((error) => {
        //console.error("Error during search:", error);
      });
  }

  function delete_choice() {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmed) {
      return; 
    }
    //console.log("delete_choice 함수 호출됨");
    //console.log("DEL_URL:", DEL_URL);
    axios
      .post(DEL_URL, checkedItems)
      .then((response) => {
        alert("회원 탈퇴가 완료되었습니다.");
        // 체크박스 선택 해제
        setCheckedItems([]); // 개별 체크박스 해제
        setAllChecked(false); // 전체 선택 체크박스 해제
        doSrchFrm(0);
        getCount();
      })
      .catch((error) => {
        //console.error("Error deleting users:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });
  }

  // 모달 열기/닫기 핸들러
  const handleOpen = (userkey) => {
    setUserkey(userkey); 
    setOpen(true); 
  };
  const handleClose = () => setOpen(false);
 
  const [userkey, setUserkey] = useState(0);
  const [ar, setAR] = useState({});
  const [pw, setPW] = useState("");
  const [name, setNAME] = useState("");
  const [email, setEMAIL] = useState("");
  const [phone, setPHONE] = useState("");

  const [p_list, setP_list] = useState([]);
  const [m_list, setM_list] = useState([]);
  const [l_list, setL_list] = useState([]);
  const [ub_list, setUb_list] = useState([]);
  const [b_list, setB_list] = useState([]);
  const [n_list, setN_list] = useState([]);
  const [a_list, setA_list] = useState([]);
  const [w_list, setW_list] = useState([]);
  const [k_list, setK_list] = useState([]);
  const [tvo, setTvo] = useState([]);

  
  const [postcount, setPostCount] = useState([]);
  const [pagecount, setPageCount] = useState([]);
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



  function editUser(userkey){
    setLoading(true);
    setUserkey(userkey);
    

    if (userkey) {
      
      const API_URL = `/user/api/admin/userEdit?userkey=${userkey}`;
      axios.get(API_URL).then((res) => {
        setAR(res.data.ar);
        setPW(res.data.ar.pw || "");
        setNAME(res.data.ar.name || "");
        setEMAIL(res.data.ar.email || "");
        setPHONE(res.data.ar.phone || "");

        setP_list(res.data.ar.p_list || []);
        setM_list(res.data.ar.m_list || []);
        setL_list(res.data.ar.l_list || []);
        setUb_list(res.data.ar.ub_list || []);
        setB_list(res.data.ar.b_list || []);
        setN_list(res.data.ar.n_list || []);
        setA_list(res.data.ar.a_list || []);
        setW_list(res.data.ar.w_list || []);
        setK_list(res.data.ar.k_list || []);
        setTvo(res.data.ar.a_list.tvo || []);
        setUserReportCount(res.data.userReportCount);

        setPostCount(res.data.postcount || []);
        setPageCount(res.data.pagecount || []);
        axios.get("/user/api/admin/getPost",{
          params:{
              userkey: userkey,
              cPage: 1,
              postCount: res.data.postcount,
          }
          }).then((result)=>{
              setP_list(result.data.p_list);
              setLoading(false);
              setOpen(true); 
          })
      });
    }
  }

  //모달창 딜유저
  const DEL_URL1 = `/user/api/admin/userDel?userkey=${userkey}`;
  function deleteUser(userkey) {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmed) {
      return; 
    }
    axios.get(DEL_URL1).then((res) => {
      if (res.data.str === "success") {
        const userConfirmed = window.confirm(
          "회원 탈퇴가 완료되었습니다. 페이지를 이동하시겠습니까?"
        );
        if (userConfirmed) {
          router.push("/admin/ad/user");
          setOpen(false);
        } else {
          alert("탈퇴가 불가능 합니다.");
        }
      }
    });
  }
  function editUser1(userkey) {
    //console.log("User data being sent:", { pw, name, email, phone });
    //console.log("userkey@@@@@@@@@"+userkey);
    const EDIT_URL = `/user/api/admin/userEditReal?userkey=${userkey}`;
    axios({
      url: EDIT_URL,
      method: "post",
      params: {
        pw: pw,
        name: name,
        email: email,
        phone: phone,
      },
    }).then((res) => {
      if (res.data.str === "success") {
        alert("회원정보가 수정되었습니다.");
        const userConfirmed = window.confirm(
          "회원 수정이 완료되었습니다. 페이지를 이동하시겠습니까?"
        );
        if (userConfirmed) {
          setOpen(false);
          router.push("/ad/user");
          
        }
      } else {
        alert("수정이 불가능 합니다.");
      }
    });
  }

  //포스트 모달
  //모달창
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    maxHeight: '80vh', // 최대 높이 설정 (뷰포트 높이의 80%)
    overflowY: 'auto',  // 세로 스크롤 추가
    bgcolor: 'background.paper',
    border: '2px solid #blue',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 

  const [openPD, setOpenPD] = useState(false); // openPD 상태 정의
  const [pdkey, setPdkey] = useState("0"); // pdkey 상태 정의


  function openPostDetail(postkey) {
    // 해당 게시글의 상세 정보를 API로 불러옵니다.
    axios({
      url: `/api/user/api/postDetail`, // 게시글 상세 정보 API URL
      method: "get",
      params: { postkey: postkey },
    })
      .then((response) => {
        setSelectedPost(response.data); // 게시글 정보 상태에 저장
        setPdkey(postkey); // 선택된 게시글 키 상태에 저장
        setOpenPD(true); // 모달 열기
      });
  }

  // 게시글 상세 모달 닫기 함수
  function openPostDetail(postkey) {
    setPdkey(postkey);  // 클릭한 게시글의 postkey 설정
    setOpenPD(true);    // 모달 열기
  }

  const closePostDetail = () => {
    setOpenPD(false); // 모달을 닫음
  };
  
  // 프로그레스 띄우기용
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState([]);


  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
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
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="stretch"
          style={{ marginBottom: "50px" }}
        >
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">사용자 현황</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Top_Analytic
              title="전체 회원"
              count={count.cntAll}
              extra={count.cntTAll}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Top_Analytic
              title="회원"
              count={act}
              extra={tAct}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Top_Analytic
              title="탈퇴회원"
              count={del}
              isLoss
              color="warning"
              extra={tDel}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="stretch"
          style={{ marginBottom: "50px" }}
        >
          {/* 타이틀 */}
          <Grid item xs={12} sx={{ mb: 0.3 }}>
            <Typography variant="h5">사용자 조회</Typography>
          </Grid>

          {/* 검색 폼 */}
          <Grid item xs={12}>
            <DashboardCard>
              <form name="mform" method="post" action="/search_user_admin">
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {/* 개인정보 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>개인정보</span>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <Select
                        defaultValue="name"
                        className="fSelect"
                        name="search_type"
                        onChange={(e) => setSearch_type(e.target.value)}
                      >
                        <MenuItem value="name">이름</MenuItem>
                        <MenuItem value="id">아이디</MenuItem>
                        <MenuItem value="email">이메일</MenuItem>
                        <MenuItem value="phone">전화번호</MenuItem>
                        <MenuItem value="nickname">닉네임</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="검색어"
                      type="text"
                      name="type"
                      className="fText"
                      style={{ width: "auto" }}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (!type.trim()) {
                            alert("검색할 단어를 입력하세요.");
                            return;
                          }
                          doSrchFrm(0);
                        }
                      }}
                      sx={{ marginLeft: 2 }}
                      size="small"
                    />
                  </li>
                  {/* 가입일 & 탈퇴 여부 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Grid container spacing={2}>
                      {/* 가입일 */}
                      <Grid item xs={6}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ width: "120px" }}>가입일</span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <TextField
                              id="regist_start_date"
                              type="date"
                              className="fText gDate"
                              name="regist_start_date"
                              size="small"
                              onChange={(e) =>
                                setRegist_start_date(e.target.value)
                              }
                            />
                            <span style={{ margin: "0 10px" }}>~</span>
                            <TextField
                              id="regist_end_date"
                              type="date"
                              className="fText gDate"
                              name="regist_end_date"
                              size="small"
                              onChange={(e) =>
                                setRegist_end_date(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </Grid>
                      {/* 탈퇴 여부 */}
                      <Grid item xs={6}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ width: "120px" }}>탈퇴여부</span>
                          <RadioGroup
                            row
                            defaultValue="2"
                            name="del"
                            className="fChk"
                            onChange={(e) => setIsdeleted(e.target.value)}
                          >
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="전체"
                            />
                            <FormControlLabel
                              value="0"
                              control={<Radio size="small" />}
                              label="탈퇴 X"
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="탈퇴 O"
                            />
                          </RadioGroup>
                        </div>
                      </Grid>
                    </Grid>
                  </li>
                  {/* 최근접속일, 본인인증 여부 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Grid container spacing={2}>
                      {/* 최근접속일 */}
                      <Grid item xs={6}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ width: "120px" }}>최근접속일</span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <TextField
                              id="recent_login_start_date"
                              type="date"
                              className="fText gDate"
                              name="regist_start_date"
                              size="small"
                              onChange={(e) =>
                                setRecent_login_start_date(e.target.value)
                              }
                            />
                            <span style={{ margin: "0 10px" }}>~</span>
                            <TextField
                              id="recent_login_end_date"
                              type="date"
                              className="fText gDate"
                              name="regist_end_date"
                              size="small"
                              onChange={(e) =>
                                setRecent_login_end_date(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </Grid>
                      {/* 본인인증 여부 */}
                      <Grid item xs={6}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ width: "120px" }}>본인인증여부</span>
                          <RadioGroup
                            row
                            defaultValue="2"
                            name="isauthorized"
                            className="fChk"
                            onChange={(e) => setIsauthorized(e.target.value)}
                          >
                            <FormControlLabel
                              value="2"
                              control={<Radio size="small" />}
                              label="전체"
                            />
                            <FormControlLabel
                              value="0"
                              control={<Radio size="small" />}
                              label="인증 X"
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio size="small" />}
                              label="인증 O"
                            />
                          </RadioGroup>
                        </div>
                      </Grid>
                    </Grid>
                  </li>
                  {/* 검색 버튼 */}
                  <li style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => doSrchFrm(0)}
                      className="btnSearch"
                    >
                      검색
                    </Button>
                  </li>
                </ul>
              </form>
            </DashboardCard>
          </Grid>
        </Grid>
        {/* 사용자 목록 */}
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="stretch"
          style={{ marginBottom: "50px" }}
        >
          <Grid item xs={12} sx={{ mb: 0.3 }}>
            <Typography variant="h5" flexGrow={1}>
              사용자 목록
            </Typography>
          </Grid>
          {/* 검색 폼 */}
          <Grid item xs={12}>
            <DashboardCard>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                
                <Button
                  variant="contained"
                  color="inherit"
                  className="btnNormal"
                  sx={{ ml: 1 }}
                  startIcon={<EditIcon />}
                  onClick={() => {
                    if (checkedItems.length === 0) {
                      alert("수정할 유저를 선택하세요.");
                      return;
                    } else if (checkedItems.length > 1) {
                      alert("한명만 선택하세요.");
                      return;
                    } else {
                      editUser(checkedItems[0]); 
                    }
                  }}
                >
                  수정
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={delete_choice}
                  className="btnNormal"
                  sx={{ ml: 1 }}
                  startIcon={<ClearIcon />}
                >
                  삭제
                </Button>
              </Box>
              <TableContainer sx={{ overflowX: "auto", width: "100%" }}>
                <Table sx={{ tableLayout: "auto" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          id="allChk"
                          type="checkbox"
                          className="allChk"
                          checked={allChecked}
                          onChange={handleAllCheck} // 전체 선택 체크박스 핸들러 연결
                        />
                      </TableCell>
                      <TableCell align="center">이름</TableCell>
                      <TableCell
                        align="center"
                      >
                        등록일
                      </TableCell>
                      <TableCell align="center">아이디</TableCell>
                      <TableCell align="center">닉네임</TableCell>
                      <TableCell align="center">전화번호</TableCell>
                      <TableCell align="center">이메일</TableCell>
                      <TableCell align="center">탈퇴여부</TableCell>
                      <TableCell align="center">인증여부</TableCell>
                      <TableCell align="center">최근 접속일</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
  {userlist && userlist.length > 0 ? (
    // userlist에 데이터가 있을 때 렌더링
    userlist.map((item, i) => (
      <TableRow
        key={i}
        hover
        tabIndex={-1}
        role="checkbox"
        onClick={() => handleRowCheck({ target: { checked: !checkedItems.includes(item.userkey) } }, item.userkey)}
      >
        <TableCell padding="checkbox">
          <Checkbox
            disableRipple
            name="use_check[]"
            className="rowChk"
            checked={checkedItems.includes(item.userkey)}
            onChange={(e) => handleRowCheck(e, item.userkey)}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={item.name} src={item.imgurl} />
            {item.name}
          </Box>
        </TableCell>
        <TableCell align="right">
          {new Date(item.create_dtm).toISOString().split("T")[0]}
        </TableCell>
        <TableCell>{item.id}</TableCell>
        <TableCell align="center">{item.nickname}</TableCell>
        <TableCell align="center">{item.phone}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell align="center">{item.isdeleted === 0 ? "X" : "O"}</TableCell>
        <TableCell align="center">{item.isauthorized === 0 ? "X" : "O"}</TableCell>
        <TableCell align="right">
          {new Date(item.login_dtm).toISOString().split("T")[0]}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell align="center" colSpan={10}>
        <Box sx={{ py: 15, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            검색된 사용자 목록이 없습니다.
          </Typography>
          <Typography variant="body2">
            검색 조건을 확인해주세요.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  )}
</TableBody>

                </Table>
              </TableContainer>
              {/* Pagination을 가운데에 배치 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Typography sx={{ mr: 2 }}>Page: {page.nowPage}</Typography>
                <Pagination
                  count={page.totalPage}
                  showFirstButton
                  showLastButton
                  onChange={(e, newPage) => changePage(newPage)}
                />
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>

      {/*모달창 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                          style={{ cursor: "pointer", textAlign: "center" }}
                          onClick={() => openPostDetail(post.postkey)}
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

    {/**모달창 */}
    {openPD && (
          <PostDetail
            openPD={openPD}
            closePostDetail={closePostDetail}
            postkey={pdkey}
          />
        )}
        </Box>
      </Modal>

      
    </PageContainer>
  );
}

