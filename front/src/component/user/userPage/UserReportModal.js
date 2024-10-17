'use client';

import UserReportContent from "@/component/user/userPage/UserReportContent";
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import "/public/css/report.css";

export default function UserReportModal(props) {
    const reportOpen = props.reportOpen;
    const setReportOpen = props.setReportOpen;
    const userkey = props.userkey;

    const API_URL = "/api/user/report/getUserReportList";
    
    function reportClose(){
        setReportOpen(false);
    }

    const [list, setList] = useState([]);
    const [contentOpen, setContentOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(''); //content에서 제목 보여주려고
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedReportlistkey, setSelectedReportlistkey] = useState('');

    const handleUserReport = () => {
        getData(0);
    };

    useEffect(() => {
        if (reportOpen) {
            getData(0);
            setContentOpen(false);
        }
    }, [reportOpen]);

    function getData(ispostValue) {
        axios.get(API_URL)
            .then((res) => {
                setList(res.data.r_ar || []);
            });
    }

    const handleNext = (index) => {
        setSelectedContent(list[index].content);
        setSelectedReportlistkey(list[index].reportlistkey);
        setContentOpen(true);
        
    };

    return (
        <div>
            <Modal open={reportOpen} onClose={reportClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className="modal-box" sx={{ bgcolor: 'background.paper' }}>
                    <div className='divv'>
                        <button onClick={()=>{reportClose()}} className="link-button" style={{ cursor: 'pointer', fontSize: '20px' }}>X</button>
                    </div>
                    <div id="area">
                        {
                            contentOpen ? (
                                <UserReportContent contentOpen={contentOpen} handleContentClose={() => setContentOpen(false)} handleReportClose={reportClose} 
                                        content={selectedContent} userkey={userkey} reportlistkey={selectedReportlistkey} ispost={0} />
                            ) : (
                                <>
                                    <Typography id="modal-modal-title" variant="subtitle1" component="h2" sx={{ fontWeight: 'bold', mb: 0, fontSize: '16px' }}>
                                        사용자를 신고하는 이유를 선택해주세요.
                                    </Typography>
                                    <List>
                                        {list.length > 0 ? (
                                            list.map((item, index) => (
                                                <Fragment key={index}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton onClick={() => handleNext(index)}>
                                                            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary={item.content} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider light sx={{ bgcolor: '#e0e0e0' }} />
                                                </Fragment>
                                            ))
                                        ) : (
                                            <Typography>신고 가능한 항목이 없습니다.</Typography>
                                        )}
                                    </List>
                                </>
                            )
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
