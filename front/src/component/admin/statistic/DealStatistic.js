import React, { useEffect, useState } from "react";
import { Select, MenuItem, Box, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import DashboardCard from "../shared/DashboardCard";
import axios from "axios";
import { TabContext, TabPanel, TabList } from "@mui/lab";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DealStatistic = () => {
  const [dealstatistic, setDealstatisticVO] = useState([]);

  const [daySeriescolumnchart, setDaySeriescolumnchart] = useState([]);
  const [weekSeriescolumnchart, setWeekSeriescolumnchart] = useState([]);
  const [monthSeriescolumnchart, setMonthSeriescolumnchart] = useState([]);
  // 초기 세팅
  useEffect(() => {
    axios({
      url: "/api/ad/dealstatistic",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setDealstatisticVO(res.data.res_dealstatistic);
    });
  }, []);

  useEffect(() => {
    if (dealstatistic && Object.keys(dealstatistic).length > 0) {
      // 일별
      setDaySeriescolumnchart([
        {
          name: "거래 건수",
          data: [
            dealstatistic.dayavg,
            dealstatistic.yesterday,
            dealstatistic.today,
          ],
        },
      ]);
      // 주별
      setWeekSeriescolumnchart([
        {
          name: "거래 건수",
          data: [
            dealstatistic.weekavg,
            dealstatistic.lastweek,
            dealstatistic.thisweek,
          ],
        },
      ]);
      // 월별
      setMonthSeriescolumnchart([
        {
          name: "거래 건수",
          data: [
            dealstatistic.monthavg,
            dealstatistic.lastmonth,
            dealstatistic.thismonth,
          ],
        },
      ]);
    }
  }, [dealstatistic]);

  const dayOptionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 370,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
        distributed: true,
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    colors: ["#03a9f4", "#ff9800", "#4caf50"], // 각각의 색상
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
    xaxis: {
      categories: ["최근 7일 평균", "어제", "오늘"], // 각 데이터를 나타내는 카테고리
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  const weekOptionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 370,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
        distributed: true,
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    colors: ["#03a9f4", "#ff9800", "#4caf50"], // 각각의 색상
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
    xaxis: {
      categories: ["최근 4주 평균", "지난주", "이번주"], // 각 데이터를 나타내는 카테고리
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  const monthOptionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 370,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
        distributed: true,
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    colors: ["#03a9f4", "#ff9800", "#4caf50"], // 각각의 색상
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
    xaxis: {
      categories: ["최근 3개월 평균", "지난달", "이번달"], // 각 데이터를 나타내는 카테고리
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardCard title="거래 통계">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="일별 거래" value="1" />
              <Tab label="주별 거래" value="2" />
              <Tab label="월별 거래" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {dayOptionscolumnchart && daySeriescolumnchart.length > 0 && (
              <Chart
                options={dayOptionscolumnchart}
                series={daySeriescolumnchart}
                type="bar"
                height={340}
                width={"100%"}
              />
            )}
          </TabPanel>
          <TabPanel value="2">
            {weekOptionscolumnchart && weekSeriescolumnchart.length > 0 && (
              <Chart
                options={weekOptionscolumnchart}
                series={weekSeriescolumnchart}
                type="bar"
                height={340}
                width={"100%"}
              />
            )}
          </TabPanel>
          <TabPanel value="3">
            {monthOptionscolumnchart && monthSeriescolumnchart.length > 0 && (
              <Chart
                options={monthOptionscolumnchart}
                series={monthSeriescolumnchart}
                type="bar"
                height={340}
                width={"100%"}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </DashboardCard>
  );
};

export default DealStatistic;
