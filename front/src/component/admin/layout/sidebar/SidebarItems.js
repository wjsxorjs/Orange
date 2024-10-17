import React from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import Menuitems from "./Menuitems";

const SidebarItems = ({ toggleMobileSidebar }) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item, i) => {
          // SubHeader
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem
                key = {i}
                item={item}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
