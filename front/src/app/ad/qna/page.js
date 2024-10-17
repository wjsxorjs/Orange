"use client";
import React, { useEffect, useState } from "react";
import "/public/css/admin/user.css";
import axios from "axios";
import PageContainer from "@/component/admin/container/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
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
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Top_Analytic from "@/component/admin/dashboard/Top_Analytic";
import DashboardCard from "@/component/admin/shared/DashboardCard";
import QuestionModal from "@/component/admin/qna/QuestionModal";
import AnswerModal from "@/component/admin/qna/AnswerModal";

export default function Page() {
  const CHKDEL_URL = "/api/qna/chkDelete";
  const SEARCH_URL = "/api/qna/search";

  const [list, setList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [page, setPage] = useState({});
  const [title, setTitle] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [create_start_dtm, setCreateStartDtm] = useState("");
  const [create_end_dtm, setCreateEndDtm] = useState("");
  const [answer_start_dtm, setAnswerStartDtm] = useState("");
  const [answer_end_dtm, setAnswerEndDtm] = useState("");
  const [isanswered, setIsAnswered] = useState("");
  const [selectedQnaKey, setSelectedQnaKey] = useState(null);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [allRecord, setAllRecord] = useState(0);
  const [answeredRecord, setAnsweredRecord] = useState(0);
  const [unansweredRecord, setUnansweredRecord] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [todayCount1, setTodayCount1] = useState(0);
  const [todayCount2, setTodayCount2] = useState(0);

  const handleQuestionModalOpen = (qnakey) => { 
    setSelectedQnaKey(qnakey);
    setQuestionModalOpen(true);
  };

  const handleQuestionModalClose = () => {
    setSelectedQnaKey(null);
    setQuestionModalOpen(false);
  };
  const handleAnswerModalOpen = (qnakey) => {
    setSelectedQnaKey(qnakey);
    setAnswerModalOpen(true); };
  const handleAnswerModalClose = () => { setAnswerModalOpen(false); };

  useEffect(() => {
    search(1);
    getCount();
    getSelectCount1();
    getSelectCount2();
  }, []);
  
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    if (checked) {
      const allCheckedItems = list.map((item) => item.qnakey);
      setCheckedItems(allCheckedItems);
    } else {
      setCheckedItems([]);
    }
  };

  const handleRowCheck = (e, qnakey) => {
    const checked = e.target.checked;
    let updatedCheckedItems = [...checkedItems];
    if (checked) {
      updatedCheckedItems.push(qnakey);
    } else {
      updatedCheckedItems = updatedCheckedItems.filter(
        (item) => item !== qnakey
      );
    }
    setCheckedItems(updatedCheckedItems);
    setAllChecked(updatedCheckedItems.length === list.length);
  };

  function getCount() {
    axios.get("/api/qna/todayCount").then((res) => {
      setTodayCount(res.data.cnt);
    });
  }

  function getSelectCount1() {
    axios.get("/api/qna/selectTodayCount", {
      params: {
        isanswered: 0,
      }
    }).then((res) => {
      setTodayCount1(res.data.cnt);
    });
  }

  function getSelectCount2() {
    axios.get("/api/qna/selectTodayCount", {
      params: {
        isanswered: 1,
      }
    }).then((res) => {
      setTodayCount2(res.data.cnt);
    });
  }

  function delete_choice() {
    if (checkedItems.length === 0) {
      alert("삭제할 게시글을 선택해 주세요.");
      return;
    }
    axios
      .post(CHKDEL_URL, checkedItems)
      .then((res) => {
        alert("삭제 완료");
        search(1);
      })
      .catch((error) => {
        console.error("삭제 중 오류가 발생했습니다.", error);
      });
  }

  function search(cPage) {
    axios({
      url: `${SEARCH_URL}?cPage=${cPage}`,
      method: "post",
      params: {
        title: title,
        create_start_dtm: create_start_dtm,
        create_end_dtm: create_end_dtm,
        answer_start_dtm: answer_start_dtm,
        answer_end_dtm: answer_end_dtm,
        isanswered: isanswered !== "" ? isanswered : null,
        searchType: searchType,
        searchValue: searchValue,
      },
    })
      .then((res) => {
        setList(res.data.q_ar);
        setPage(res.data.page);
        setAllRecord(res.data.allRecord);
        setAnsweredRecord(res.data.answeredRecord);
        setUnansweredRecord(res.data.unansweredRecord);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setList([]);
          setPage({});
        }
      });
  }

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="stretch"
          style={{ marginBottom: "50px" }}
        >
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">문의사항 현황</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Top_Analytic
              title="전체"
              count={allRecord || 0}
              extra={todayCount.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Top_Analytic
              title="답변 완료"
              count={answeredRecord || 0}
              extra={todayCount2.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Top_Analytic
              title="답변 대기"
              count={unansweredRecord || 0}
              isLoss
              color="warning"
              extra={todayCount1.toString()}
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
            <Typography variant="h5">문의사항 조회</Typography>
          </Grid>

          {/* 검색 폼 */}
          <Grid item xs={12}>
            <DashboardCard>
              <form name="mform" method="post" action="/search">
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {/* 개인정보 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>사용자</span>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <Select
                        value={searchType === "" ? "null" : searchType} 
                        onChange={(e) => setSearchType(e.target.value)}
                        className="fSelect"
                      >
                        <MenuItem value="null">--선택--</MenuItem>
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
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="fText"
                      style={{ width: "auto" }}
                      sx={{ marginLeft: 2 }}
                      size="small"
                    />
                  </li>
                  {/* 제목 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>제목</span>
                    <TextField
                      label="제목"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="fText"
                      style={{ width: "auto" }}
                      size="small"
                    />
                  </li>
                  {/* 작성일 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ width: "120px" }}>작성일</span>
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
                          value={create_start_dtm}
                          onChange={(e) => setCreateStartDtm(e.target.value)}
                          size="small"
                          onKeyDown={(e) => e.preventDefault()}
                        />
                        <span style={{ margin: "0 10px" }}>~</span>
                        <TextField
                          id="regist_end_date"
                          type="date"
                          className="fText gDate"
                          value={create_end_dtm}
                          onChange={(e) => setCreateEndDtm(e.target.value)}
                          size="small"
                          onKeyDown={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                  </li>
                  {/* 답변완료일 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ width: "120px" }}>답변완료일</span>
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
                          value={answer_start_dtm}
                          onChange={(e) => setAnswerStartDtm(e.target.value)}
                          size="small"
                          onKeyDown={(e) => e.preventDefault()}
                        />
                        <span style={{ margin: "0 10px" }}>~</span>
                        <TextField
                          id="regist_end_date"
                          type="date"
                          className="fText gDate"
                          value={answer_end_dtm}
                          onChange={(e) => setAnswerEndDtm(e.target.value)}
                          size="small"
                          onKeyDown={(e) => e.preventDefault()}
                        />
                      </div>
                    </div>
                  </li>
                  {/* 가입일 & 탈퇴 여부 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>답변여부</span>
                    <RadioGroup
                      row
                      value={isanswered}
                      onChange={(e) => setIsAnswered(e.target.value)}
                      className="fChk"
                    >
                      <FormControlLabel
                        // value="2"
                        value=""
                        control={<Radio size="small" />}
                        label="전체"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio size="small" />}
                        label="답변 X"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio size="small" />}
                        label="답변 O"
                      />
                    </RadioGroup>
                  </li>
                  {/* 검색 버튼 */}
                  <li style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => search(1)}
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
        {/* 문의사항 목록 */}
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="stretch"
          style={{ marginBottom: "50px" }}
        >
          <Grid item xs={12} sx={{ mb: 0.3 }}>
            <Typography variant="h5" flexGrow={1}>
              문의사항 목록
            </Typography>
          </Grid>
          {/* 검색 폼 */}
          <Grid item xs={12}>
            <DashboardCard>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={delete_choice}
                  className="btnNormal"
                  sx={{ ml: 1, display: "none" }}
                  startIcon={<AddIcon />}
                >
                  추가
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
              <QuestionModal questionModalOpen={questionModalOpen} handleQuestionModalClose={handleQuestionModalClose} qnakey={selectedQnaKey}  handleAnswerModalOpen={handleAnswerModalOpen}/>
              <AnswerModal answerModalOpen={answerModalOpen} handleAnswerModalClose={handleAnswerModalClose} qnakey={selectedQnaKey} search={search}/>
              <TableContainer sx={{ overflowX: "auto", width: "100%" }}>
                <Table sx={{ tableLayout: "auto" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox id="allChk" type="checkbox" className="allChk" checked={allChecked} onChange={handleAllCheck} />
                      </TableCell>
                      <TableCell align="center">이름</TableCell>
                      <TableCell align="center">닉네임</TableCell>
                      <TableCell align="center">제목</TableCell>
                      <TableCell align="center">작성일</TableCell>
                      <TableCell align="center">답변 완료일</TableCell>
                      <TableCell align="center">답변 여부</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list && list.length > 0 ? (
                      list.map((ar, i) => (
                        <TableRow key={i} hover role="checkbox">
                          <TableCell padding="checkbox">
                            <Checkbox disableRipple name="use_board[]" className="rowChk" value={ar.qnakey} checked={checkedItems.includes(ar.qnakey)} onChange={(e) => handleRowCheck(e, ar.qnakey)}/>
                          </TableCell>
                          <TableCell align="center" onClick={() => handleQuestionModalOpen(ar.qnakey)} style={{ cursor: "pointer" }}>
                            {ar.uvo.name}
                          </TableCell>
                          <TableCell align="center" onClick={() => handleQuestionModalOpen(ar.qnakey)} style={{ cursor: "pointer" }}>
                            {ar.uvo.nickname}
                          </TableCell>
                          <TableCell align="center" onClick={() => handleQuestionModalOpen(ar.qnakey)} style={{ cursor: "pointer" }}>
                            {ar.title ? ar.title : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(ar.create_dtm).toLocaleString([], {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell align="center">
                            {ar.answer_dtm
                              ? new Date(ar.answer_dtm).toLocaleString([], {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {ar.isanswered == 1 ? "O" : "X"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={10}>
                          <Box sx={{ py: 15, textAlign: "center" }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                              검색된 문의사항 목록이 없습니다.
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
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3,}}>
                <Typography sx={{ mr: 2 }}>Page: {page.nowPage}</Typography>
                <Pagination count={page.totalPage} showFirstButton showLastButton onChange={(e, newPage) => search(newPage)}/>
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
