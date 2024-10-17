import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function UserreviewInfo(props) {
  const ur_list = props.ur_list;
  return (
    <TableContainer className="infoPart" component={Paper}>
      <Table className="detailInfoTable">
        <TableBody>
          <TableRow>
            <TableCell className="th">간편후기 번호</TableCell>
            <TableCell className="th">후기목록 번호</TableCell>
            <TableCell className="th">거래선호도</TableCell>
            <TableCell className="th" colSpan={2}>후기내용</TableCell>
            <TableCell className="th">구매자여부</TableCell>
          </TableRow>
          {ur_list.length > 0 ?
            ur_list.map((urvo,index)=>{
              var isbuyer = "판매자";
              if(urvo.isbuyer == 1){
                isbuyer="구매자";
              }
              return(
              <TableRow key={index}>
                <TableCell className="td">{urvo.userreviewkey}</TableCell>
                <TableCell className="td">{urvo.rlvo.reviewlistkey}</TableCell>
                <TableCell className="td">{urvo.rlvo.preference}</TableCell>
                <TableCell className="td" colSpan={2}>{urvo.rlvo.review}</TableCell>
                <TableCell className="td">{isbuyer}</TableCell>
              </TableRow>
            )})
            :
            <TableRow>
              <TableCell className="td" colSpan={6}>간편후기가 존재하지 않습니다.</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
    }
    