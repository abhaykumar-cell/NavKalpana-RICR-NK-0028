import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true); // default open desktop

  const toggleDrawer = () => {
    setOpen(prev => !prev);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>

      {/* Sidebar */}
      <Sidebar open={open} closeDrawer={closeDrawer} />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : "0px",
          transition: "margin 0.3s ease",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}
        <TopNavbar open={open} toggleDrawer={toggleDrawer} />

        {/* Scrollable Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>

    </Box>
  );
};

export default MainLayout;