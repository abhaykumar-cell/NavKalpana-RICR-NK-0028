import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar open={open} closeDrawer={closeDrawer} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <TopNavbar open={open} toggleDrawer={toggleDrawer} />

        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          {children}   {/* 🔥 IMPORTANT CHANGE */}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;