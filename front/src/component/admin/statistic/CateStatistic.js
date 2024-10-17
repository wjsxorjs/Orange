import { Box, Tab } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { useState } from "react";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import CateStatisticComp from "./CateStatisticComp";

const CateStatistic = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardCard title="HOT 카테고리 TOP 5">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="오늘" value="1" />
              <Tab label="1주" value="2" />
              <Tab label="1달" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CateStatisticComp categoryType="1" />
          </TabPanel>
          <TabPanel value="2">
            <CateStatisticComp categoryType="2" />
          </TabPanel>
          <TabPanel value="3">
            <CateStatisticComp categoryType="3" />
          </TabPanel>
        </TabContext>
      </Box>
    </DashboardCard>
  );
};

export default CateStatistic;
