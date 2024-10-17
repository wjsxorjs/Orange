import { Box, Modal } from '@mui/material';
import React from 'react'

export default function ImageModal(props) {

    const open = props.open;
    const handleClose = props.handleClose;
    const imgurl = props.imgurl;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img src={`${imgurl}`} style={{maxWidth:'500px'}}/>
          </Box>
        </Modal>
    )
}
