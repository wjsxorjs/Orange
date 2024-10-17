import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Link, Typography } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import axios from "axios";
import { useEffect, useState } from "react";

const RecentTransactions = () => {
  const [qnaList, setQnaList] = useState([]);
  const colorList = [
    "primary",
    "secondary",
    "success",
    "warning",
    "error",
    "success",
  ];

  useEffect(() => {
    axios({
      url: "/api/ad/getQnaList",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setQnaList(res.data.res_getQnaList);
    });
  }, []);

  return (
    <DashboardCard title="문의사항">
      <>
        <Timeline
          className="theme-timeline"
          sx={{
            p: 0,

            height: 420,
            mb: "-40px",
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: "#efefef",
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.6,
              paddingLeft: 0,
            },
          }}
        >
          {qnaList.map((qna, i) => (
            <TimelineItem key={i}>
              <TimelineOppositeContent>
                {new Date(qna.create_dtm).toLocaleString("ko-KR", {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // 24시간 형식
                })}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={colorList[i]} variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Link href="/" underline="none">
                  <Typography fontWeight="600">{qna.title}</Typography>
                </Link>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
