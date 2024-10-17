import React, { useEffect, useState } from "react";
import { Select, MenuItem, Box, Tab } from "@mui/material";
import dynamic from "next/dynamic";
import DashboardCard from "../shared/DashboardCard";
import { TabContext, TabPanel, TabList } from "@mui/lab";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AnalUserDay({ title, record }) {
  const [data, setData] = useState([]);
  const [seriescolumnchart, setSeriescolumnchart] = useState([]);
  // 초기 세팅
  useEffect(() => {
    setData(record);
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      // 일별
      setSeriescolumnchart([
        {
          name: "회원가입 수",
          type: "line",
          data: data.map((item) => item.su_count),
        },
        {
          name: "게시글 작성수",
          type: "line",
          data: data.map((item) => item.pc_count),
        },
        {
          name: "거래 완료수",
          type: "line",
          data: data.map((item) => item.pd_count),
        },
      ]);
    }
  }, [data]);

  const dayOptionscolumnchart = {
    chart: {
      type: "line",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 370,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        distributed: true,
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    colors: ["#03a9f4", "#ff9800", "#4caf50"], // 각각의 색상
    markers: {
      size: 5, // 포인트 크기 설정
      colors: ["#03a9f4", "#ff9800", "#4caf50"], // 포인트 색상 설정
      strokeColors: "#fff", // 포인트 테두리 색상
      strokeWidth: 2, // 포인트 테두리 두께
      hover: {
        sizeOffset: 3, // 마우스를 올렸을 때 포인트 크기 증가
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
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
      categories: data.map((item) => item.day_name), // 각 데이터를 나타내는 카테고리
      axisBorder: {
        show: false,
      },
      padding: {
        left: 10, // 왼쪽 마진
        right: 10, // 오른쪽 마진
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
    yaxis: [
      {
        title: {
          text: "회원가입 수", // 첫 번째 y축의 라벨
          style: {
            color: "#03a9f4",
          },
        },
        labels: {
          style: {
            colors: "#03a9f4",
          },
        },
        opposite: false, // 왼쪽 y축
      },
      {
        title: {
          text: "게시글 작성 수", // 두 번째 y축의 라벨
          style: {
            color: "#ff9800",
          },
        },
        labels: {
          style: {
            colors: "#ff9800",
          },
        },
        opposite: true, // 오른쪽 y축
      },
      {
        title: {
          text: "거래 완료 수", // 세 번째 y축의 라벨
          style: {
            color: "#4caf50",
          },
        },
        labels: {
          style: {
            colors: "#4caf50",
          },
        },
        opposite: true, // 오른쪽 y축, 두 번째 y축과 함께 위치
        offsetX: 80, // 오른쪽 두 번째 y축을 약간 더 오른쪽으로 밀어내기
      },
    ],
  };

  return (
    <DashboardCard>
      <Box sx={{ width: "100%", typography: "body1" }}>
        {dayOptionscolumnchart && seriescolumnchart.length > 0 && (
          <Chart
            options={dayOptionscolumnchart}
            series={seriescolumnchart}
            type="line"
            height={340}
            width={"100%"}
          />
        )}
      </Box>
    </DashboardCard>
  );
}
