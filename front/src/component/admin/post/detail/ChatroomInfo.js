import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function ChatroomInfo(props) {
  const cr_list = props.cr_list;
  return (
      <TableContainer className="infoPart" component={Paper}>
        <Table className="detailInfoTable">
          <TableBody>
            <TableRow>
              <TableCell className="th">채팅방 번호</TableCell>
              <TableCell className="th">거래자</TableCell>
              <TableCell className="th">생성일자</TableCell>
            </TableRow>
            {cr_list.length > 0 ?
              cr_list.map((crvo,index)=>{
                var istop = "X";
                var isoffer = "X";
                
                if(crvo.istop == 1){
                  istop= "O";
                }
                if(crvo.isoffer == 1){
                  isoffer= "O";
                }
                
                return(
                <TableRow key={index}>
                  <TableCell className="td">{crvo.chatroomkey}</TableCell>
                  <TableCell className="td">{crvo.cuvo.nickname}</TableCell>
                  <TableCell className="td">{crvo.create_dtm}</TableCell>
                </TableRow>
              )})
              :
              <TableRow>
                <TableCell className="td" colSpan={3}>채팅방이 존재하지 않습니다.</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
  );
    }
    