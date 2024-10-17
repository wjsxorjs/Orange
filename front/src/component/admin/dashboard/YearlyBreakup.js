import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconCircleCheck } from "@tabler/icons-react";

const YearlyBreakup = () => {
  const [postStatusCnt, setPostStatusCnt] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    axios({
      url: "/api/ad/postStatusCnt",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setPostStatusCnt(res.data.res_postStatusCnt);
      const totalSum = res.data.res_postStatusCnt.reduce(
        (acc, item) => acc + parseInt(item, 10),
        0
      );
      setTotal(totalSum);
    });
  }, []);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const successlight = theme.palette.success.light;
  const c1 = "#bdbdbd";
  const c2 = "#00bcd4";
  const c3 = "#a2cf6e";
  const c4 = "#ed4b82";
  const c5 = "#ffeb3b";

  const seriesNames = ["임시", "판매", "예약", "완료", "숨김"];
  const seriescolumnchart = postStatusCnt.map((item) => parseInt(item, 10));

  // chart
  const optionscolumnchart = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [c1, c2, c3, c4, c5],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: seriesNames,
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  return (
    <DashboardCard title="게시글 통계">
      <Grid container spacing={1}>
        {/* column */}
        <Grid item xs={6} sm={6}>
          <Typography variant="subtitle2" fontWeight="700">
            거래완료
          </Typography>
          <Stack direction="row" alignItems="flex-end">
            <Typography variant="h2" fontWeight="700">
              {new Intl.NumberFormat("ko-KR").format(postStatusCnt[3])}
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight="700"
              sx={{ marginLeft: 0.5 }}
            >
              건
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: "transparent", width: 27, height: 27 }}>
              <IconCircleCheck width={20} color="#39B69A" />
            </Avatar>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.7rem" }}
              color="textSecondary"
            >
              거래완료율
            </Typography>
            <Typography variant="subtitle2" fontWeight="600">
              {((postStatusCnt[3] / total) * 100).toFixed(1)}%
            </Typography>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={6} sm={6}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height={150}
            width={"100%"}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Stack spacing={1} mt={2} direction="row" sx={{ width: "100%" }}>
            <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: c1,
                  svg: { display: "none" },
                }}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontSize: "0.7rem" }}
              >
                임시
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: c2,
                  svg: { display: "none" },
                }}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontSize: "0.7rem" }}
              >
                판매
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: c3,
                  svg: { display: "none" },
                }}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontSize: "0.7rem" }}
              >
                예약
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: c4,
                  svg: { display: "none" },
                }}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontSize: "0.7rem" }}
              >
                완료
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: c5,
                  svg: { display: "none" },
                }}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontSize: "0.7rem" }}
              >
                숨김
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
