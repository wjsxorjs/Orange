import UserReportModal from "@/component/user/userPage/UserReportModal";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useState } from "react";

export default function UserReport(props) {

    const ifReport = props.ifReport;
    const setIfReport = props.setIfReport;
    const userkey = props.userkey;

    const [reportOpen, setReportOpen] = useState(false);

    function handleIfReport(res){
        setIfReport(false);
        if (res) { setReportOpen(true); }
    };

    

    return (
    <>
        <Dialog open={ifReport} onClose={() => handleIfReport(false)} aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-description">
            <DialogContent style={{ paddingBottom: '5px' }}>
                <DialogContentText id="confirm-dialog-description" style={{ color: 'black', marginTop: '5px' }}>
                신고하면 철회할 수 없습니다. 계속 하시겠습니까?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleIfReport(true)} style={{ backgroundColor: 'gray', color: 'white' }} >확인</Button>
                <Button onClick={() => handleIfReport(false)} style={{ backgroundColor: '#ff5722', color: 'white' }} autoFocus>취소</Button>
            </DialogActions>
        </Dialog>
        <UserReportModal reportOpen={reportOpen} setReportOpen={setReportOpen} userkey={userkey}/>
    </>
    )
}
        