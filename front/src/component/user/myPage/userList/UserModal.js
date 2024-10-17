import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default function UserModal(props) {

    const open = props.open;
    const handleClose = props.handleClose;
    const uvo = props.uvo;
    const whatNow = props.whatNow;

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
        <Button color="error">{whatNow=="likeUser" ? '모아보기 취소' : whatNow=="blockedUser" ? '차단 해제' : '게시글 미노출 해제'}</Button>
        <TableContainer component={Paper} sx={{maxHeight: 450}}>
            <Table stickyHeader className="detailInfoTable" sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell className="th">닉네임</TableCell>
                    <TableCell className="th">아이디</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                  <TableCell className="td">{uvo.nickname}</TableCell>
                  <TableCell className="td">{uvo.id}</TableCell>
              </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
      </Box>
    </Modal>
  )
}
