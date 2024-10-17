import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Cookies from "js-cookie";

export default function PriceOfferModal(props) {
  const openPO = props.openPO;
  const handleClosePO = props.handleClosePO;

  const userkey = Cookies.get("userkey");

  const [pvo, setPvo] = useState({});
  const [price, setPrice] = useState();
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    setPvo(props.pvo);
    if (props.pvo.price != undefined && firstTime) {
      setPrice(props.pvo.price);
      setFirstTime(false);
    }
  }, [openPO]);

  function priceoffer() {
    if (confirm("해당 가격으로 제안하시겠습니까?")) {
      axios({
        url: "/api/adpost/priceOffer",
        method: "get",
        params: {
          postkey: pvo.postkey,
          offeruserkey: userkey,
          price: price,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.result == 1) {
          alert("해당 제안이 전송되었습니다.");
          handleClosePO();
        } else {
          alert("전송 과정에서 오류가 생겼습니다.");
        }
      });
    }
  }

  return (
    <Fragment>
      <Dialog
        open={openPO}
        onClose={handleClosePO}
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
          가격 제안하기
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <OutlinedInput
              size="small"
              id="price"
              name="price"
              placeholder="가격을 입력해주세요."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              endAdornment={<InputAdornment position="end">원</InputAdornment>}
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
              priceoffer();
            }}
          >
            제출
          </Button>
          <Button onClick={handleClosePO}>취소</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
