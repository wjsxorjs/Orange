import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import DashboardCard from "../shared/DashboardCard";
import axios from "axios";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  const [postOvewview, setPostOverview] = useState([]);
  const [searchYear, setSearchyear] = useState([]);

  // 데이터 가져오기
  function getPostOverview(year) {
    axios({
      url: "/api/ad/postOverview",
      method: "get",
      params: {
        year: year,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setPostOverview(res.data.res_postOverview);
    });
  }

  // 년도 선택
  const handleChange = (event) => {
    getPostOverview(event.target.value);
  };

  // 초기 세팅
  useEffect(() => {
    axios({
      url: "/api/ad/searchYear",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setSearchyear(res.data.res_searchYear);
    });
    getPostOverview();
  }, []);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    // x축
    xaxis: {
      categories: postOvewview.map((item) => item.yearandmonth),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  // 데이터
  const seriescolumnchart = [
    {
      name: "전체",
      data: postOvewview.map((item) => item.cnt),
    },
    {
      name: "거래완료",
      data: postOvewview.map((item) => item.dealcnt),
    },
  ];

  return (
    <DashboardCard
      title="거래 통계"
      subtitle="*삭제된 게시글은 통계에 포함되지 않습니다."
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          size="small"
          defaultValue={new Date().getFullYear()}
          onChange={handleChange}
        >
          {searchYear.map((item, i) => (
            <MenuItem key={i} value={item.substring(0, item.length - 1)}>
              {item}
            </MenuItem>
          ))}
        </Select>
      }
    >
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height={370}
        width={"100%"}
      />
    </DashboardCard>
  );
};

export default SalesOverview;
