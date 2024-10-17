import PropTypes from "prop-types";

// material-ui
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// assets
import RiseOutlined from "@ant-design/icons/RiseOutlined";
import FallOutlined from "@ant-design/icons/FallOutlined";

// project import
import DashboardCard from "../shared/DashboardCard";
import { useState } from "react";

const iconSX = {
  fontSize: "0.75rem",
  color: "inherit",
  marginLeft: 0,
  marginRight: 0,
};

export default function AnalyticEcommerce({
  color = "primary",
  title,
  count,
  percentage,
  isLoss,
  extra,
  sort,
}) {
  return (
    <DashboardCard>
      <Stack spacing={0.5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={
                  isLoss ? (
                    <FallOutlined style={iconSX} />
                  ) : (
                    <RiseOutlined style={iconSX} />
                  )
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        {extra && (
          <Typography variant="caption" color="text.secondary">
            {sort === "year"
              ? `${new Date().getFullYear()}년 추가된 항목 `
              : "오늘 추가된 항목 "}
            <Typography
              variant="caption"
              sx={{ color: `${color || "primary"}.main` }}
            >
              {extra}
            </Typography>{" "}
          </Typography>
        )}
      </Box>
    </DashboardCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
};
