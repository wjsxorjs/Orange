import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "/public/css/report.css";
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Content(props) {
  const USER_URL = "/api/user/report/reportUser";
  const POST_URL = "/api/user/report/reportPost";
  const CHK_URL = "/api/user/report/noseeUser"

  const goBack = props.handleContentClose;
  const onClose = props.handleReportClose;
  const titleContent = props.content;
  const reportlistkey = props.reportlistkey;
  const ispost = props.ispost;

  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const reportuserkey = Cookies.get("userkey");
  const [postkey, setPostkey] = useState();
  const [userkey, setUserkey] = useState();

  useEffect(() => {
    setPostkey(props.pvo.postkey);
    setUserkey(props.uvo.userkey);
  }, []);

  const handleMaxText = (e) => {
    if (e.target.value.length <= 300) {
      setText(e.target.value);
    }
  };

  const handleChkbox = (e) => {
    setChecked(e.target.checked);
  };

  function report() {
    if (ispost == 0) {
      axios({
        url: USER_URL,
        method: "post",
        params: {
          reportlistkey: reportlistkey, userkey: userkey, reportuserkey: reportuserkey, content: text ,
        },
      }).then((res) => {
          alert('작성자 신고가 접수되었습니다.');
          onClose();
      })
    } else if (ispost == 1) {
      axios({
        url: POST_URL,
        method: "post",
        params: {
          reportlistkey: reportlistkey, postkey: postkey, reportuserkey: reportuserkey, content: text,
        },
      }).then((res) => {
        alert('게시글 신고가 접수되었습니다.');
        onClose();
      })
    }
  }

  function handleReport() {
    if (reportlistkey === '' || reportlistkey === undefined) {
      alert('신고 항목을 선택해 주세요.');
      return;
    }
    if (checked) {
      axios({
        url: CHK_URL,
        method: "post",
        params: {
          userkey: reportuserkey,
          noseeuserkey: userkey,
        },
      }).then((res) => {
        if (res.data.msg == 'exist') {
          alert('이미 차단된 사용자입니다.');
        } else if (res.data.msg == 'new') {
          report();
        }
      });
    } else {
      report();
    }
  }

  return (
    <div>
      <Box className="modal-box" sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, width: 600 }}>
        <div className='divv'>
          <button onClick={() => { goBack(); }} style={{ cursor: 'pointer', fontSize: '20px' }}>&lt;</button>
          <button onClick={() => { onClose(); }} className="link-button" style={{ cursor: 'pointer', fontSize: '20px' }}>X</button>
        </div>
        <Typography id="modal-modal-title" variant="subtitle1" component="h2" sx={{ fontWeight: 'bold', mb: 1, fontSize: '16px', marginBottom: '10px' }}>
          {titleContent}
        </Typography>
        <TextField fullWidth multiline rows={4} variant="outlined" value={text} onChange={handleMaxText} placeholder="신고 내용을 입력해주세요. (최대 300자)" className='text-field'
          helperText={`${text.length}/300`} />
        <FormControlLabel label="이 사용자의 글 보지 않기" className="label-custom" 
          sx={{ mb: 1, '& .MuiFormControlLabel-label': { fontSize: '14px', alignItems: 'center', paddingTop: '4px;' } }}
          control={ <Checkbox checked={checked} onChange={handleChkbox} className="checkbox-custom" />} />
        <Typography variant="body2" sx={{ mb: 2, fontSize: '12px', color: 'gray' }}>
          '마이페이지 &gt; 나의 정보 &gt; 게시글 미노출 사용자 관리'에서 취소할 수 있습니다.
        </Typography>
        <Button variant="contained" fullWidth onClick={handleReport} sx={{ backgroundColor: '#ff5722', color: 'white', mt: 1, '&:hover': { backgroundColor: '#e64a19' }, marginTop: 0 }}>
          신고하기
        </Button>
      </Box>
    </div>
  );
}
