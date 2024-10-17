"use client";
import React, { useEffect, useRef, useState } from "react";
import "/public/css/admin/user.css";
import axios from "axios";
import PageContainer from "@/component/admin/container/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from '@mui/icons-material/Check';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DashboardCard from "@/component/admin/shared/DashboardCard";

export default function Page() {
  const ALL_URL = "/api/user/badge/getAllBadge";
  const ALL_OFF_URL = "/api/user/badge/getAllOffBadge";
  const EDIT_URL = "/api/user/badge/editBadge";
  const CHK_ON = "/api/user/badge/chkBadgeOn";
  const CHK_OFF = "/api/user/badge/chkBadgeOff";
  const [badgeList, setBadgeList] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [onData, setOnData] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [name, setName] = useState(null);
  const [precontent, setPrecontent] = useState(null);
  const [postcontent, setPostcontent] = useState(null);
  const [isrepresentable, setIsrepresentable] = useState(null);

  useEffect(() => {
    getAllBadge();
  }, []);

  function getAllBadge() {
    axios.get(ALL_URL).then((response) => {
      setBadgeList(response.data.all);
      setOnData(true);
      setCheckedItems([]);
      setAllChecked(false);
    });
  }

  function getAllOffBadge() {
    axios.get(ALL_OFF_URL).then((response) => {
      setBadgeList(response.data.allOff);
      setOnData(false);
      setCheckedItems([]);
      setAllChecked(false);
    })
  }

  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    if (checked) {
      const allCheckedItems = badgeList.map((item) => item.badgekey);
      setCheckedItems(allCheckedItems);
    } else {
      setCheckedItems([]);
    }
  };

  const handleRowCheck = (e, badgekey) => {
    const checked = e.target.checked;
    let updatedCheckedItems = [...checkedItems];
    if (checked) {
      updatedCheckedItems.push(badgekey);
    } else {
      updatedCheckedItems = updatedCheckedItems.filter(
        (key) => key !== badgekey
      );
    }
    setCheckedItems(updatedCheckedItems);
    setAllChecked(updatedCheckedItems.length === badgeList.length);
  };
  
  const handleEditClick = () => {
    if (checkedItems.length === 0) {
      alert("항목을 선택해주세요.");
      return;
    }
    if (checkedItems.length !== 1) {
      alert("항목을 하나만 선택해주세요.");
      return;
    }
    const badgeToEdit = badgeList.find(
      (badge) => badge.badgekey === checkedItems[0]
    );
    if (badgeToEdit) {
      openEditModal(badgeToEdit);
    }
  };
  
  function badgeOff() {
    if (checkedItems.length === 0) {
      alert("항목이 선택되지 않았습니다.");
      return;
    }
    axios
      .post(CHK_OFF, checkedItems, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("배지 비활성화 완료.");
        setCheckedItems([]);
        setAllChecked(false);
        getAllBadge();
      });
  }

  function badgeOn() {
    if (checkedItems.length === 0) {
      alert("항목이 선택되지 않았습니다.");
      return;
    }
    axios
      .post(CHK_ON, checkedItems, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("배지 활성화 완료.");
        setCheckedItems([]);
        setAllChecked(false);
        getAllBadge();
      });
  }

  function updateBadge(badgekey, file, name, precontent, postcontent, isrepresentable) {
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    } else if (imgUrl) {
      formData.append("image", imgUrl);
    }
    formData.append("badgekey", badgekey);
    formData.append("name", name);
    formData.append("precontent", precontent);
    formData.append("postcontent", postcontent);
    formData.append("isrepresentable", isrepresentable);
  
    return axios({
      url: EDIT_URL,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.data.chk === 1) {
          alert("배지 수정이 완료되었습니다.");
          closeEditModal();
          getAllBadge();
      } else {
          console.error("서버 응답 에러:", response.data.errorMessage || "업로드 실패");
          throw new Error(response.data.errorMessage || "업로드 실패");
      }
    })
    .catch((error) => {
        console.error("업로드 중 에러 발생:", error);
        alert(`업로드 실패: ${error.message}`);
    });
  }  

  const openAddModal = () => { setAddModalOpen(true); };
  const closeAddModal = () => { setAddModalOpen(false); };
  const openEditModal = (badgeToEdit) => {
    setSelectedBadge(badgeToEdit);
    setName(badgeToEdit.name);
    setPrecontent(badgeToEdit.precontent);
    setPostcontent(badgeToEdit.postcontent);
    setIsrepresentable(badgeToEdit.isrepresentable);
    setImgUrl(badgeToEdit.imgurl); 
    setEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <PageContainer title="Dashboard" description="this is Dashboard">
        <Box>
          {/* 카테고리 목록 */}
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="stretch"
            style={{ marginBottom: "50px" }}
          >
            <Grid item xs={12} sx={{ mb: 0.3 }}>
              <Typography variant="h5" flexGrow={1}>
                배지 목록
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
                    onClick={onData ? getAllOffBadge : getAllBadge}
                    className="btnNormal"
                    sx={{ ml: 1 }}
                  >
                    {onData ? "비활성화 배지 보기" : "활성화 배지 보기"}
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={openAddModal}
                    className="btnNormal"
                    sx={{ ml: 1 }}
                    startIcon={<AddIcon />}
                  >
                    추가
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleEditClick}
                    className="btnNormal"
                    sx={{ ml: 1 }}
                    startIcon={<AddIcon />}
                  >
                    수정
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={onData ? badgeOff : badgeOn}
                    className="btnNormal"
                    sx={{ ml: 1 }}
                    startIcon={<CheckIcon />}
                  >
                    {onData ? "비활성화" : "활성화"}
                  </Button>
                </Box>
                <TableContainer sx={{ overflowX: "auto", width: "100%" }}>
                  <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            id="allChk"
                            type="checkbox"
                            className="allChk"
                            checked={allChecked}
                            onChange={handleAllCheck}
                          />
                        </TableCell>
                        <TableCell align="center">번호</TableCell>
                        <TableCell align="center">배지명</TableCell>
                        <TableCell align="center">이미지</TableCell>
                        <TableCell align="center">대표배지 설정 가능 여부</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {badgeList &&
                        badgeList.map((badge, index) => (
                          <TableRow
                            key={badge.badgekey}
                            hover
                            tabIndex={-1}
                            role="checkbox"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                disableRipple
                                name="use_check[]"
                                className="rowChk"
                                checked={checkedItems.includes(
                                  badge.badgekey
                                )}
                                onChange={(e) =>
                                  handleRowCheck(e, badge.badgekey)
                                }
                              />
                            </TableCell>
                            <TableCell align="center">
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">
                              {badge.name}
                            </TableCell>
                            <TableCell align="center">
                              {badge.imgurl ? (
                                <img
                                  src={badge.imgurl}
                                  alt="배지 이미지"
                                  style={{ width: "100px", height: "auto" }}
                                />
                              ) : (
                                "이미지 없음"
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {badge.isrepresentable === "0" ? "X" : "O"}
                            </TableCell>
                          </TableRow>
                        ))}
                      {badgeList == null ||
                        (badgeList.length == 0 && (
                          <TableRow>
                            <TableCell align="center" colSpan={7}>
                              <Box sx={{ py: 15, textAlign: "center" }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                  검색된 배지 목록이 없습니다.
                                </Typography>
                                <Typography variant="body2">
                                  검색 조건을 확인해주세요.
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>

      <Dialog open={addModalOpen} onClose={closeAddModal}>
        <DialogTitle>배지 추가</DialogTitle>
        <DialogContent style={{ paddingBottom: '0' }}>
          <Typography align="center" style={{ whiteSpace: "pre-line" }} >
            새로운 배지 정보를 추가하려면 해당 내용을 이메일로 보내주세요.
            {"\n"}orange@email.com
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddModal} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editModalOpen} onClose={closeEditModal} PaperProps={{ sx: { width: '450px', maxWidth: '100%' } }}>
        <DialogTitle>배지 수정</DialogTitle>
        <DialogContent>
          {selectedBadge && (
            <>
              <TextField
                margin="dense"
                label="배지명"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)} 
                InputLabelProps={{ sx: { fontSize: '1.0rem' } }}
              />
              <Box sx={{ display: 'flex', alignItems: 'flex-start', marginTop: '15px', marginBottom: '20px' }}>
                <Box sx={{ display: 'inline-block' }}>
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      alt="배지 이미지"
                      style={{ width: "150px", height: "auto", marginBottom: "10px" }}
                    />
                  )}
                </Box>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{ 
                    marginLeft: 'auto',
                    marginTop: '10px',
                    padding: '5px',
                  }}>
                  이미지 업로드
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFile(file);
                        const reader = new FileReader();
                        reader.onload = (upload) => {
                          setImgUrl(upload.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </Button>
              </Box>
              <TextField
                margin="dense"
                label="획득 전 설명"
                fullWidth
                value={precontent}
                onChange={(e) => setPrecontent(e.target.value)} 
                InputLabelProps={{ sx: { fontSize: '1.0rem' } }}
                sx={{ marginBottom: '10px' }}
              />
              <TextField
                margin="dense"
                label="획득 후 설명"
                fullWidth
                value={postcontent}
                onChange={(e) => setPostcontent(e.target.value)} 
                InputLabelProps={{ sx: { fontSize: '1.0rem' } }}
              />
              <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                <Typography>대표 배지 설정 가능 여부</Typography>
                <Checkbox
                  checked={isrepresentable === "1"}
                  onChange={(e) => setIsrepresentable(e.target.checked ? "1" : "0")} 
                />
              </FormControl>
            </>
          )}
          <Typography align="center" style={{ whiteSpace: "pre-line", marginTop: '1em' }}>
            배지 부여 조건을 변경하려면 이메일로 보내주세요.
            {"\n"}orange@email.com
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => updateBadge(selectedBadge.badgekey, file, name, precontent, postcontent, isrepresentable)} color="primary">
          수정하기
        </Button>
          <Button onClick={closeEditModal} color="primary">닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
