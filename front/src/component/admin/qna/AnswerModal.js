'use client';

import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';

let ReactQuill;

export default function AnswerModal(props) {
  const open = props.answerModalOpen;
  const onClose = props.handleAnswerModalClose;
  const qnakey = props.qnakey;
  const search = props.search;

  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "align", "float", "blockquote", "list", "bullet", "indent", "background", "color", "link", "image", "video", "height", "width"];
  
  const quillRef = useRef();
  const API_URL = `/api/qna/getQuestion?qnakey=${qnakey}`;
  const ANSWER_URL = `/api/qna/answer?qnakey=${qnakey}`;
  
  const [vo, setVo] = useState({});
  const [content, setContent] = useState();
  const [answerContent, setAnswerContent] = useState('');

  function getData() {
    setContent('');
    setAnswerContent('');
    axios.get(API_URL).then((res) => {
      setVo(res.data.qvo);
      if (res.data.qvo.content) {
        setContent(res.data.qvo.content || '');
      }
    });
  }

  useEffect(() => {
    if (qnakey) {
      getData();
    }
  }, [qnakey]);

  const handleChange = (value) => {
    setAnswerContent(value);
  };

  function answer() {
    axios.post(ANSWER_URL, {
        qnakey: qnakey,
        answer: answerContent,
      }, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.data.cnt === 1) {
          alert("답변 완료");
          search(1);
          onClose();
        } else {
          throw new Error('업로드 실패');
        }
      });
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["link", "image", "video"],
        [{ header: [1, 2, 3, false] }],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }]
      ],
    },
  }), []);

  // 동적 import를 사용한 Quill 로드 처리
  const [quillLoaded, setQuillLoaded] = useState(false);

  useEffect(() => {
    async function loadQuill() {
      const QuillModule = await import('react-quill');
      ReactQuill = QuillModule.default;
      setQuillLoaded(true); // Quill 로드 완료 시 상태 업데이트
    }
    loadQuill();
  }, []);

  if (!quillLoaded) {
    return <div>Loading editor...</div>; // Quill 로딩 중에는 로딩 메시지 표시
  }

  return (
<React.Fragment>
  <Dialog 
    open={open} 
    onClose={onClose} 
    BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
    PaperProps={{
      sx: {
        padding: '20px',
        width: '700px',
        maxWidth: '90%',
        borderRadius: '16px',
        boxShadow: 'none',
        minHeight: '500px',
      }
    }}
  >
    <DialogContent sx={{ padding: 0, width: '100%', boxSizing: 'border-box' }}>
      {/* 제목 부분 */}
      <TextField 
        id="title" 
        name="title" 
        placeholder="제목" 
        required 
        value={vo.title || ''} 
        variant="outlined" 
        size="small" 
        InputProps={{ readOnly: true }}
        sx={{ 
          width: '100%', 
          height: '40px', 
          padding: '10px', 
          marginBottom: '10px', 
          boxSizing: 'border-box' 
        }} 
      />
      {/* 문의 내용 */}
      <Box 
        component="div" 
        sx={{ 
          border: '1px solid lightgray', 
          padding: '10px', 
          minHeight: '100px' 
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: "[문의 내용]<br/><br/>" + content }} />
      </Box>

      {/* 답변 부분 */}
      <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '5px' }}>
        <strong>[ 답 변 ]</strong>
      </Typography>
      
      {/* Quill 에디터 */}
      <ReactQuill
        theme="snow"
        ref={quillRef}
        modules={modules}
        formats={formats}
        value={answerContent}
        onChange={handleChange}
        style={{ width: '100%', height: '300px' }}
      />
    </DialogContent>

    {/* 저장 및 취소 버튼 */}
    <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
      <Button
        variant="contained"
        color="success"
        onClick={answer}
        sx={{ 
          fontSize: '12px', 
          color: 'white', 
          marginRight: "10px" 
        }}
      >
        저장
      </Button>
      <Button
        variant="contained"
        onClick={onClose}
        sx={{
          backgroundColor: "#BDBDBD",
          color: "white",
          "&:hover": { backgroundColor: "gray" }
        }}
      >
        취소
      </Button>
    </DialogActions>
  </Dialog>
</React.Fragment>

  );
};
