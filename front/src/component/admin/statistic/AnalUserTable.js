import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import DashboardCard from "../shared/DashboardCard";

export default function AnalUserTable({ record }) {
  return (
    <>
      {record && record.length > 0 && (
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="stretch"
          style={{ marginBottom: "50px" }}
        >
          <Grid item xs={12} sx={{ mb: 0.3 }}>
            <Typography variant="h5" flexGrow={1}>
              분석 내역
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <DashboardCard>
              <TableContainer sx={{ overflowX: "auto", width: "100%" }}>
                <Table sx={{ tableLayout: "auto" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">분류</TableCell>
                      <TableCell align="center">회원가입</TableCell>
                      <TableCell align="center">게시글 생성</TableCell>
                      <TableCell align="center">거래 완료</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {record && record.length > 0 ? (
                      record.map((item, i) => (
                        <TableRow key={i} hover tabIndex={-1}>
                          <TableCell align="center">{item.day_name}</TableCell>
                          <TableCell align="center">{item.su_count}</TableCell>
                          <TableCell align="center">{item.pc_count}</TableCell>
                          <TableCell align="center">{item.pd_count}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={10}>
                          <Box sx={{ py: 15, textAlign: "center" }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                              검색 결과가 없습니다.
                            </Typography>
                            <Typography variant="body2">
                              검색 조건을 확인해주세요.
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </DashboardCard>
          </Grid>
        </Grid>
      )}
    </>
  );
}
