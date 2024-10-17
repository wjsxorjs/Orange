"use client";
import React, { useEffect, useState } from "react";
import "/public/css/admin/user.css";
import axios from "axios";
import PageContainer from "@/component/admin/container/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import PostDetail from "@/component/admin/post/detail/PostDetail";
import { ArticleOutlined } from "@mui/icons-material";

export default function Page() {
  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]); // 필터링된 게시글 리스트

  // 게시판 현황 카운트
  const API_URL = "/api/adpost/postcount";
  const [all, set_all_posts] = useState(0); // 전체 게시글 수
  const [tem_save, set_tem_save_posts] = useState(0); // 임시 저장 게시글 수
  const [sale, set_sale_posts] = useState(0); // 판매중 게시글 수
  const [saleing, set_saleing_posts] = useState(0); // 예약중(거래중) 게시글 수
  const [saled, set_saled_posts] = useState(0); // 거래완료 게시글 수
  const [hide, set_hide_posts] = useState(0); // 숨김 게시글 수
  const [del, set_del_posts] = useState(0); // 삭제 게시글 수

  // 상태 관리 추가
  const [page, setPage] = useState({});

  // 작성지 위한 useEffect
  const [region1, setRegion1] = useState([]);
  const [region2, setRegion2] = useState([]);
  const [region3, setRegion3] = useState([]);

  const [selReg1, setSelReg1] = useState("null");
  const [selReg2, setSelReg2] = useState("null");
  const [selReg3, setSelReg3] = useState("null");

  // 프로그레스 띄우기용
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState([]);

  // region1
  useEffect(() => {
    axios({
      url: "/api/town/getAllRegion1", // 실제 검색 API
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setRegion1(res.data.getAllRegion1); // 데이터 업데이트
      setRegion2([]);
      setRegion3([]);
    });
  }, []);

  // region2
  useEffect(() => {
    axios({
      url: "/api/town/getAllRegion2", // 실제 검색 API
      method: "get",
      params: {
        region1: selReg1,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setRegion2(res.data.getAllRegion2); // 데이터 업데이트
      setSelReg2("null");
      setSelReg3("null");
      setRegion3([]);
    });
  }, [selReg1]);

  // region3
  useEffect(() => {
    axios({
      url: "/api/town/getAllRegion3",
      method: "get",
      params: {
        region2: selReg2,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setRegion3(res.data.getAllRegion3); // 데이터 업데이트
      setSelReg3("null");
    });
  }, [selReg2]);

  // 로딩창
  useEffect(() => {
    if (loading) {
      axios({
        url: "/api/adpost/searchpost",
        method: "post",
        data: JSON.stringify(searchParams),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setList(res.data.post_list);
        setPage(res.data.page);
        setLoading(false);
        setAllChecked(false);
        setCheckedItems([]);
      });
    }
  }, [loading]);

  // 게시글 조회
  function searchpost(event, nowPage) {
    let formData;
    if (event == null) {
      formData = new FormData(document.getElementById("frmSearch"));
    } else {
      event.preventDefault();
      formData = new FormData(event.currentTarget);
    }
    formData.append("nowPage", nowPage);
    formData.append("region1", selReg1);
    formData.append("region2", selReg2);
    formData.append("region3", selReg3);

    // 검색 조건을 URLSearchParams로 변환
    let searchParams = Object.fromEntries(new URLSearchParams(formData));

    // 검색 조건을 state에 저장하고 로딩 시작
    setSearchParams(searchParams);
    setLoading(true);
  }

  // 게시글 현황
  function getCount() {
    axios
      .get(API_URL)
      .then((response) => {
        // 받아온 데이터를 각 상태에 맞게 설정
        const data = response.data.pcvo;
        set_all_posts(data.all_posts); // 전체 게시글 수
        set_tem_save_posts(data.tem_save_posts); // 임시 저장 게시글 수
        set_sale_posts(data.sale_posts); // 판매중 게시글 수
        set_saleing_posts(data.saleing_posts); // 예약중(거래중) 게시글 수
        set_saled_posts(data.saled_posts); // 거래완료 게시글 수
        set_hide_posts(data.hide_posts); // 숨김 게시글 수
        set_del_posts(data.del_posts); // 숨김 게시글 수
      })
      .catch((error) => {});
  }

  function callData() {
    axios.get("/api/category/all").then((response) => {
      setCategoryList(response.data.category_list);
    });
  }

  useEffect(() => {
    getCount();
    callData();
    // fetchPostList();
  }, []);

  // 게시글 체크
  const [allChecked, setAllChecked] = useState(false); // 전체 선택 체크박스
  const [checkedItems, setCheckedItems] = useState([]); // 개별 체크박스

  // 전체 선택 체크박스
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked); // 전체 선택 상태 업데이트
    if (checked) {
      // 전체 선택 시, 모든 유저의 키를 checkedItems에 추가
      const allCheckedItems = list.map((item) => item.postkey);
      setCheckedItems(allCheckedItems);
    } else {
      // 전체 선택 해제
      setCheckedItems([]);
    }
  };

  // 개별 체크박스 핸들러
  const handleRowCheck = (e, postkey) => {
    const checked = e.target.checked;
    let updatedCheckedItems = [...checkedItems];
    if (checked) {
      // 체크 시 해당 유저의 키를 checkedItems에 추가
      updatedCheckedItems.push(postkey);
    } else {
      // 체크 해제 시 유저의 키 checkedItems에서 제거
      updatedCheckedItems = updatedCheckedItems.filter(
        (key) => key !== postkey
      );
    }
    setCheckedItems(updatedCheckedItems);
    // 모든 유저가 선택되었는지 확인> 전체 선택 상태 업데이트
    setAllChecked(updatedCheckedItems.length === list.length);
  };

  // 체크 삭제
  function delete_choice() {
    if(checkedItems.length>0){
      if (!confirm("정말 삭제하시겠습니까?")) {
        return;
      }
    } else{
      alert("삭제하실 게시글을 선택해주시기 바랍니다.")
    }
    axios
      .get("/api/adpost/checkPostDel", {
        params: { postkeys: checkedItems }, // URL 쿼리 파라미터로 postkeys 전송
      })
      .then((res) => {
        alert("삭제가 완료되었습니다.");
        // 체크박스 선택 해제
        setCheckedItems([]); // 개별 체크박스 해제
        setAllChecked(false); // 전체 선택 체크박스 해제
        getCount();
        searchpost(null, 1);
      })
      .catch((error) => {
        alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });
  }

  const [openPD, setOpenPD] = useState(false);
  const [pdkey, setPdkey] = useState("0");

  function openPostDetail() {
    if (checkedItems.length == 0) {
      alert("상세내용을 확인할 게시글을 선택해주시기 바랍니다.");
      return;
    } else if (checkedItems.length > 1) {
      alert("상세내용 확인은 한 게시글만 가능합니다.");
      return;
    }
    setPdkey(checkedItems.pop());
    setOpenPD(true);
  }
  function closePostDetail() {
    setOpenPD(false);
    setPdkey("0");
  }

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box sx={{ position: "relative" }}>
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
            <Typography variant="h5">게시글 현황</Typography>
          </Grid>
          <Grid item xs={12} sm={12 / 7} md={12 / 7} lg={12 / 7}>
            <Top_Analytic
              title="전체"
              count={all} //extra="35,000"
            />
          </Grid>
          <Grid item xs={12} sm={12 / 7} md={12 / 7} lg={12 / 7}>
            <Top_Analytic
              title="임시 저장"
              count={tem_save}
              //extra="8,900"
            />
          </Grid>
          <Grid item xs={12} sm={12 / 7} md={12 / 7} lg={12 / 7}>
            <Top_Analytic
              title="판매중"
              count={sale}
              color="warning"
              //extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={12 / 7} md={12 / 7} lg={12 / 7}>
            <Top_Analytic
              title="예약중"
              count={saleing}
              color="warning"
              //extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={12 / 7} md={12 / 7} lg={12 / 7}>
            <Top_Analytic
              title="거래완료"
              count={saled}
              color="warning"
              //extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={12 / 7} md={12 / 7} lg={12 / 7}>
            <Top_Analytic
              title="숨김"
              count={hide}
              color="warning"
              //extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={12 / 7} md={12 / 7} lg={12 / 7}>
            <Top_Analytic
              title="삭제"
              count={del}
              color="warning"
              //extra="1,943"
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
            <Typography variant="h5">게시글 조회</Typography>
          </Grid>

          {/* 검색 폼 */}
          <Grid item xs={12}>
            <DashboardCard>
              <form id="frmSearch" onSubmit={searchpost}>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>검색분류</span>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <Select
                        defaultValue="title"
                        className="fSelect eSearch"
                        id="searchCategory"
                        name="searchCategory"
                      >
                        <MenuItem value="title">게시글명</MenuItem>
                        <MenuItem value="postkey">게시글 번호</MenuItem>
                        <MenuItem value="userkey">게시 회원 번호</MenuItem>
                        <MenuItem value="id">게시 회원 ID</MenuItem>
                        <MenuItem value="nickname">게시 회원 닉네임</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      id="searchCategoryText"
                      label="검색어 입력"
                      type="text"
                      name="searchCategoryText"
                      style={{ width: "auto" }}
                      sx={{ marginLeft: 2 }}
                      size="small"
                    />
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>카테고리</span>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <Select
                        className="fSelect category eCategory"
                        id="categorykey"
                        name="categorykey"
                        defaultValue="null"
                      >
                        <MenuItem value="null">- 분류 선택 -</MenuItem>
                        {categoryList.map((cate, i) => (
                          <MenuItem value={cate.categorykey} key={i}>
                            {cate.categoryname}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>작성지</span>
                    <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
                      <Select
                        className="fSelect category eCategory"
                        id="region1"
                        name="region1"
                        value={selReg1}
                        onChange={(e) => setSelReg1(e.target.value)}
                      >
                        <MenuItem value="null">- 분류 선택 -</MenuItem>
                        {region1.map((reg1, i) => (
                          <MenuItem value={reg1} key={i}>
                            {reg1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
                      <Select
                        className="fSelect category eCategory"
                        id="region2"
                        name="region2"
                        value={selReg2}
                        onChange={(e) => setSelReg2(e.target.value)}
                      >
                        <MenuItem value="null">- 분류 선택 -</MenuItem>
                        {region2 &&
                          region2.map((reg2, i) => (
                            <MenuItem value={reg2} key={i}>
                              {reg2}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <Select
                        className="fSelect category eCategory"
                        id="region3"
                        name="region3"
                        value={selReg3}
                        onChange={(e) => setSelReg3(e.target.value)}
                      >
                        <MenuItem value="null">- 분류 선택 -</MenuItem>
                        {region3 &&
                          region3.map((reg3, i) => (
                            <MenuItem value={reg3} key={i}>
                              {reg3}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>게시글 상태</span>
                    <RadioGroup
                      row
                      defaultValue="all"
                      className="poststatus"
                      name="poststatus"
                    >
                      <FormControlLabel
                        value="all"
                        control={<Radio size="small" />}
                        label="전체"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio size="small" />}
                        label="임시저장"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio size="small" />}
                        label="판매중"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio size="small" />}
                        label="예약중"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio size="small" />}
                        label="거래완료"
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio size="small" />}
                        label="숨김"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio size="small" />}
                        label="삭제"
                      />
                    </RadioGroup>
                  </li>
                  {/* 판매 or 나눔 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>거래구분</span>
                    <RadioGroup
                      row
                      defaultValue="all"
                      className="method"
                      name="method"
                    >
                      <FormControlLabel
                        value="all"
                        control={<Radio size="small" />}
                        label="전체"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio size="small" />}
                        label="판매"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio size="small" />}
                        label="나눔"
                      />
                    </RadioGroup>
                  </li>
                  {/* 가격 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>가격</span>
                    <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
                      <Select
                        className="fSelect category eCategory"
                        id="price"
                        name="price"
                        defaultValue="price"
                      >
                        <MenuItem value="price">등록 가격</MenuItem>
                        <MenuItem value="lastprice">판매 가격</MenuItem>
                      </Select>
                    </FormControl>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        ml: 16,
                      }}
                    >
                      <TextField
                        id="minPrice"
                        label="최소 가격"
                        type="number"
                        className="minPrice"
                        name="minPrice"
                        size="small"
                        sx={{ width: "120px" }} // 고정 너비 적용
                      />
                      <span style={{ margin: "0 10px" }}>~</span>
                      <TextField
                        id="maxPrice"
                        label="최대 가격"
                        type="number"
                        className="maxPrice"
                        name="maxPrice"
                        size="small"
                        sx={{ width: "120px" }} // 고정 너비 적용
                      />
                    </div>
                  </li>
                  {/* 흥정 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>흥정가능여부</span>
                    <RadioGroup
                      row
                      defaultValue="all"
                      className="canbargain"
                      name="canbargain"
                    >
                      <FormControlLabel
                        value="all"
                        control={<Radio size="small" />}
                        label="전체"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio size="small" />}
                        label="흥정 가능"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio size="small" />}
                        label="흥정 불가능"
                      />
                    </RadioGroup>
                  </li>
                  {/* 일자 검색 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>일자 검색</span>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <Select
                        className="dtm"
                        name="dtm"
                        id="dtm"
                        defaultValue="create_dtm"
                      >
                        <MenuItem value="create_dtm">게시글 작성일</MenuItem>
                        <MenuItem value="delete_dtm">게시글 삭제일</MenuItem>
                        <MenuItem value="deal_dtm">거래완료 일자</MenuItem>
                      </Select>
                    </FormControl>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 16,
                      }}
                    >
                      <TextField
                        id="dtm_from"
                        type="date"
                        className="dtm_from"
                        name="dtm_from"
                        size="small"
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      <span style={{ margin: "0 10px" }}>~</span>
                      <TextField
                        id="dtm_to"
                        type="date"
                        className="dtm_to"
                        name="dtm_to"
                        size="small"
                        onKeyDown={(e) => e.preventDefault()}
                      />
                    </div>
                  </li>
                  {/* 정렬 */}
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ width: "120px" }}>정렬</span>
                    <RadioGroup
                      row
                      defaultValue="recent"
                      className="sort"
                      name="sort"
                    >
                      <FormControlLabel
                        value="recent"
                        control={<Radio size="small" />}
                        label="최신순"
                      />
                      <FormControlLabel
                        value="popular"
                        control={<Radio size="small" />}
                        label="조회순"
                      />
                    </RadioGroup>
                  </li>

                  {/* 검색 버튼 */}
                  <li style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                      className="btnSearch"
                      id="productSearchBtn"
                    >
                      검색
                    </Button>
                  </li>
                </ul>
              </form>
            </DashboardCard>
          </Grid>
        </Grid>
        {/* 게시글 목록 */}
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="stretch"
          style={{ marginBottom: "50px" }}
        >
          <Grid item xs={12} sx={{ mb: 0.3 }}>
            <Typography variant="h5" flexGrow={1}>
              게시글 목록 {page?.totalRecord && `(${page.totalRecord}건)`}
            </Typography>
          </Grid>
          {/* 검색 폼 */}
          <Grid item xs={12}>
            <DashboardCard>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    openPostDetail();
                  }}
                  className="btnNormal"
                  sx={{ ml: 1 }}
                  startIcon={<ArticleOutlined />}
                >
                  확인
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
                <Table sx={{ minWidth: 1600, tableLayout: "auto" }}>
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
                      <TableCell align="center">No</TableCell>
                      <TableCell align="center">제목</TableCell>
                      <TableCell align="center">작성자</TableCell>
                      <TableCell align="center">동네</TableCell>
                      <TableCell align="center">분류</TableCell>
                      <TableCell align="center">구분</TableCell>
                      <TableCell align="center">상태</TableCell>
                      <TableCell align="center">등록가</TableCell>
                      <TableCell align="center">판매가</TableCell>
                      <TableCell align="center">구매자</TableCell>
                      <TableCell align="center">생성일</TableCell>
                      <TableCell align="center">삭제일</TableCell>
                      <TableCell align="center">거래일</TableCell>
                      <TableCell align="center">조회</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list && list.length > 0 ? (
                      list.map((prod, i) => (
                        <TableRow key={i} hover tabIndex={-1} role="checkbox">
                          <TableCell padding="checkbox">
                            <Checkbox
                              disableRipple
                              name="use_check[]"
                              className="rowChk"
                              checked={checkedItems.includes(prod.postkey)} // 개별 체크박스 상태 관리
                              onChange={(e) => handleRowCheck(e, prod.postkey)} // 개별 체크박스 핸들러 연결
                            />
                          </TableCell>
                          <TableCell align="center">{prod.postkey}</TableCell>
                          {/* 이미지 */}
                          <TableCell component="th" scope="row">
                            <Box gap={2} display="flex" alignItems="center">
                              {prod.pimg_list && prod.pimg_list.length > 0 && (
                                <Avatar
                                  alt={prod.title}
                                  src={prod.pimg_list[0].imgurl}
                                />
                              )}
                              {prod.title}
                            </Box>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box gap={2} display="flex" alignItems="center">
                              <Avatar
                                alt={prod.uvo ? prod.uvo.nickname : "-"}
                                src={prod.uvo ? prod.uvo.imgurl : "-"}
                              />
                              {prod.uvo ? prod.uvo.nickname : "-"}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            {prod.townVO.region1 +
                              " " +
                              prod.townVO.region2 +
                              " " +
                              prod.townVO.region3}
                          </TableCell>
                          <TableCell align="center">
                            {prod.cvo.categoryname}
                          </TableCell>
                          <TableCell align="center">
                            {prod.method == 0 ? "판매" : "나눔"}
                          </TableCell>
                          <TableCell align="center">
                            {prod.isdeleted == 1
                              ? "삭제"
                              : prod.poststatus == 0
                                ? "임시저장"
                                : prod.poststatus == 1
                                  ? "판매중"
                                  : prod.postStatus == 2
                                    ? "예약중"
                                    : prod.poststatus == 3
                                      ? "거래완료"
                                      : "숨김"}
                          </TableCell>
                          <TableCell align="center">
                            {new Intl.NumberFormat("ko-KR").format(prod.price)}
                          </TableCell>
                          <TableCell align="center">
                            {prod.lastprice
                              ? new Intl.NumberFormat("ko-KR").format(
                                  prod.lastprice
                                )
                              : "-"}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Box gap={2} display="flex" alignItems="center">
                              {prod.duvo && (
                                <>
                                  <Avatar
                                    alt={prod.duvo.nickname}
                                    src={prod.duvo.imgurl}
                                  />
                                  {prod.duvo.nickname}
                                </>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            {prod.create_dtm
                              ? new Date(prod.create_dtm)
                                  .toISOString()
                                  .split("T")[0]
                              : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {prod.delete_dtm
                              ? new Date(prod.delete_dtm)
                                  .toISOString()
                                  .split("T")[0]
                              : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {prod.deal_dtm
                              ? new Date(prod.deal_dtm)
                                  .toISOString()
                                  .split("T")[0]
                              : "-"}
                          </TableCell>
                          <TableCell align="center">
                            {new Intl.NumberFormat("ko-KR").format(
                              prod.viewqty
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={16}>
                          <Box sx={{ py: 15, textAlign: "center" }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                              검색된 게시글 목록이 없습니다.
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
                  onChange={(e, newPage) => searchpost(null, newPage)}
                />
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
      {openPD && (
        <PostDetail
          openPD={openPD}
          closePostDetail={closePostDetail}
          postkey={pdkey}
        />
      )}
    </PageContainer>
  );
}
