import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ open, closeDrawer }) => {
  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Batch Management", path: "/batches", icon: <SchoolIcon /> },
{ text: "Assessment Management", path: "/assessment-management", icon: <AssignmentIcon /> },
    { text: "Student Management", path: "/students", icon: <PeopleIcon /> },
    { text: "Support Requests", path: "/support", icon: <SupportAgentIcon /> },
  ];

  return (
    <Box
      sx={{
        width: open ? drawerWidth : 0,
        transition: "width 0.3s ease",
        overflowX: "hidden",
        background: "#111827",
        color: "#fff",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      {open && (
        <>
          <Toolbar>
            <Typography variant="h6" fontWeight="bold">
              EduPortal
            </Typography>
          </Toolbar>

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={NavLink}
                to={item.path}
                onClick={closeDrawer}  
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  "&.active": {
                    backgroundColor: "#6C63FF",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
