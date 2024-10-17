"use client";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "@/component/admin/container/PageContainer";
// components
import SalesOverview from "@/component/admin/dashboard/SalesOverview";
import YearlyBreakup from "@/component/admin/dashboard/YearlyBreakup";
import RecentTransactions from "@/component/admin/dashboard/RecentTransactions";
import ProductPerformance from "@/component/admin/dashboard/ProductPerformance";
import Blog from "@/component/admin/dashboard/Blog";
import MonthlyEarnings from "@/component/admin/dashboard/MonthlyEarnings";
import Top_Analytic from "@/component/admin/dashboard/Top_Analytic";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalVO, setTotalVO] = useState({});

  useEffect(() => {
    axios({
      url: "/api/ad/getTotal", // 실제 검색 API
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setTotalVO(res.data.res_getTotal); // 데이터 업데이트
    });
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">전체 현황</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Top_Analytic
              title="게시글"
              count={new Intl.NumberFormat("ko-KR").format(totalVO.cntPost)}
              //percentage={59.3}
              extra={new Intl.NumberFormat("ko-KR").format(totalVO.cntPostYear)}
              sort="year"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Top_Analytic
              title="사용자"
              count={new Intl.NumberFormat("ko-KR").format(totalVO.cntUser)}
              //percentage={70.5}
              extra={new Intl.NumberFormat("ko-KR").format(totalVO.cntUserYear)}
              sort="year"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Top_Analytic
              title="게시판"
              count={new Intl.NumberFormat("ko-KR").format(totalVO.cntBbs)}
              //percentage={27.4}
              isLoss
              //color="warning"
              extra={new Intl.NumberFormat("ko-KR").format(totalVO.cntBbsYear)}
              sort="year"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Top_Analytic
              title="미답변 문의사항"
              count={new Intl.NumberFormat("ko-KR").format(totalVO.cntQna)}
              //percentage={27.4}
              isLoss
              //color="warning"
              extra={new Intl.NumberFormat("ko-KR").format(totalVO.cntQnaDay)}
              sort="day"
            />
          </Grid>

          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
