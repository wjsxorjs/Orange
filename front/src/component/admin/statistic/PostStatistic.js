import { Box, MenuItem, Select, Tab } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import { useEffect, useState } from "react";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import PostStatisticComp from "./PostStatisticComp";

const PostStatistic = () => {
  const [value, setValue] = useState("1");
  const [valueLabel, setValueLabel] = useState("오늘");
  const [dateValue, setDateValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "1":
        setValueLabel("오늘");
        break;
      case "2":
        setValueLabel("1주");
        break;
      case "3":
        setValueLabel("1달");
        break;
    }
  };

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  return (
    <DashboardCard title="HOT 게시글 TOP 10">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <TabList onChange={handleChange}>
              <Tab label="오늘" value="1" />
              <Tab label="1주" value="2" />
              <Tab label="1달" value="3" />
            </TabList>
            <Select
              size="small"
              value={dateValue}
              onChange={handleDateChange} // Add select change handler here
            >
              <MenuItem value="1">{valueLabel} 조회수</MenuItem>
              <MenuItem value="2">{valueLabel} 관심수</MenuItem>
              <MenuItem value="3">{valueLabel} 채팅수</MenuItem>
            </Select>
          </Box>
          <TabPanel value="1">
            <PostStatisticComp
              key={`tab1-${dateValue}`}
              categoryType="1"
              dateType={dateValue}
            />
          </TabPanel>
          <TabPanel value="2">
            <PostStatisticComp
              key={`tab2-${dateValue}`}
              categoryType="2"
              dateType={dateValue}
            />
          </TabPanel>
          <TabPanel value="3">
            <PostStatisticComp
              key={`tab3-${dateValue}`}
              categoryType="3"
              dateType={dateValue}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </DashboardCard>
  );
};

export default PostStatistic;
