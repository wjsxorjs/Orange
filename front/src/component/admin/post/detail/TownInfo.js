import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function TownInfo(props) {
    const tvo = props.tvo;
    var status = "사용";
    if(tvo.status==1){
      status = "미사용";
    }
    return (
      <TableContainer className="infoPart" component={Paper}>
        <Table className="detailInfoTable">
          <TableBody>
            <TableRow>
              <TableCell className="th">도시</TableCell>
              <TableCell className="th">행정구역</TableCell>
              <TableCell className="th">동</TableCell>
              </TableRow>
            <TableRow>
                <TableCell className="td">{tvo.region1}</TableCell>
                <TableCell className="td">{tvo.region2}</TableCell>
                <TableCell className="td">{tvo.region3}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  