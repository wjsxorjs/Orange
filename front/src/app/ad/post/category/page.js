"use client";
import React, { useEffect, useRef, useState } from "react";
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
  ImageList,
  ImageListItem,
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
  const API_URL = "/api/admin/category/list";
  const [categoryname, setCategoryname] = useState([]);
  const [categorykey, setCategorykey] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(
    "/img/admin/category/add_image.png"
  );
  const [previewImage, setPreviewImage] = useState(
    "/img/admin/category/add_image.png"
  );
  const DEL_URL = "/admin/category/delete";
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showingData, setShowingData] = useState(true);
  const [categoryPostCountList, setCategoryPostCountList] = useState(null);

  // 파일 입력 요소에 대한 참조
  const fileInputRef = useRef(null);

  // 카테고리 추가
  function sendData() {
    const formData = new FormData();
    formData.append("categoryname", categoryname); // 카테고리 이름 추가
    if (categoryname == null) {
      alert("카테고리 명을 입력해주세요.");
    }
    if (uploadedImage instanceof FileList && uploadedImage.length > 0) {
      formData.append("file", uploadedImage[0]); // 선택된 파일 추가
      axios({
        url: "/api/admin/category/add",
        method: "post",
        data: formData, // FormData 객체를 data로 설정
        headers: {
          "Content-Type": "multipart/form-data", // 멀티파트 폼 데이터 설정
        },
      })
        .then((res) => {
          if (res.data.cnt === 1) {
            alert("저장완료");
            window.location.reload();
          }
          return res;
        })
        .catch((error) => {
          console.error("Error uploading file", error);
        });
    } else {
      axios({
        url: "/api/admin/category/add",
        method: "post",
        data: formData,
      })
        .then((res) => {
          if (res.data.cnt === 1) {
            alert("저장완료");
            window.location.reload();
          }
          return res;
        })
        .catch((error) => {
          console.error("Error uploading file", error);
        });
    }
  }

  // 카테고리 수정 함수
  function sendEditData() {
    const formData = new FormData();
    formData.append("categorykey", categorykey); // 카테고리 이름 추가
    formData.append("categoryname", categoryname); // 카테고리 이름 추가

    if (categoryname == null) {
      alert("카테고리 명을 입력해주세요.");
    }
    if (uploadedImage instanceof FileList && uploadedImage.length > 0) {
      formData.append("file", uploadedImage[0]); // 선택된 파일 추가
      axios({
        url: "/api/admin/category/edit",
        method: "post",
        data: formData, // FormData 객체를 data로 설정
        headers: {
          "Content-Type": "multipart/form-data", // 멀티파트 폼 데이터 설정
        },
      })
        .then((res) => {
          if (res.data.cnt === 1) {
            alert("저장완료");
            window.location.reload();
          }
          return res;
        })
        .catch((error) => {
          console.error("Error uploading file", error);
        });
    } else {
      axios({
        url: "/api/admin/category/edit",
        method: "post",
        data: formData,
      })
        .then((res) => {
          if (res.data.cnt === 1) {
            alert("저장완료");
            window.location.reload();
          }
          return res;
        })
        .catch((error) => {
          console.error("Error uploading file", error);
        });
    }
  }

  useEffect(() => {
    callData();
  }, []);

  const postCountMap = categoryPostCountList
    ? Object.entries(categoryPostCountList).reduce((acc, [key, value]) => {
      acc[key] = value.post_count; // key는 categorykey, value는 각 category 객체
      return acc;
    }, {})
    : {};

  function callData() {
    axios.get(API_URL).then((response) => {
      setCategoryList(response.data.category_list);
      setCategoryPostCountList(response.data.post_count);
      setShowingData(true);
    });
  }

  function callDeletedData() {
    const API_URL = "/api/admin/category/deleted";
    axios.get(API_URL).then((response) => {
      setCategoryList(response.data.category_list);
      setShowingData(false);
    });
  }

  // 카테고리 이름 변경시 저장
  const handleCategoryNameChange = (e) => {
    setCategoryname(e.target.value);
  };

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
    setPreviewImage("/img/admin/category/add_image.png");
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 열기
  const openEditModal = (category) => {
    setCategoryname(category.categoryname);
    setSelectedCategory(category);
    setPreviewImage(category.img_url);
    setUploadedImage(category.img_url);
    setCategorykey(category.categorykey);
    setIsEditModalOpen(true);
  };

  // 모달 닫기
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  // 파일 업로드 버튼 클릭 시 파일 입력 요소 클릭 이벤트 발생
  const handleButtonClick = (e) => {
    fileInputRef.current.click();
  };

  // 파일 입력 요소의 값이 변경되면 호출되는 함수
  const handleChange = (e) => {
    // 선택한 파일 정보를 콘솔에 출력
    let file = e.target.files;
    setUploadedImage(file);
    let fileRead = new FileReader();
    fileRead.onload = function () {
      setPreviewImage(fileRead.result);
    };
    fileRead.readAsDataURL(file[0]);
  };

  // 전체 선택 체크박스
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked); // 전체 선택 상태 업데이트
    if (checked) {
      // 전체 선택 시, 모든 유저의 키를 checkedItems에 추가
      const allCheckedItems = categoryList.map((item) => item.categorykey);
      setCheckedItems(allCheckedItems);
    } else {
      // 전체 선택 해제
      setCheckedItems([]);
    }
  };

  // 개별 체크박스 핸들러
  const handleRowCheck = (e, categorykey) => {
    const checked = e.target.checked;
    let updatedCheckedItems = [...checkedItems];
    if (checked) {
      // 체크 시 해당 유저의 키를 checkedItems에 추가
      updatedCheckedItems.push(categorykey);
    } else {
      // 체크 해제 시 유저의 키 checkedItems에서 제거
      updatedCheckedItems = updatedCheckedItems.filter(
        (key) => key !== categorykey
      );
    }
    setCheckedItems(updatedCheckedItems);
    // 모든 유저가 선택되었는지 확인> 전체 선택 상태 업데이트
    setAllChecked(updatedCheckedItems.length === categoryList.length);
  };

  // 선택 카테고리 삭제
  function delete_choice() {
    if (checkedItems.length === 0) {
      alert("삭제할 항목이 선택되지 않았습니다.");
      return;
    }

    const userConfirmed = window.confirm("선택한 항목을 삭제하시겠습니까?");

    if (!userConfirmed) {
      return; // 사용자가 취소를 클릭하면 함수를 종료
    }

    axios
      .post(DEL_URL, checkedItems, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("카테고리 삭제 완료."); // 체크박스 선택 해제
        setCheckedItems([]); // 개별 체크박스 해제
        setAllChecked(false); // 전체 선택 체크박스 해제
        window.location.reload();
      })
      .catch((error) => {
        alert("카테고리 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });
  }

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
                카테고리 목록
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
                    onClick={showingData ? callDeletedData : callData}
                    className="btnNormal"
                    sx={{ ml: 1 }}
                  >
                    {showingData ? "삭제된 목록 보기" : "게시중인 목록 보기"}
                  </Button>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={openModal}
                    className="btnNormal"
                    sx={{ ml: 1 }}
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
                            onChange={handleAllCheck} // 전체 선택 체크박스 핸들러 연결
                          />
                        </TableCell>
                        <TableCell align="center">번호</TableCell>
                        <TableCell align="center">카테고리명</TableCell>
                        <TableCell align="center">이미지</TableCell>
                        <TableCell align="center">생성일자</TableCell>
                        <TableCell align="center">수정일자</TableCell>
                        <TableCell align="center">삭제일자</TableCell>
                        <TableCell align="center">게시글 수</TableCell>
                        <TableCell align="center">삭제여부</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categoryList &&
                        categoryList.map((category, index) => {
                          // postCountMap에서 categorykey로 post_count를 바로 가져옴
                          const postCount = postCountMap[category.categorykey] || 0; // 없으면 0으로 처리

                          return (
                            <TableRow
                              key={category.categorykey}
                              hover
                              tabIndex={-1}
                              role="checkbox"
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  disableRipple
                                  name="use_check[]"
                                  className="rowChk"
                                  checked={checkedItems.includes(category.categorykey)} // 개별 체크박스 상태 관리
                                  onChange={(e) => handleRowCheck(e, category.categorykey)} // 개별 체크박스 핸들러 연결
                                />
                              </TableCell>
                              <TableCell align="center" onClick={() => openEditModal(category)}>
                                {index + 1}
                              </TableCell>
                              <TableCell onClick={() => openEditModal(category)}>
                                {category.categoryname}
                              </TableCell>
                              <TableCell onClick={() => openEditModal(category)}>
                                {category.img_url ? (
                                  <img
                                    src={category.img_url}
                                    alt="카테고리 이미지"
                                    style={{ width: "100px", height: "auto" }}
                                  />
                                ) : (
                                  "이미지 없음"
                                )}
                              </TableCell>
                              <TableCell align="center" onClick={() => openEditModal(category)}>
                                {new Date(category.create_dtm).toISOString().split("T")[0]}
                              </TableCell>
                              <TableCell align="center" onClick={() => openEditModal(category)}>
                                {new Date(category.update_dtm).toISOString().split("T")[0]}
                              </TableCell>
                              <TableCell align="center" onClick={() => openEditModal(category)}>
                                {category.delete_dtm
                                  ? new Date(category.delete_dtm).toISOString().split("T")[0]
                                  : "-"}
                              </TableCell>
                              {/* postCountMap에서 가져온 post_count 출력 */}
                              <TableCell align="center">{postCount}</TableCell>
                              <TableCell align="center" onClick={() => openEditModal(category)}>
                                {category.isdeleted === "0" ? "게시중" : "삭제됨"}
                              </TableCell>
                            </TableRow>
                          );
                        })}

                      {categoryList == null ||
                        (categoryList.length == 0 && (
                          <TableRow>
                            <TableCell align="center" colSpan={7}>
                              <Box sx={{ py: 15, textAlign: "center" }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                  검색된 카테고리 목록이 없습니다.
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
      {/* 카테고리 추가 모달 */}
      <React.Fragment>
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          scroll="paper"
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            카테고리 추가
          </DialogTitle>
          <DialogContent dividers="paper">
            <FormControl fullWidth margin="dense">
              <TextField
                required
                margin="dense"
                id="categoryname"
                name="categoryname"
                label="카테고리 이름을 입력해주세요."
                type="text"
                fullWidth
                size="small"
                onChange={handleCategoryNameChange}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <ImageList cols={2} gap={8} id="dragImageList" ref={fileInputRef}>
                <ImageListItem
                  style={{
                    width: 400,
                    height: 450,
                    position: "relative",
                    marginLeft: 80,
                  }}
                  draggable="true"
                  className="draggable"
                >
                  <img
                    src={previewImage}
                    onClick={handleButtonClick}
                    alt="Uploaded Preview"
                    ref={fileInputRef} // ref 설정
                    style={{
                      position: "absolute",
                      width: "400px",
                      height: "400px",
                      left: "50%",
                      top: "55%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </ImageListItem>
              </ImageList>
              <TextField
                margin="dense"
                name="file"
                ref={fileInputRef}
                type="file"
                fullWidth
                size="small"
                onChange={handleChange}
              />
            </FormControl>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                type="submit"
                className="modal_close"
                onClick={sendData}
                style={{ marginRight: "8px" }} // 오른쪽에 간격 추가
              >
                추가
              </Button>
              <Button onClick={closeModal}>닫기</Button>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          open={isEditModalOpen}
          onClose={closeEditModal}
          scroll="paper"
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            카테고리 수정
          </DialogTitle>
          <DialogContent dividers="paper">
            <FormControl fullWidth margin="dense">
              <TextField
                required
                margin="dense"
                id="categoryname"
                name="categoryname"
                value={categoryname}
                type="text"
                fullWidth
                size="small"
                onChange={handleCategoryNameChange}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <ImageList cols={2} gap={8} id="dragImageList" ref={fileInputRef}>
                <ImageListItem
                  style={{
                    width: 400,
                    height: 450,
                    position: "relative",
                    marginLeft: 80,
                  }}
                  draggable="true"
                  className="draggable"
                >
                  <img
                    src={previewImage}
                    onClick={handleButtonClick}
                    alt="Uploaded Preview"
                    ref={fileInputRef} // ref 설정
                    style={{
                      position: "absolute",
                      width: "400px",
                      height: "400px",
                      left: "50%",
                      top: "55%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </ImageListItem>
              </ImageList>
              <TextField
                margin="dense"
                name="file"
                ref={fileInputRef}
                type="file"
                fullWidth
                size="small"
                onChange={handleChange}
              />
            </FormControl>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                type="submit"
                className="modal_close"
                onClick={sendEditData}
                style={{ marginRight: "8px" }} // 오른쪽에 간격 추가
              >
                수정
              </Button>
              <Button onClick={closeModal}>닫기</Button>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}