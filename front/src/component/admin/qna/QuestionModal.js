'use client'

import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function Page(props) {
  const open = props.questionModalOpen;
  const onClose = () => { props.handleQuestionModalClose(); };
  const qnakey = props.qnakey;

  const API_URL = `/api/qna/getQuestion?qnakey=${qnakey}`;
  const DEL_URL = `/api/qna/delete?qnakey=${qnakey}`;
  const [vo, setVo] = useState({});

  function getData() {
      axios.get(
          API_URL
      ).then((res) => {
          setVo(res.data.qvo);
      });
  }

  useEffect(() => {
    if (qnakey) {
      getData();
    }
  }, [qnakey]);
  
  function del() {
    axios.post(
      DEL_URL,
    ).then(res => {
        alert("삭제 완료");
        onClose();
      });
    }

    const goAnswer = () => {
      onClose(); 
      props.handleAnswerModalOpen(qnakey);
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth disableEnforceFocus disableAutoFocus
            PaperProps={{ sx: { width: '900px', maxWidth: '90%', borderRadius: '16px', boxShadow: 'none', } }}
            BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', position: 'relative' }}>
        상세보기
        <Typography onClick={onClose} sx={{ position: 'absolute', fontSize: '18px', right: 14, top: 14, cursor: 'pointer', fontWeight: 'bold', }} >
          X
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ minWidth: 200, borderRadius: 2, boxShadow: 3, width: '100%', overflowX: 'auto' }}>
          <Table sx={{ border: '1px solid lightgray' }} aria-label="공지사항 표">
            <TableBody>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                  문의사항 번호
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '0.9rem', borderRight: '1px solid lightgray', borderBottom: '1px solid lightgray', width:'30%' }}>
                  {vo.qnakey}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                  사용자 번호
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '0.9rem', borderBottom: '1px solid lightgray', width:'30%' }}>
                  {vo.userkey}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                  작성일
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '0.9rem', borderRight: '1px solid lightgray', borderBottom: '1px solid lightgray', width:'30%' }}>
                  {vo.create_dtm}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                  답변 날짜
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '0.9rem', borderBottom: '1px solid lightgray', width:'30%' }}>
                  {vo.answer_dtm ? vo.answer_dtm : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                  제목
                </TableCell>
                <TableCell align="center" colSpan={3} sx={{ fontSize: '0.9rem', borderBottom: '1px solid lightgray' }}>
                  {vo.title}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                  문의 내용
                </TableCell>
                <TableCell
                  align="left"
                  colSpan={3}
                  dangerouslySetInnerHTML={{ __html: vo.content }}
                  sx={{ fontSize: '0.9rem', borderBottom: '1px solid lightgray', minHeight: '200px', padding: '20px' }}
                />
              </TableRow>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                  답변 내용
                </TableCell>
                <TableCell align="center" colSpan={3} sx={{ fontSize: '0.9rem', borderBottom: '1px solid lightgray' }}>
                  {vo.answer ? (
                    <div dangerouslySetInnerHTML={{ __html: vo.answer }} />
                  ) : (
                    '아직 답변하지 않았습니다.'
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions className="dialog-actions" sx={{ justifyContent: 'center', paddingTop: '20px', paddingBottom: '10px' }}>
          <Button variant="contained" color="success" onClick={goAnswer} sx={{ fontSize: '12px', color: 'white' }}>
            답변하기
          </Button>
          <Button variant="contained" color="error" onClick={del} sx={{ fontSize: '12px', color: 'white' }}>
            삭제
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
