"use client";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "@/component/admin/container/PageContainer";
// components
import Top_Analytic from "@/component/admin/dashboard/Top_Analytic";
import { useEffect, useState } from "react";
import axios from "axios";
import DealStatistic from "@/component/admin/statistic/DealStatistic";
import CateStatistic from "@/component/admin/statistic/CateStatistic";
import PostStatistic from "@/component/admin/statistic/PostStatistic";

const Statistic = () => {
  const [todayReportVO, setTodayReportVO] = useState({});

  useEffect(() => {
    axios({
      url: "/api/ad/todayReport",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setTodayReportVO(res.data.res_todayReport);
    });
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Today 리포트</Typography>
          </Grid>
          {todayReportVO && Object.keys(todayReportVO).length > 0 && (
            <>
              <Grid item xs={12} sm={6} md={12 / 5} lg={12 / 5}>
                <Top_Analytic
                  title="거래건수"
                  count={new Intl.NumberFormat("ko-KR").format(
                    todayReportVO.dealcnt || 0
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12 / 5} lg={12 / 5}>
                <Top_Analytic
                  title="거래금액"
                  count={new Intl.NumberFormat("ko-KR").format(
                    todayReportVO.dealSum || 0
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12 / 5} lg={12 / 5}>
                <Top_Analytic
                  title="New 게시글"
                  count={new Intl.NumberFormat("ko-KR").format(
                    todayReportVO.newPost || 0
                  )}
                  isLoss
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12 / 5} lg={12 / 5}>
                <Top_Analytic
                  title="New 회원"
                  count={new Intl.NumberFormat("ko-KR").format(
                    todayReportVO.newUser || 0
                  )}
                  isLoss
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12 / 5} lg={12 / 5}>
                <Top_Analytic
                  title="New 채팅방"
                  count={new Intl.NumberFormat("ko-KR").format(
                    todayReportVO.newChat || 0
                  )}
                  isLoss
                />
              </Grid>
              <Grid item xs={12} lg={48 / 10}>
                <DealStatistic />
              </Grid>
              <Grid item xs={12} lg={72 / 10}>
                <CateStatistic />
              </Grid>
              <Grid item xs={12} lg={12}>
                <PostStatistic />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Statistic;
