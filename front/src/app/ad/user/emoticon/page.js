"use client";
import React, { useEffect, useRef, useState } from "react";
import "/public/css/admin/user.css";
import axios from "axios";
import PageContainer from "@/component/admin/container/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
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
    ImageList,
    ImageListItem,
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
    const ALL_URL = "/api/chat/getEmoticon";
    const DEL_URL = "/api/chat/deleteEmoticon";
    const [emoticonList, setEmoticonList] = useState(null);
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emoticonName, setEmoticonName] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        "/img/admin/category/add_image.png"
    );
    const [uploadedImage, setUploadedImage] = useState(
        "/img/admin/category/add_image.png"
    );
    const fileInputRef = useRef(null);

    // 이모티콘 추가
    function sendData() {
        const formData = new FormData();
        if (uploadedImage instanceof FileList && uploadedImage.length > 0) {
            formData.append("file", uploadedImage[0]); // 선택된 파일 추가
            axios({
                url: "/api/chat/admin/emoticon/add",
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
                url: "/api/chat/admin/emoticon/add",
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

    // 선택 이모티콘 삭제
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
            .get(DEL_URL, {
                params: {chattingemojikey: checkedItems}
            })
            .then((response) => {
                alert("이모티콘 삭제 완료."); // 체크박스 선택 해제
                setCheckedItems([]); // 개별 체크박스 해제
                setAllChecked(false); // 전체 선택 체크박스 해제
                window.location.reload();
            })
            .catch((error) => {
                alert("카테고리 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
            });
    }


    useEffect(() => {
        getAllEmoticon();
    }, []);

    function getAllEmoticon() {
        axios.get(ALL_URL).then((response) => {
            setEmoticonList(response.data);
        });
    }

    const handleAllCheck = (e) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        if (checked) {
            const allCheckedItems = emoticonList.map((item) => item.chattingemojikey);
            setCheckedItems(allCheckedItems);
        } else {
            setCheckedItems([]);
        }
    };

    const handleRowCheck = (e, chattingemojikey) => {
        const checked = e.target.checked;
        let updatedCheckedItems = [...checkedItems];
        if (checked) {
            updatedCheckedItems.push(chattingemojikey);
        } else {
            updatedCheckedItems = updatedCheckedItems.filter(
                (key) => key !== chattingemojikey
            );
        }
        setCheckedItems(updatedCheckedItems);
        setAllChecked(updatedCheckedItems.length === emoticonList.length);
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
                                        className="btnNormal"
                                        sx={{ ml: 1 }}
                                        onClick={openModal}
                                        startIcon={<AddIcon />}
                                    >
                                        추가
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        className="btnNormal"
                                        sx={{ ml: 1 }}
                                        startIcon={<ClearIcon />}
                                        onClick={delete_choice}
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
                                                        onChange={handleAllCheck}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">번호</TableCell>
                                                <TableCell align="center">이모티콘</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {emoticonList &&
                                                emoticonList.map((item, index) => (
                                                    <TableRow
                                                        key={item.chattingemojikey}
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
                                                                    item.chattingemojikey
                                                                )}
                                                                onChange={(e) =>
                                                                    handleRowCheck(e, item.chattingemojikey)
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {item.img_url ? (
                                                                <img
                                                                    src={item.img_url}
                                                                    alt="이모티콘 이미지"
                                                                    style={{ width: "100px", height: "auto" }}
                                                                />
                                                            ) : (
                                                                "이미지 없음"
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            {emoticonList == null ||
                                                (emoticonList.length == 0 && (
                                                    <TableRow>
                                                        <TableCell align="center" colSpan={7}>
                                                            <Box sx={{ py: 15, textAlign: "center" }}>
                                                                <Typography variant="h6" sx={{ mb: 1 }}>
                                                                    검색된 이모티콘 목록이 없습니다.
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    검색 조건을 확인해주세요.
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
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
                                                        이모티콘 추가 (* 196 X 196px 크기를 권장합니다.)
                                                    </DialogTitle>
                                                    <DialogContent dividers="paper">
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
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </DashboardCard>
                        </Grid>
                    </Grid>
                </Box>
            </PageContainer>
        </>
    );
}
