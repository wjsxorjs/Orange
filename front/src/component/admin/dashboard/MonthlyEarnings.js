import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab } from "@mui/material";
import {
  IconArrowDownRight,
  IconCurrencyDollar,
  IconMoodX,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const MonthlyEarnings = () => {
  const [userStatusCnt, setUserStatusCnt] = useState([]);
  const [total, setTotal] = useState(0);
  const [del, setDel] = useState(0);

  useEffect(() => {
    axios({
      url: "/api/ad/userStatusCnt",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setUserStatusCnt(res.data.res_userStatusCnt);
      const totalSum = res.data.res_userStatusCnt.reduce(
        (acc, item) => acc + parseInt(item.newCnt, 10),
        0
      );
      const delSum = res.data.res_userStatusCnt.reduce(
        (acc, item) => acc + parseInt(item.delCnt, 10),
        0
      );
      setTotal(totalSum);
      setDel(delSum);
    });
  }, []);

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = "#f5fcff";
  const label = userStatusCnt.map((item) => item.date);

  // chart
  const optionscolumnchart = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    labels: label,
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };

  const seriescolumnchart = [
    {
      name: "",
      color: secondary,
      data: userStatusCnt.map((item) => item.newCnt),
    },
  ];

  return (
    <DashboardCard
      title="신규 회원(12개월)"
      action={
        <Link href="/ad/user">
          <Fab color="secondary" size="medium" sx={{ color: "#ffffff" }}>
            <IconUserSquareRounded width={24} />
          </Fab>
        </Link>
      }
      footer={
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height={60}
          width={"100%"}
        />
      }
    >
      <>
        <Stack direction="row" alignItems="flex-end" mt="-20px">
          <Typography variant="h4" fontWeight="700">
            {new Intl.NumberFormat("ko-KR").format(total)}명
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight="700"
            sx={{ marginLeft: 0.5 }}
          >
            (신규)
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
          <Avatar sx={{ bgcolor: "transparent", width: 27, height: 27 }}>
            <IconMoodX width={20} color="#39B69A" />
          </Avatar>
          <Typography
            variant="caption"
            sx={{ fontSize: "0.7rem" }}
            color="textSecondary"
          >
            탈퇴율
          </Typography>
          <Typography variant="subtitle2" fontWeight="600">
            {((del / total) * 100).toFixed(1)}%
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
