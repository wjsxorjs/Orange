import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function OfferInfo(props) {
    const o_list = props.o_list;
    
    return (
      <TableContainer className="infoPart" component={Paper}>
        <Table className="detailInfoTable">
          <TableBody>
            <TableRow>
              <TableCell className="th">가격제안 번호</TableCell>
              <TableCell className="th">제안자명</TableCell>
              <TableCell className="th">제안가격</TableCell>
              <TableCell className="th">승락상태</TableCell>
              <TableCell className="th" colSpan={2}>생성일자</TableCell>
            </TableRow>
            {o_list.length > 0 ?
              o_list.map((ovo,index)=>{
                const price = ovo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat('원');
                var offerstatus = "대기상태";
                switch(ovo.offerstatus){
                  case 1:
                    offerstatus = "승락";
                    break;
                  case 2:
                    offerstatus = "거절";
                    break;
                }
                return(
                <TableRow key={index}>
                  <TableCell className="td">{ovo.offerkey}</TableCell>
                  <TableCell className="td">{ovo.ouvo.nickname}</TableCell>
                  <TableCell className="td">{price}</TableCell>
                  <TableCell className="td">{offerstatus}</TableCell>
                  <TableCell className="td" colSpan={2}>{ovo.create_dtm}</TableCell>
                </TableRow>
              )})
              :
              <TableRow>
                <TableCell className="td" colSpan={6}>가격제안이 존재하지 않습니다.</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  