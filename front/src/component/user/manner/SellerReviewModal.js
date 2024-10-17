'use client'

import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, List, ListItem, Divider, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

export default function SellerReviewModal(props) {
  const REVIEW_URL = "/api/user/reviewList";
  const SELLER_REVIEW_URL = "/api/user/sellerReview";
  const MANNER_TEMP_URL = "/api/user/manner/setMannerTemp";
  const open = props.reportOpen;
  const onClose = () => {
    props.handleReportClose();
    setSelectedKeys([]);
  };
  
  const [list, setList] = useState([]);
  const [preference, setPreference] = useState('5');
  const [selectedRating, setSelectedRating] = useState("최고예요!");
  const [selectedKeys, setSelectedKeys] = useState([]);
  const dealuserkey = props.buyerUserkey;
  const userkey = Cookies.get("userkey");
  
  function getData() {
    axios.get(REVIEW_URL, { params: { preference } })
      .then((res) => {
        setList(res.data.r_ar || []);
      });
  }

  function setMannerTemp() {
    axios({
      url: MANNER_TEMP_URL,
      method: "post",
      params: { userkey: dealuserkey },
    }).then((res) => {});
  }

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setSelectedRating(value);
    switch (value) {
      case "별로예요":
        setPreference('3');
        break;
      case "좋아요!":
        setPreference('4');
        break;
      case "최고예요!":
        setPreference('5');
        break;
      default:
        setPreference('5');
    }
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedKeys([value]);
    } else {
      setSelectedKeys([]);
    }
  };
  
  function send() {
    if (selectedKeys.length === 0) {
      alert("항목을 선택해 주세요.");
      return;
    }
    const confirmation = confirm("작성한 후기는 수정할 수 없습니다. 계속 진행하시겠습니까?");
    if (!confirmation) {
      return;
    }
    axios({
      url: SELLER_REVIEW_URL,
      method: "post",
      params: {
        reviewlistkey: selectedKeys,
        postkey: props.postkey,
        userkey: dealuserkey,
        estimateuserkey: userkey,
      },
    }).then((res) => {
      setMannerTemp();
      alert("후기 작성 완료")
      if (props.onReviewSubmit) {
        props.onReviewSubmit(selectedKeys); // 선택된 키를 부모에게 전달
      }
      onClose();
    }).catch((error) => {
      console.error("후기 작성 중 오류가 발생했습니다.", error);
    });
  }

  useEffect(() => {
    if (open) {
      getData();
    }
  }, [preference, open]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "white", p: 4, borderRadius: "10px", width: "90%", maxWidth: "400px" }}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
          거래 후기 보내기
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', mb: 3 }}>
          거래 선호도는 나만 볼 수 있어요.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box textAlign="center" sx={{ mx: 3 }} onClick={() => handleRatingChange({ target: { value: "별로예요" } })}>
            <img src="/img/review/bad.png" alt="bad" style={{ width: '80px', height: '100px', cursor: 'pointer', filter: selectedRating === "별로예요" ? 'none' : 'grayscale(100%)' }} />
          </Box>
          <Box textAlign="center" sx={{ mx: 3 }} onClick={() => handleRatingChange({ target: { value: "좋아요!" } })}>
            <img src="/img/review/good.png" alt="good" style={{ width: '80px', height: '100px', cursor: 'pointer', filter: selectedRating === "좋아요!" ? 'none' : 'grayscale(100%)' }} />
          </Box>
          <Box textAlign="center" sx={{ mx: 3 }} onClick={() => handleRatingChange({ target: { value: "최고예요!" } })}>
            <img src="/img/review/best.png" alt="best" style={{ width: '80px', height: '100px', cursor: 'pointer', filter: selectedRating === "최고예요!" ? 'none' : 'grayscale(100%)' }} />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '16px', fontWeight: 'bold' }}>
          {selectedRating === "별로예요" ? "어떤 점이 별로였나요?" : "어떤 점이 좋았나요?"}
        </Typography>
        <List>
          {list.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <FormControlLabel
                  control={
                  <Checkbox
                    value={item.reviewlistkey}
                    checked={selectedKeys.includes(item.reviewlistkey.toString())}
                    onChange={handleCheckboxChange}
                    sx={{ color: '#BDBDBD', '&.Mui-checked': { color: '#FF8000', }, }}
                  />
                  }
                  label={item.review}
                  sx={{ width: '100%' }}
                />
              </ListItem>
              <Divider light />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <button onClick={send} style={{ marginRight: '20px', padding: '10px 20px', backgroundColor: '#FF8000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '80px', display: 'inline-block' }}>
            보내기
          </button>
          <button onClick={onClose} style={{ marginLeft: '20px', padding: '10px 20px', backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '80px', display: 'inline-block' }}>
            취소
          </button>
        </Box>
      </Box>
    </Modal>
  );
}
