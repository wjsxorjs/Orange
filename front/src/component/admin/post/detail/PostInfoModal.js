import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default function PostInfoModal(props) {

    const open_pi = props.open_pi;
    const handleClose_pi = props.handleClose_pi;
    const postinfo = props.postinfo;

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
      open={open_pi}
      onClose={handleClose_pi}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TableContainer component={Paper} sx={{maxHeight: 450}}>
            <Table stickyHeader className="detailInfoTable" sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell className="th">끌올여부</TableCell>
                    <TableCell className="th">수정일시</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {postinfo.map((pivo,index) => {
                    var isupdate = "일반 수정";

                    if(pivo.isupdate==1){
                        isupdate = "끌어올리기";
                    }
                    return(
                        <TableRow key={index}>
                            <TableCell className="td">{isupdate}</TableCell>
                            <TableCell className="td">{pivo.dtm}</TableCell>
                        </TableRow>
                )})}
            </TableBody>
            </Table>
        </TableContainer>
      </Box>
    </Modal>
  )
}
