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

export default function PostStatisticComp({ categoryType, dateType }) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios({
      url: "/api/ad/postTop10Statistic",
      method: "get",
      params: { type: categoryType, dateType: dateType },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setPostList(res.data.res_postTop10Statistic);
    });
  }, [categoryType]);

  return (
    <Box
      sx={{
        overflow: "auto",
        width: { xs: "280px", sm: "auto" },
        margin: -2,
        padding: -2,
      }}
      height={800}
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
                게시글
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="subtitle2" fontWeight={600}>
                작성자
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                동네
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                조회수
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                관심수
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                채팅수
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                상태
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postList &&
            postList.length > 0 &&
            postList.map((post, i) => (
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
                    {post.pimg_list && post.pimg_list.length > 0 && (
                      <Avatar alt={post.title} src={post.pimg_list[0].imgurl} />
                    )}
                    {post.title}
                  </Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Box gap={2} display="flex" alignItems="center">
                    <Avatar
                      alt={post.uvo && post.uvo.nickname && post.uvo.nickname}
                      src={post.uvo && post.uvo.imgurl && post.uvo.imgurl}
                    />
                    {post.uvo && post.uvo.nickname && post.uvo.nickname}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {post.townVO.region1 +
                    " " +
                    post.townVO.region2 +
                    " " +
                    post.townVO.region3}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{post.viewqty}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{post.likedqty}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{post.chatroomqty}</Typography>
                </TableCell>
                <TableCell align="center">
                  {post.isdeleted == 1
                    ? "삭제"
                    : post.poststatus == 0
                      ? "임시저장"
                      : post.poststatus == 1
                        ? "판매중"
                        : post.postStatus == 2
                          ? "예약중"
                          : post.poststatus == 3
                            ? "거래완료"
                            : "숨김"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}
