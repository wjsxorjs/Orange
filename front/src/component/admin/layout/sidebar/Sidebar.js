import { useMediaQuery, Box, Drawer, useTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Sidebar, Logo } from "react-mui-sidebar";
import Link from "next/link";

const MSidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const theme = useTheme(); // theme 객체를 useTheme으로 가져오기
  const lgUp = useMediaQuery(theme.breakpoints.up("lg")); // theme을 사용하여 breakpoints 적용

  const sidebarWidth = "270px";

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* Sidebar for desktop */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              ...scrollbarStyles,
            },
          }}
        >
          {/* Sidebar Box */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Sidebar
              width={"270px"}
              collapsewidth="80px"
              open={isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* Logo */}
              <div
                className="MuiListItemText-root css-1dvnewu"
                style={{
                  display: "flex",
                  justifyContent: "center", // 수평 중앙 정렬
                  alignItems: "center", // 수직 중앙 정렬
                  flexDirection: "column", // 로고와 텍스트 로고를 세로로 배치
                  height: "100%", // 부모 div의 높이를 100%로 설정 (필요 시 설정)
                }}
              >
                <Link
                  data-gtm="gnb_logo"
                  href="/"
                  className="_1h4pbgy9ug _1h4pbgy9wo _1h4pbgy9yw"
                  style={{ marginTop: "20px" }} // 상단에 20px의 마진 추가
                >
                  <img
                    src="/img/Orange_logo_final.png"
                    alt="당근마켓 로고"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <br />
                </Link>
              </div>

              <Box>
                {/* Sidebar Items */}
                <SidebarItems />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      {/* Sidebar Box */}
      <Box px={2}>
        <Sidebar
          width={"270px"}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          {/* Logo */}
          <Logo img="/images/logos/dark-logo.svg" />
          {/* Sidebar Items */}
          <SidebarItems />
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
