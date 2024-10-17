import { Box, Card, CardContent, CardMedia, Divider, Modal, Typography } from '@mui/material';
import React from 'react'
import '/public/css/reviewdetail.css';

export default function ReviewDetail(props) {
    const rdOpen = props.rdOpen;
    const closeRd = props.closeRd;
    const pvo = props.rdvo;
    const who = props.who;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: who=="Buyer"?'#228822':"#ff4f00",
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
      };

    return (
        rdOpen ?
        who == "Buyer" ?
        <Modal
        open={rdOpen}
        onClose={closeRd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Card sx={{ width: '100%' }}>
                <CardContent>
                    <div className='Title'>판매자 후기</div>
                </CardContent>
                <CardMedia
                component="img"
                image="/img/review/detail/orange_rd_upper.png"
                />
                <CardContent>
                    <Typography>
                        {pvo.uvo ? pvo.uvo.nickname : ''}@{pvo.uvo ? pvo.uvo.id : ''}님이 후기를 남기셨어요.
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <div className='userreviewtxt'>
                            <p className='userreview'>후기: {pvo.userreview}</p>
                            <p className='userreview'>작성일: {pvo.userreview_dtm.split(" ")[0]}</p>
                        </div>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        </Modal>
        :
        <Modal
        open={rdOpen}
        onClose={closeRd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Card sx={{ width: '100%' }}>
                <CardContent>
                    <div className='Title'>구매자 후기</div>
                </CardContent>
                <CardMedia
                component="img"
                image="/img/review/detail/orange_rd_upper.png"
                />
                <CardContent>
                    <Typography>
                        {pvo.duvo ? pvo.duvo.nickname : ''}@{pvo.duvo ? pvo.duvo.id : ''}님이 후기를 남기셨어요.
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <div className='userreviewtxt'>
                            <p className='userreview'>후기: {pvo.dealuserreview}</p>
                            <p className='userreview'>작성일: {pvo.dealuserreview_dtm.split(" ")[0]}</p>
                        </div>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        </Modal>
        :
        ''
    )
}
