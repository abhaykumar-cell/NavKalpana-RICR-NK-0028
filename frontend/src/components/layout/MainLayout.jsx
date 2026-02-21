import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const drawerWidth = 240;

const MainLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={open} closeDrawer={() => setOpen(false)} />

      <Box
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : "0px",
          transition: "0.3s",
        }}
      >
        <TopNavbar toggleDrawer={() => setOpen(!open)} open={open} />

        <Box sx={{ p: 4 }}>
          <Outlet /> {/* Yahi content change karega */}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;