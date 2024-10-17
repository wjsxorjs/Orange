'use client'

import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BadgeList({ userKey, onBadgeCountChange }) {
    const ALL_URL = "/api/user/badge/getAllBadge";
    const API_URL = "/api/user/badge/getBadge";
    const REP_URL = "/api/user/badge/representBadge";
    const CAN_URL = "/api/user/badge/cancelRep";

    const [list, setList] = useState([]);
    const [unlockedBadgeKeys, setUnlockedBadgeKeys] = useState([]);
    const [repBadge, setRepBadge] = useState('');
    const [selectedBadge, setSelectedBadge] = useState('');
    const [badgekey, setBadgekey] = useState('');
    const [open, setOpen] = useState('');
    const userkey = userKey;

    useEffect(() => {
        getAllData();
        getData();
    }, []);

    function getAllData() {
        axios.get(ALL_URL).then((res) => {
            setList(res.data.all);
        });
    }

    function getData() {
        axios.get(API_URL, {
            params: { userkey: userkey }
        }).then((res) => {
            const badges = res.data.b_ar || [];
            const representBadge = badges.find((item) => item.isrepresent == "1");
            if (representBadge) {
                setRepBadge(representBadge);
            }
            const badgeKeys = badges.map((item) => item.badgekey);
            setUnlockedBadgeKeys(badgeKeys);
            onBadgeCountChange(badges.length);
        });
    }
    
    function setRepresentBadge() {
        axios.get(REP_URL, {
            params: { userkey: userkey, badgekey: badgekey }
        }).then((res) => {
            setRepBadge(list.find(badge => badge.badgekey == badgekey));
        });
    }

    function cancelRep() {
        axios.get(CAN_URL, {
            params: { userkey: userkey, badgekey: badgekey }
        }).then((res) => {
            setRepBadge(null);
        });
    }

    const modalOpen = (badge) => {
        setSelectedBadge(badge);
        setBadgekey(badge.badgekey);
        setOpen(true);
    };

    const modalClose = () => {
        setOpen(false);
        setSelectedBadge(null);
    };

    return (
        <>
            <Box sx={{ textAlign: 'center', my: 1 }}>
                <Typography variant="h6" sx={{ color: '#000' }}>나의 대표 배지</Typography>
                {repBadge ? (
                    <>
                        <Avatar sx={{ width: 80, height: 80, margin: '16px auto' }} src={repBadge.imgurl} />
                        <Typography variant="body1" sx={{ marginTop: 1, color: '#000' }}>{repBadge.name}</Typography>
                    </>
                ) : (
                    <Box sx={{ marginTop: 2 }}>
                        <LockIcon sx={{ fontSize: 60, color: '#FFC107' }} />
                        <Typography variant="body2" sx={{ color: '#888' }}>
                            아직 대표 배지로 설정한 황금배지가 없어요.
                            <br /> '황금배지'만 대표 배지로 설정할 수 있어요.
                        </Typography>
                    </Box>
                )}
            </Box>
            <Divider sx={{ my: 4 }} />
            <Grid container spacing={2} justifyContent="center">
                {list.map((badge) => {
                    const isUnlocked = unlockedBadgeKeys.includes(badge.badgekey);
                    const isRepresentable = badge.isrepresentable == "1";
                    const backgroundColor = isRepresentable ? '#FFF9C4' : '#f5f5f5';
                    const lockColor = isRepresentable ? '#FFC107' : '#666';
                    return (
                        <Grid item xs={12} sm={6} md={2.4} key={badge.badgekey}>
                            <Card sx={{ backgroundColor: backgroundColor, borderRadius: '16px', textAlign: 'center', position: 'relative', cursor: 'pointer'}}
                                onClick={() => modalOpen(badge)}>
                                <CardContent>
                                    <Box sx={{ position: 'relative', width: 56, height: 56, margin: '0 auto 8px' }}>
                                        {isUnlocked ? (
                                            <Avatar sx={{ width: '100%', height: '100%' }} src={badge.imgurl} />
                                        ) : (
                                            <LockIcon sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', color: lockColor }} />
                                        )}
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#000' }}>{badge.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Modal open={open} onClose={modalClose} aria-labelledby="badge-modal-title">
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, bgcolor: 'background.paper',
                        borderRadius: 4, boxShadow: 24, p: 4, textAlign: 'center', cursor: 'pointer' }}>
                    {selectedBadge && (
                        <>
                            {unlockedBadgeKeys.includes(selectedBadge.badgekey) ? (
                                <Avatar sx={{ width: 80, height: 80, margin: '0 auto 16px' }} src={selectedBadge.imgurl} />
                            ) : (
                                <LockIcon sx={{ fontSize: 80, color: selectedBadge.isrepresentable == "1" ? '#FFC107' : '#666', margin: '0 auto 16px' }} />
                            )}
                            <Typography variant="h6">{selectedBadge.name}</Typography>
                            <Typography variant="body2" sx={{ color: '#888', marginTop: 2, wordBreak: 'keep-all' }}>
                    {unlockedBadgeKeys.includes(selectedBadge.badgekey)
                        ? selectedBadge.postcontent.split('.').map((sentence, index) => (
                            <span key={index}>
                                {sentence.trim() && `${sentence.trim()}`}<br />
                            </span>
                        ))
                        : selectedBadge.precontent.split('.').map((sentence, index) => (
                            <span key={index}>
                                {sentence.trim() && `${sentence.trim()}`}<br />
                            </span>
                        ))
                    }
                </Typography>
                            {/* 대표 배지 설정 O */}
                            {selectedBadge && repBadge && selectedBadge.badgekey == repBadge.badgekey ? (
                            <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#F57C00' } }} onClick={() => { cancelRep(); modalClose(); }}>
                                대표 배지 해제
                            </Button>
                            ) : (
                                /* 대표 배지 X */
                                selectedBadge && selectedBadge.isrepresentable == "1" && (
                                    unlockedBadgeKeys.includes(selectedBadge.badgekey) ? (
                                        <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#F57C00' } }} onClick={() => { setRepresentBadge(); modalClose(); }}>
                                            나의 대표 배지로 사용하기
                                        </Button>
                                    ) : (
                                        <Button variant="contained" sx={{ marginTop: 2, backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#F57C00' } }} disabled>
                                            나의 대표 배지로 사용하기
                                        </Button>
                                    )
                                )
                            )}
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
}
