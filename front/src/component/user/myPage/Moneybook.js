'use client'
import { Box, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "/public/css/moneybook.css";
import "/public/css/myPage.css";
import "/public/css/profile.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ko';
import dayjs from 'dayjs';

export default function Moneybook(props) {
    const open = props.open;
    const closeMoneyBook = props.closeMoneyBook;
    const userkey = props.userkey;

    const today = new Date();
    
    var todayMonth = (today.getMonth()+1).toString();
    if(todayMonth.length==1){
        todayMonth = "0"+todayMonth;
    }
    const todayYYYYMM = today.getFullYear()+"-"+todayMonth;

    const [yyyymm, setYyyymm] = useState(todayYYYYMM);

    const [dateList, setDateList] = useState([]);

    const [userVO, setUserVO] = useState({});

    const [userSell, setUserSell] = useState([]);
    const [userBuy, setUserBuy] = useState([]);
    const [userGive, setUserGive] = useState([]);
    const [userGet, setUserGet] = useState([]);

    const [neighbor, setNeighbor] = useState([]);
    const [neighborTrade, setNeighborTrade] = useState([]);
    const [neighborGive, setNeighborGive] = useState([]);
    
    function priceFormat(price){
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getTotalPrice(postList){
        const length = postList.length;
        var totalPrice = 0;
        for(var i=0; i<length; i++){
            totalPrice += postList[i].lastprice ? parseInt(postList[i].lastprice) : 0;
        }
        return totalPrice;
    }

    function getDateList(create_dtm){
        var tmpDateList = [];
        var regDate = new Date(create_dtm);
        var nowDate = new Date();
        var regYear = regDate.getFullYear();
        var regMonth = regDate.getMonth()+1;
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth()+1;
        var dateVal = "";
        var dateTxt = "";
        var jMonth = "";
        for(var i = regYear; i<= nowYear;i++){
            if(regYear==nowYear){
                    
                for(var j = regMonth; j<= nowMonth;j++){
                    if(j<10){
                        jMonth = "0"+j;
                    } else{
                        jMonth = j;
                    }
                    dateVal = `${i}-${jMonth}`;
                    dateTxt = `${i}년 ${jMonth}월`;
                    tmpDateList.push({"dateVal":dateVal,"dateTxt":dateTxt});
                }
            }
            else{
                if(i==regYear){
                    for(var j = regMonth; j<= 12;j++){
                        if(j<10){
                            jMonth = "0"+j;
                        } else{
                            jMonth = j;
                        }
                        dateVal = `${i}-${jMonth}`;
                        dateTxt = `${i}년 ${jMonth}월`;
                        tmpDateList.push({"dateVal":dateVal,"dateTxt":dateTxt});
                    }
                } else if(i == nowYear){
                    for(var j = 1; j<= nowMonth;j++){
                        if(j<10){
                            jMonth = "0"+j;
                        } else{
                            jMonth = j;
                        }
                        dateVal = `${i}-${jMonth}`;
                        dateTxt = `${i}년 ${jMonth}월`;
                        tmpDateList.push({"dateVal":dateVal,"dateTxt":dateTxt});
                    }
                } else {
                    for(var j = 1; j<= 12;j++){
                        if(j<10){
                            jMonth = "0"+j;
                        } else{
                            jMonth = j;
                        }
                        dateVal = `${i}-${jMonth}`;
                        dateTxt = `${i}년 ${jMonth}월`;
                        tmpDateList.push({"dateVal":dateVal,"dateTxt":dateTxt});
                    }
                }
        }
        }
        setDateList(tmpDateList);
    }

    useEffect(()=>{
        axios.get("/api/user/moneybook/getInfos",
            {
                params: {
                    userkey: userkey,
                    today: yyyymm,
                }
            }
        ).then((result)=>{
            setUserVO(result.data.uvo);
            setUserSell(result.data.s_list);
            setUserBuy(result.data.b_list);
            setUserGive(result.data.gi_list);
            setUserGet(result.data.ge_list);
            setNeighbor(result.data.n_list);
            setNeighborTrade(result.data.nt_list);
            setNeighborGive(result.data.ng_list);

            getDateList(result.data.uvo.create_dtm);

            
        })
    },[yyyymm]); 

  var totalTradePrice =  getTotalPrice(userSell)-getTotalPrice(userBuy);

  return (open ?
    <Fragment>
        <Dialog
          className="mbModal"
          open={open}
          onClose={closeMoneyBook}
        >
          <DialogTitle
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#ee8853"
            }}
          >
              <strong>{userVO.nickname}님의 가계부</strong>
              <Box className="datePicker">
              <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  {/* <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="yyyymm"
                      value={yyyymm}
                      onChange={(e)=>setYyyymm(e.target.value)}
                  >
                      {dateList.length>0 ? dateList.map((date,index)=>{
                          return(
                              <MenuItem key={index} value={date.dateVal}>{date.dateTxt}</MenuItem>
                          )
                      }) : <MenuItem value={todayYYYYMM}>{`${today.getFullYear()}년 ${todayMonth}월`}</MenuItem>
                  }
                  </Select> */}
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ko"
                >
                    <DatePicker
                        sx={{width: 160}}
                        minDate={dayjs(userVO.create_dtm)}
                        maxDate={dayjs()}
                        views={['year', 'month']}
                        format="YYYY년 MM월"
                        onChange={(e)=>{
                                            if((e.month()+1).toString().length == 1){
                                                setYyyymm(e.year()+"-0"+(e.month()+1).toString());
                                            } else {
                                                setYyyymm(e.year()+"-"+e.month());
                                            }
                                        }
                                }
                        className="mbDatePicker"
                        defaultValue={dayjs()}
                        slotProps={{
                            field: {
                                readOnly: true
                            }
                        }}
                    />
                </LocalizationProvider>
              </FormControl>
              </Box>
          </DialogTitle>
        <DialogContent 
        >
            <TableContainer>
            <Card className="userCard">
                <Table className="moneybookBody">
                <TableBody className="userTrade">
                    <TableRow className="titleRow">
                        <TableCell colSpan={1} className="txt title toRight"> 전체거래 </TableCell>
                        <TableCell colSpan={3} className="txt toRight">{`${totalTradePrice>0 ? '+' : totalTradePrice==0 ? '±' : ''} ${priceFormat(totalTradePrice)}`}원</TableCell>
                    </TableRow>
                    <TableRow className="contentRow">
                        <TableCell className="title txt toRight">
                            판매
                        </TableCell>
                        <TableCell className="txt toRight">
                            {userSell.length}건
                        </TableCell>
                        <TableCell colSpan={2} className="txt toRight">
                            {userSell.length>0 ? priceFormat(getTotalPrice(userSell)):0}원
                        </TableCell>
                    </TableRow>
                    <TableRow className="contentRow">
                        <TableCell className="title txt toRight">
                            구매
                        </TableCell>
                        <TableCell className="txt toRight">
                            {userBuy.length}건
                        </TableCell>
                        <TableCell colSpan={2} className="txt toRight">
                            {userBuy.length>0 ? priceFormat(getTotalPrice(userBuy)):0}원
                        </TableCell>
                    </TableRow>
                    <TableRow className="contentRow">
                        <TableCell className="title txt toRight">
                            나눔
                        </TableCell>
                        <TableCell className="txt toRight">
                            한 {userGive.length}건
                        </TableCell>
                        <TableCell colSpan={2} className="txt toRight">
                            받은 {userGet.length}건
                        </TableCell>
                    </TableRow>
                    </TableBody>
                    </Table>
                </Card>
                <Card className="neighborCard">
                    <Table className="moneybookBody">
                        <TableBody className="neighborTrade">
                            <TableRow className="titleRow">
                                <TableCell className="txt title toRight">이웃</TableCell>
                                <TableCell colSpan={3} className="txt toRight">
                                    {neighbor.length}명
                                </TableCell>
                            </TableRow>
                            <TableRow className="contentRow">
                                <TableCell className="txt title toRight">
                                    거래
                                </TableCell>
                                <TableCell className="txt toRight">
                                    {neighborTrade.length}건
                                </TableCell>
                                <TableCell colSpan={2} className="txt toRight">
                                    {neighborTrade.length>0 ? priceFormat(getTotalPrice(neighborTrade)):0}원
                                </TableCell>
                            </TableRow>
                            <TableRow className="contentRow">
                                <TableCell className="txt title toRight">
                                    나눔
                                </TableCell>
                                <TableCell colSpan={3} className="txt toRight">
                                    {neighborGive.length}건
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </ TableContainer>
            </DialogContent>
            <DialogActions
                onClick={closeMoneyBook}
                className="closeMbBtn"
                >
                나가기
            </DialogActions>
            </Dialog>
        </Fragment>
  :null)
}
