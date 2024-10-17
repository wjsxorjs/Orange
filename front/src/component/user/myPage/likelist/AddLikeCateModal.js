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
    MenuItem,
  } from "@mui/material";
  import { Fragment, useEffect, useRef, useState } from "react";
  import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
  import CloseIcon from "@mui/icons-material/Close";
  import axios from "axios";
  import Cookies from "js-cookie";
  
  export default function AddLikeCateModal(props) {
    const openPO = props.openPO;
    const handleClosePO = props.handleClosePO;
  
    const userkey = Cookies.get("userkey");
  
    const [categorykey, setCategorykey] = useState("");
    const [category_list, setCategory_list] = useState([]);
    const [likeCateList, setLikeCateList] = useState([]);

    function getCategory() {
        axios({
          url: "/api/category/all",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          setCategory_list(res.data.category_list);
          setCategorykey("");
        });
      }
  
    function addCategory() {
      if (confirm("해당 카테고리를 관심 카테고리로 등록하시겠습니까?")) {
        axios({
          url: "/user/api/like/category",
          method: "get",
          params: {
            userkey: userkey,
            categorykey: categorykey,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.data.result_insert > 0) {
            alert("정상적으로 등록되었습니다.");
            handleClosePO(true);
          } else {
            alert("오류가 발생했습니다.");
          }
        });
      }
    }
    
    useEffect(()=>{
        var tmpLcList = [];
        for(var i=0; i<props.likeList.length; i++){
            tmpLcList.push(props.likeList[i].categorykey)
        }
        setLikeCateList(tmpLcList);
        getCategory();
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
            관심 카테고리 등록
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <TextField
                autoFocus
                required
                margin="dense"
                id="categorykey"
                name="categorykey"
                label="카테고리"
                select
                fullWidth
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FF8000', },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#FF8000', }
                }}
                value={categorykey}
                onChange={(e) => setCategorykey(e.target.value)}
              >
                {category_list.map((item) => {
                    if(!likeCateList.includes(item.categorykey))
                    return(
                    <MenuItem key={item.categorykey} value={item.categorykey}>
                        {item.categoryname}
                    </MenuItem>
                )})}
              </TextField>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={() => {
                addCategory();
              }}
              sx={{
                color:"#22aa22",
                marginRight: '0 !important',
              }}
            >
              제출
            </Button>
            <Button
              onClick={()=>handleClosePO(false)}
              sx={{
                color:"#ff4f00",
                marginLeft: '0 !important',
              }}
            >
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
  