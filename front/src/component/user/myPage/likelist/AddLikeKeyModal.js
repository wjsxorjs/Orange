import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Button,
    TextField,
  } from "@mui/material";
  import { Fragment, useEffect, useRef, useState } from "react";
  import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
  import CloseIcon from "@mui/icons-material/Close";
  import axios from "axios";
  import Cookies from "js-cookie";
  
  export default function AddLikeKeyModal(props) {
    const openPO = props.openPO;
    const handleClosePO = props.handleClosePO;
  
    const userkey = Cookies.get("userkey");
  
    const [keyword, setKeyword] = useState("");
    const [likeKeyList, setLikeKeyList] = useState([]);
  
  
    function addKeyword() {
        if(likeKeyList.includes(keyword)){
            alert("이미 등록된 키워드입니다.");
            return;
        }
        if (confirm("해당 키워드를 관심 키워드로 등록하시겠습니까?")) {
            axios({
            url: "/user/api/like/keyword",
            method: "get",
            params: {
                userkey: userkey,
                content: keyword,
            },
            headers: {
                "Content-Type": "application/json",
            },
            }).then((res) => {
            if (res.data.result_insert > 0) {
                alert("정상적으로 등록되었습니다.");
                setKeyword();
                handleClosePO(true);
            } else {
                alert("오류가 발생했습니다.");
            }
            });
        }
        }

        useEffect(()=>{
          setKeyword("");
            var tmpLcList = [];
            for(var i=0; i<props.likeList.length;i++){
              tmpLcList.push(props.likeList[i].content);
            }
            setLikeKeyList(tmpLcList);
        },[openPO])
  
    return (
      <Fragment>
        <Dialog
          open={openPO}
          onClose={()=>handleClosePO(false)}
          PaperProps={{
            component: "form",
          }}
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            관심 키워드 등록
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <TextField
                size="small"
                id="keyword"
                name="keyword"
                placeholder="키워드를 입력해주세요."
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FF8000', },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#FF8000', }
                }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={() => {
                addKeyword();
              }}
              sx={{
                color:"#22aa22",
                marginRight: '0 !important',
              }}
            >
              제출
            </Button>
            <Button
              onClick={()=>{handleClosePO(false)}}
              sx={{
                color:"#ff4f00",
                marginLeft: '0 !important',
              }}
            >취소</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
  