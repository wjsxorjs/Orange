import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CateStatisticComp({ categoryType }) {
  const [cateList, setCateList] = useState([]);

  useEffect(() => {
    axios({
      url: "/api/ad/catedealstatistic",
      method: "get",
      params: { type: categoryType },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setCateList(res.data.res_catedealstatistic);
    });
  }, [categoryType]);

  return (
    <Box
      sx={{
        overflow: "auto",
        width: { xs: "280px", sm: "auto" },
        margin: -4,
        padding: -4,
      }}
      height={420}
    >
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                순위
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                카테고리
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                거래 건수
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                거래 금액
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cateList &&
            cateList.map((cate, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {i + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    gap={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {cate.img_url && (
                      <Avatar alt={cate.categoryname} src={cate.img_url} />
                    )}
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {cate.categoryname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{cate.dealcnt}건</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    {new Intl.NumberFormat("ko-KR").format(cate.dealprice)}원
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}
