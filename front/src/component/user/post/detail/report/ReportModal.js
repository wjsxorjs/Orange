'use client';

import { Box, Modal, Typography, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "/public/css/report.css";
import Content from './Content';

export default function ReportModal(props) {
    const open = props.reportOpen;
    const onClose = props.handleReportClose;
    const API_URL = "/api/user/report/getReportList";

    const [list, setList] = useState([]);
    const [next, setNext] = useState(false); // next가 true가 되면 추가 리스트를 보여줌
    const [contentOpen, setContentOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(''); //content에서 제목 보여주려고
    const [scrollPosition, setScrollPosition] = useState(0);
    const [pvo, setPvo] = useState({});
    const [uvo, setUvo] = useState({});
    const [selectedReportlistkey, setSelectedReportlistkey] = useState('');
    const [ispost, setIspost] = useState();

    const handleUserReport = () => {
        setNext(true); 
        getData(0, 0);
    };

    useEffect(() => {
        if (open) {
            getData(1, 1);
            setNext(false);
            setContentOpen(false);
            setPvo(props.pvo);
            setUvo(props.pvo.uvo);

            const currentScroll = window.scrollY; // 현재 스크롤 위치 저장
            setScrollPosition(currentScroll); 
            document.body.style.position = 'fixed'; // 스크롤 고정
            document.body.style.top = `-${currentScroll}px`; 
            document.body.style.width = '100%';
        } else {
            document.body.style.position = ''; // 스크롤 해제
            document.body.style.top = ''; 
            window.scrollTo(0, scrollPosition); // 저장된 스크롤 위치로 이동
        }
    }, [open]);

    function getData(ispostValue, sequence) {
        axios.get(API_URL, { params: { ispost: ispostValue, sequence } })
            .then((res) => {
                setList(res.data.r_ar || []);
                setIspost(ispostValue);
            });
    }

    const handleNext = (index, sequence) => {
        if (!next) { // 첫 번째 클릭 시 next를 true로 설정하여 다음 report list를 보여줌
            setNext(true);
            getData(1, sequence);
        } else { // 두 번째 클릭 시 "area"에 content 보여주기
            setSelectedContent(list[index].content);
            setSelectedReportlistkey(list[index].reportlistkey);
            setContentOpen(true);
        }
    };

    return (
        <div>
            <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box className="modal-box" sx={{ bgcolor: 'background.paper' }}>
                    <div className='divv'>
                        {!next ? null : (
                            <button onClick={() => { setNext(false); getData(1, 1); }} style={{ cursor: 'pointer', fontSize: '20px' }}>&lt;</button>
                        )}
                        <button onClick={onClose} className="link-button" style={{ cursor: 'pointer', fontSize: '20px' }}>X</button>
                    </div>
                    <div id="area">
                        {
                            contentOpen ? (
                                <Content contentOpen={contentOpen} handleContentClose={() => setContentOpen(false)} handleReportClose={onClose} 
                                        content={selectedContent} pvo={pvo} uvo={uvo} reportlistkey={selectedReportlistkey} ispost={ispost} />
                            ) : (
                                <>
                                    <Typography id="modal-modal-title" variant="subtitle1" component="h2" sx={{ fontWeight: 'bold', mb: 0, fontSize: '16px' }}>
                                        게시글을 신고하는 이유를 선택해주세요.
                                    </Typography>
                                    <List>
                                        {list.length > 0 ? (
                                            list.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <ListItem disablePadding>
                                                        <ListItemButton onClick={() => handleNext(index, next ? 0 : 2 + index)}>
                                                            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary={item.content} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider light sx={{ bgcolor: '#e0e0e0' }} />
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <Typography>신고 가능한 항목이 없습니다.</Typography>
                                        )}
                                        {!next && ( //클릭하지 않은 상황에서만 표시
                                            <React.Fragment>
                                                    <ListItem disablePadding>
                                                        <ListItemButton onClick={handleUserReport}>
                                                            <ListItemText primaryTypographyProps={{ fontSize: '14px', color: 'blue' }} primary="작성자 신고하기" />
                                                        </ListItemButton>
                                                    </ListItem>
                                                <Divider light sx={{ bgcolor: '#e0e0e0' }} />
                                            </React.Fragment>
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
