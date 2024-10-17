import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function CategoryInfo(props) {
  const cvo = props.cvo;
    return (
      <TableContainer className="infoPart" component={Paper}>
        <Table className="detailInfoTable">
          <TableBody>
            <TableRow>
              <TableCell className="th">분류</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="td">{cvo.categoryname}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  