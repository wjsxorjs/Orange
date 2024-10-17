'use client';

import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "align", "float", "blockquote", "list", "bullet", "indent", "background", "color", "link", "image", "video", "height", "width",];
const BC_URL = "/api/admin/board/getAllBc";
const AddImage_URL = "/api/admin/board/addImage";
const Add_URL = "/api/admin/board/add";
const EmptyAdd_URL = "/api/admin/board/empty";
const deleteLatest_URL = "/api/admin/board/deleteLatest";

export default function AddModal(props) {
  const open = props.addModalOpen;
  const onClose = () => {
    const shouldCancel = window.confirm("변경 사항이 저장되지 않을 수 있습니다.");
    if (shouldCancel) {
      navigator.sendBeacon(deleteLatest_URL, userkey);
      props.handleAddModalClose();
    }
  };

  const [bc_list, setBc_list] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [categoryname, setCategoryName] = useState('');
  const [userkey, setUserkey] = useState("1");
  const boardkey = useRef(1);
  const quillRef = useRef();
  const [ReactQuill, setReactQuill] = useState(null);

  const emptyAdd = async () => {
    const formData = new FormData();
    formData.append('userkey', userkey);
    const response = await axios({
      url: EmptyAdd_URL,
      method: "post",
      data: formData
    });
    if (response.data.chk === 1) {
      boardkey.current = response.data.boardkey;
    } else {
      throw new Error('빈 글 생성 실패');
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userkey', userkey);
    formData.append('boardkey', boardkey.current);
    const response = await axios({
      url: AddImage_URL,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    if (response.data.chk === 1) {
      return response.data.filePath;
    } else {
      throw new Error('업로드 실패');
    }
  };

  const uploadContent = async () => {
    if (!title || title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    const formData = new FormData();
    formData.append('boardkey', boardkey.current);
    formData.append('content', content);
    formData.append('title', title);
    formData.append('userkey', userkey);
    formData.append('categoryname', categoryname);
    const response = await axios({
      url: Add_URL,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    if (response.data.chk === 1) {
      alert("게시판 글 작성 완료");
      setTitle('');
      setContent('');
      props.handleAddModalClose();
      props.getBbsData(1);
    } else {
      throw new Error('업로드 실패');
    }
  };

  useEffect(() => {
    let reaction = true;
    if (open) {
      const multiFunction = async () => {
        try {
          const res = await axios.get(BC_URL);
          setBc_list(res.data.bc_list || []);
          if (reaction) {
            emptyAdd();
          }
        } catch (error) {
          setBc_list([]);
        }
      };
      multiFunction();
    }
    return () => {
      reaction = false;
    };
  }, [open]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["link", "image", "video"],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
      handlers: {
        image: async () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.setAttribute('multiple', '');
          input.addEventListener('change', async () => {
            const editor = quillRef.current.getEditor(); // Quill 에디터 인스턴스 가져오기
            const range = editor.getSelection(true);
            const file2 = input.files && input.files[0];
            const files = input.files;
            if (file2) {
              for (const file of files) {
                try {
                  const url = await uploadImage(file);
                  editor.insertEmbed(range.index, "image", url); // 에디터에 이미지 삽입
                  editor.setSelection(range.index + 1);
                } catch (error) {
                  console.error("이미지 삽입 오류", error);
                }
              }
            }
          });
          input.click();
        },
      },
    },
  }), []);

  // 동적 import를 사용한 ReactQuill 설정
  useEffect(() => {
    async function loadQuill() {
      const QuillModule = await import('react-quill');
      setReactQuill(() => QuillModule.default); // 동적으로 ReactQuill 로드
    }
    loadQuill();
  }, []);

  if (!ReactQuill) {
    return <div>Loading editor...</div>; // 로딩 상태 처리
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: { padding: '20px', width: '800px', height: '640px', maxWidth: '90%', borderRadius: '16px' }}} disableEnforceFocus disableAutoFocus aria-hidden={!open}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '10px', marginTop: '10px' }}>
            <select className="fSelect" id="sel_board_no" name="sel_board_no" value={categoryname || ''} onChange={(e) => setCategoryName(e.target.value)}
              style={{ flex: '1', height: '40px', padding: '10px', boxSizing: 'border-box', fontSize: '16px !important' }}>
              <option value="" disabled hidden>:::카테고리 선택:::</option>
              {bc_list && bc_list.map((bc, i) => (
                <option key={i} value={bc.value}>{bc.value}</option>
              ))}
            </select>
            <TextField id="title1" name="title1" placeholder="제목" required fullWidth value={title || ''} onChange={(e) => setTitle(e.target.value)} variant="outlined"
              size="small" sx={{ height: '40px', boxSizing: 'border-box' }} />
          </Box>
        </Box>
        <DialogContent sx={{ width: '100%', height: '410px', overflow: 'auto', padding: 0, marginTop: '10px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            <ReactQuill theme="snow" ref={quillRef} modules={modules} formats={formats} onChange={setContent}
              style={{ height: '400px', width: '100%', marginLeft: '0', marginRight: '0' }} />
          </Box>
        </DialogContent>
        <DialogActions className="dialog-actions" sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
          <Button variant="contained" color="success" onClick={uploadContent} sx={{ fontSize: '12px', color: 'white', marginRight: "10px" }}>
            저장
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#BDBDBD', color: 'white', '&:hover': { backgroundColor: 'gray' }}} onClick={onClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
