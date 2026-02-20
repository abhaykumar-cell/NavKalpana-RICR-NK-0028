import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(prev => !prev);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

     
      <Sidebar open={open} closeDrawer={closeDrawer} />

      <Box
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : "0px",
          transition: "margin 0.3s ease",
          width: "100%",
        }}
        onClick={() => open && closeDrawer()}
      >
        <TopNavbar open={open} toggleDrawer={toggleDrawer} />

        <Box sx={{ p: 4 }}>
          {children}
        </Box>
      </Box>

    </Box>
  );
};

export default MainLayout;
