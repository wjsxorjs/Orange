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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
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
import AddModal from "@/component/admin/bbs/AddModal";
import DetailModal from "@/component/admin/bbs/DetailModal";
import EditModal from "@/component/admin/bbs/EditModal";

export default function Page() {
  const API_URL = "/api/admin/board/list";
  const BC_URL = "/api/admin/board/getAllBc";
  const ADD_URL = "/api/admin/board/addBc";
  const EDIT_URL = "/api/admin/board/editBc";
  const DEL_CATE_URL = "/api/admin/board/chkDelBc";
  const DEL_BBS_URL = "/api/admin/board/chkDel";

  // #region 카테고리 CRUD
  const [allCateChecked, setAllCateChecked] = useState(false);
  const [checkedCateItems, setCheckedCateItems] = useState([]);
  const [bc_list, setBc_list] = useState([]);

  function getCateData() {
    axios
      .get(BC_URL)
      .then((res) => {
        setBc_list(res.data.bc_list);
        setCheckedCateItems([]);
        setAllCateChecked(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setBc_list([]);
        }
      });
  }

  useEffect(() => {
    getCateData();
    getBbsData(1);
    getCount();
  }, []);

  useEffect(() => {
    bc_list.forEach((bc) => {
        getSelectCount1(bc.key);
    });
  }, [bc_list]); 

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");

  function addOrEditBc() {
    if (value == null) {
      alert("카테고리명을 입력해 주세요.");
      return;
    }
    const url = modalMode == "add" ? ADD_URL : EDIT_URL;
    const data = {
      key: key,
      value: value,
    };
    axios({
      url: url,
      method: "post",
      params: data,
    })
      .then((res) => {
        alert(modalMode == "add" ? "추가 완료" : "수정 완료");
        setValue("");
        setModalOpen(false);
        getCateData();
        setCheckedCateItems([]);
      })
      .catch((error) => {
        console.error(
          modalMode == "add"
            ? "추가 중 오류가 발생했습니다."
            : "수정 중 오류가 발생했습니다.",
          error
        );
      });
  }

  function delete_choice_cate() {
    if (checkedCateItems.length == 0) {
      alert("삭제할 카테고리을 선택해 주세요.");
      return;
    }
    const confirmation = confirm(
      "삭제할 카테고리에 해당하는 게시글들이 같이 삭제됩니다. \n계속 진행하시겠습니까?"
    );
    if (!confirmation) {
      return;
    }
    axios
      .post(DEL_CATE_URL, checkedCateItems)
      .then((res) => {
        alert("삭제 완료");
        getCateData();
        setCheckedCateItems([]);
        setModalOpen(false);
      })
      .catch((error) => {
        console.error("삭제 중 오류가 발생했습니다.", error);
      });
  }

  function openModalForEdit(key, value) {
    let updatedCheckedItems = [...checkedCateItems];
    updatedCheckedItems.push(value);
    setCheckedCateItems(updatedCheckedItems);
    setKey(key);
    setValue(value);
    setModalMode("edit");
    setModalOpen(true);
  }
  // #endregion

  // #region 게시글 CRUD
  const [allBbsChecked, setAllBbsChecked] = useState(false);
  const [checkedBbsItems, setCheckedBbsItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [create_start_date, setCreate_start_date] = useState("");
  const [create_end_date, setCreate_end_date] = useState("");
  const [search_list, setBbs_list] = useState([]);
  const [page, setPage] = useState({});
  const [initialTotalBbsCount, setInitialTotalBbsCount] = useState(null);
  const [selectedBoardKey, setSelectedBoardKey] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({});

  const handleAddModalOpen = (e) => { setAddModalOpen(true);};
  const handleAddModalClose = () => { setAddModalOpen(false); };
  const handleDetailModalOpen = (boardkey) => { 
    setSelectedBoardKey(boardkey);
    setDetailModalOpen(true);
  };
  const handleDetailModalClose = () => {
    setDetailModalOpen(false);
    setSelectedBoardKey(null);
  };
  const handleEditModalOpen = (boardkey) => {
    setSelectedBoardKey(boardkey);
    setEditModalOpen(true); 
  };
  const handleEditModalClose = () => { setEditModalOpen(false); };

  function getBbsData(cPage) {
    axios({
      url: `${API_URL}?cPage=${cPage}`,
      method: "post",
      params: {
        title: title,
        categoryName: categoryName === "null" ? "" : categoryName,
        create_start_date: create_start_date,
        create_end_date: create_end_date,
      },
    })
      .then((res) => {
        setBbs_list(res.data.b_ar);
        setPage(res.data.page);
        if (initialTotalBbsCount === null) {
          setInitialTotalBbsCount(res.data.totalRecord);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setBbs_list([]);
          setPage({});
        }
      });
  }

  function getCount() {
    axios.get("/api/admin/board/todayCount").then((res) => {
      setTodayCount(res.data.cnt);
    });
  }

  function getSelectCount1(categorykey) {
    axios.get("/api/admin/board/selectTodayCount", {
      params: {
        categorykey: categorykey,
      }
    }).then((res) => {
      setCategoryCounts((prevCounts) => ({
        ...prevCounts,
        [categorykey]: res.data.cnt
      }));
    });
  }
  
  function changePage(pNum) {
    getBbsData(pNum);
  }

  const handleAllBbsCheck = (e) => {
    const checked = e.target.checked;
    setAllBbsChecked(checked);
    if (checked) {
      const allCheckedItems = search_list.map((item) => item.boardkey);
      setCheckedBbsItems(allCheckedItems);
    } else {
      setCheckedBbsItems([]);
    }
  };

  const handleRowBbsCheck = (e, boardkey) => {
    const checked = e.target.checked;
    let updatedCheckedItems = [...checkedBbsItems];
    if (checked) {
      updatedCheckedItems.push(boardkey);
    } else {
      updatedCheckedItems = updatedCheckedItems.filter(
        (item) => item !== boardkey
      );
    }
    setCheckedBbsItems(updatedCheckedItems);
    setAllBbsChecked(updatedCheckedItems.length === search_list.length);
  };

  function delete_choice_bbs() {
    if (checkedBbsItems.length === 0) {
      alert("삭제할 게시글을 선택해 주세요.");
      return;
    }
    const confirmation = confirm("선택된 게시글을 정말 삭제하시겠습니까?");
    if (!confirmation) {
      return;
    }
    axios
      .post(DEL_BBS_URL, checkedBbsItems)
      .then((res) => {
        alert("삭제 완료");
        getBbsData(0);
      })
      .catch((error) => {
        console.error("삭제 중 오류가 발생했습니다.", error);
      });
  }

  //categorykey -> name으로 변경
  const categoryMap = bc_list.reduce((map, bc) => {
    map[bc.key] = bc.value; // bc.key로 bc.value를 매핑
    return map;
  }, {});

  return (
    <>
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">게시판 현황</Typography>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    setModalMode("add");
                    setValue("");
                    setModalOpen(true);
                  }}
                  className="btnNormal"
                  sx={{ ml: 1 }}
                  startIcon={<AddIcon />}
                >
                  추가
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12 / (bc_list.length + 1)}
              md={12 / (bc_list.length + 1)}
              lg={12 / (bc_list.length + 1)}
            >
              <Top_Analytic
                title="전체"
                count={initialTotalBbsCount}
                extra={todayCount.toString()}
              />
            </Grid>
            {bc_list &&
              bc_list.length > 0 &&
              bc_list.map((ar, i) => (
                <Grid
                  key={i}
                  item
                  xs={12}
                  sm={12 / (bc_list.length + 1)}
                  md={12 / (bc_list.length + 1)}
                  lg={12 / (bc_list.length + 1)}
                  onClick={() => openModalForEdit(ar.key, ar.value)}
                >
                  <Top_Analytic
                    title={ar.value}
                    count={ar.count}
                    extra={categoryCounts[ar.key] ? categoryCounts[ar.key].toString() : '0'}
                  />
                </Grid>
              ))}
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
              <Typography variant="h5">게시판 조회</Typography>
            </Grid>

            {/* 검색 폼 */}
            <Grid item xs={12}>
              <DashboardCard>
                <form name="mform" method="post" action="/search_user_admin">
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {/* 작성일 */}
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <span style={{ width: "120px" }}>작성일</span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          id="create_start_date"
                          type="date"
                          className="fText gDate"
                          name="create_start_date"
                          size="small"
                          onChange={(e) => setCreate_start_date(e.target.value)}
                          onKeyDown={(e) => e.preventDefault()}
                        />
                        <span style={{ margin: "0 10px" }}>~</span>
                        <TextField
                          id="create_end_date"
                          type="date"
                          className="fText gDate"
                          name="create_end_date"
                          size="small"
                          onChange={(e) => setCreate_end_date(e.target.value)}
                          onKeyDown={(e) => e.preventDefault()}
                        />
                      </div>
                    </li>
                    {/* 개인정보 */}
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <span style={{ width: "120px" }}>카테고리</span>
                      <FormControl size="small">
                        <Select
                          sx={{ minWidth: 120 }}
                          defaultValue="null"
                          className="fSelect"
                          id="sel_board_no"
                          name="sel_board_no"
                          onChange={(e) => setCategoryName(e.target.value)}
                        >
                          <MenuItem value="null">전체</MenuItem>
                          {bc_list.map((bc, i) => (
                            <MenuItem key={i} value={bc.value}>
                              {bc.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </li>
                    {/* 개인정보 */}
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <span style={{ width: "120px" }}>제목</span>
                      <FormControl sx={{ minWidth: 120 }} size="small">
                        <TextField
                          label="검색어"
                          type="text"
                          name="title"
                          id="title"
                          className="fText"
                          style={{ width: "auto" }}
                          onChange={(e) => setTitle(e.target.value)}
                          size="small"
                        />
                      </FormControl>
                    </li>
                    {/* 검색 버튼 */}
                    <li style={{ textAlign: "center", marginTop: "20px" }}>
                      <Button
                        id="eBtnSearch"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => { getBbsData(1); setCheckedBbsItems([]); setAllBbsChecked(false); }}
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
          {/* 게시판 목록 */}
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="stretch"
            style={{ marginBottom: "50px" }}
          >
            <Grid item xs={12} sx={{ mb: 0.3 }}>
              <Typography variant="h5" flexGrow={1}>
                게시판 목록
              </Typography>
            </Grid>
            {/* 검색 폼 */}
            <Grid item xs={12}>
              <DashboardCard>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleAddModalOpen}
                    className="btnNormal"
                    sx={{ ml: 1 }}
                    startIcon={<AddIcon />}
                  >
                    추가
                  </Button>
                  <AddModal addModalOpen={addModalOpen} handleAddModalClose={handleAddModalClose} getBbsData={getBbsData}/>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={delete_choice_bbs}
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
                            checked={allBbsChecked}
                            onChange={handleAllBbsCheck} // 전체 선택 체크박스 핸들러 연결
                          />
                        </TableCell>
                        <TableCell align="center">번호</TableCell>
                        <TableCell align="center">분류</TableCell>
                        <TableCell align="center">제목</TableCell>
                        <TableCell align="center">작성일</TableCell>
                        <TableCell align="center">수정일</TableCell>
                        <TableCell align="center">조회수</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {search_list && search_list.length > 0 ? (
                        search_list.map((ar, i) => (
                          <TableRow key={i} hover tabIndex={-1} role="checkbox">
                            <TableCell padding="checkbox">
                              <Checkbox
                                disableRipple
                                name="use_board[]"
                                className="rowChk"
                                value={ar.boardkey}
                                checked={checkedBbsItems.includes(ar.boardkey)} // 개별 체크박스 상태 관리
                                onChange={(e) =>
                                  handleRowBbsCheck(e, ar.boardkey)
                                } // 개별 체크박스 핸들러 연결
                              />
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => handleDetailModalOpen(ar.boardkey)}
                              style={{ cursor: "pointer" }}
                            >
                              {(page.nowPage - 1) * page.numPerPage + i + 1}
                            </TableCell>
                            <TableCell 
                              align="center"
                              onClick={() => handleDetailModalOpen(ar.boardkey)}
                              style={{ cursor: "pointer" }}
                            >
                              {categoryMap[ar.categorykey] || "X"}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => handleDetailModalOpen(ar.boardkey)}
                              style={{ cursor: "pointer" }}
                            >
                              {ar.title}
                            </TableCell>
                            <DetailModal detailModalOpen={detailModalOpen} handleDetailModalClose={handleDetailModalClose} boardkey={selectedBoardKey} getBbsData={getBbsData} handleEditModalOpen={handleEditModalOpen}/>
                            <EditModal editModalOpen={editModalOpen} handleEditModalClose={handleEditModalClose} getBbsData={getBbsData} boardkey={selectedBoardKey}/>
                            <TableCell align="center">
                              {ar.create_dtm
                                ? new Date(ar.create_dtm)
                                    .toISOString()
                                    .split("T")[0]
                                : "-"}
                            </TableCell>
                            <TableCell align="center">
                              {ar.update_dtm
                                ? new Date(ar.update_dtm)
                                    .toISOString()
                                    .split("T")[0]
                                : "-"}
                            </TableCell>
                            <TableCell align="center">{ar.viewqty}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell align="center" colSpan={10}>
                            <Box sx={{ py: 15, textAlign: "center" }}>
                              <Typography variant="h6" sx={{ mb: 1 }}>
                                검색된 게시판 목록이 없습니다.
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
                    onChange={(e, newPage) => changePage(newPage)}
                  />
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
      <React.Fragment>
        <Dialog
          open={modalOpen}
          onClose={() => {
            setCheckedCateItems([]);
            setModalOpen(false);
          }}
          scroll="paper"
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {modalMode === "add" ? "카테고리 추가" : "카테고리 수정"}
          </DialogTitle>
          <DialogContent dividers="paper">
            <FormControl fullWidth margin="dense">
              <TextField
                required
                margin="dense"
                label="카테고리명"
                type="text"
                fullWidth
                size="small"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={addOrEditBc}>
              {modalMode === "add" ? "추가" : "수정"}
            </Button>
            <Button onClick={delete_choice_cate}>
              {modalMode !== "add" && "삭제"}
            </Button>
            <Button
              onClick={() => {
                setCheckedCateItems([]);
                setModalOpen(false);
              }}
            >
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
