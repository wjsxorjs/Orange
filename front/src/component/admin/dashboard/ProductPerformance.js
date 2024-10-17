import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  useTheme,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { useEffect, useState } from "react";
import axios from "axios";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24.5",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
  },
];

const ProductPerformance = () => {
  const [userRank, setUserRank] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    axios({
      url: "/api/ad/getUserRank",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setUserRank(res.data.res_getUserRank);
    });
  }, []);

  return (
    <DashboardCard title="명예의 전당">
      <Box
        sx={{
          overflow: "auto",
          height: 380,
          width: { xs: "280px", sm: "auto" },
        }}
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
                  사용자
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="subtitle2" fontWeight={600}>
                  판매 건수
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="subtitle2" fontWeight={600}>
                  매너온도
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  총 판매가격
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRank.map((user, i) => (
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
                    {user.imgurl && (
                      <Avatar alt={user.nickname} src={user.imgurl} />
                    )}
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {user.nickname}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{user.cellqty}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor: theme.palette.error.main,
                      color: "#fff",
                    }}
                    size="small"
                    label={user.mannertemp}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">
                    {new Intl.NumberFormat("ko-KR").format(user.cellprice)}원
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
