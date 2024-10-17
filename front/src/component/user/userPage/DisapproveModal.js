'use client'

import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";

export default function DisapproveModal(props) {

    function disapproveIt(listKey,message){
        if(confirm(`["${message}"]\n해당 매너 평가를 남기시겠습니까?\n*주의! 취소 불가합니다.`)){
                axios.post(
                    "/api/user/manner/disapproveUser",
                null,
                {
                    params: {
                        userkey: props.userkey,
                        estimateuser: Cookies.get("userkey"),
                        listKey: listKey,
                    }
                }
            ).then((res) => {
                if(res.data.result > 0){
                    alert("비매너 평가가 완료되었습니다.");
                    setDisapproveOpen(false);
                    window.location.reload();
                }
                });
            }
    }

    const [disapproveList,setDisapproveList] = useState([]);

    const disapproveOpen = props.disapproveOpen;
    const setDisapproveOpen = props.setDisapproveOpen;

    useEffect(()=>{
        axios.get("/api/user/manner/getDisapproveList")
            .then((res) => {
                setDisapproveList(res.data.d_ar || []);
            });
    },[]);

    return (
        <Modal open={disapproveOpen} onClose={()=>{setDisapproveOpen(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box className="modal-box" sx={{ bgcolor: 'background.paper' }}>
                <div className='divv'>
                    <button onClick={()=>{setDisapproveOpen(false)}} className="link-button" style={{ cursor: 'pointer', fontSize: '20px' }}>X</button>
                </div>
                <div id="area">
                    <Typography id="modal-modal-title" variant="subtitle1" component="h2" sx={{ fontWeight: 'bold', mb: 0, fontSize: '16px' }}>
                        비매너 평가를 선택해주세요.
                    </Typography>
                    <List>
                        {disapproveList.length > 0 ? (
                            disapproveList.map((item, index) => (
                                <Fragment key={index}>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => disapproveIt(item.reviewlistkey,item.review)}>
                                            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary={item.review} />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider light sx={{ bgcolor: '#e0e0e0' }} />
                                </Fragment>
                            ))
                        ) : (
                            <Typography>비매너 평가항목이 없습니다.</Typography>
                        )}
                    </List>
                </div>
            </Box>
        </Modal>
    )
}
