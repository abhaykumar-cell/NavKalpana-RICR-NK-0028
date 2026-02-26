import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AnalyticsIcon from "@mui/icons-material/Analytics";

import { NavLink, useLocation } from "react-router-dom";

const drawerWidth = 260;

const Sidebar = ({ open, closeDrawer }) => {
  const location = useLocation();

  const mainMenu = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Batch Management", path: "/batches", icon: <SchoolIcon /> },
    {
      text: "Assessment Management",
      path: "/assessment-management",
      icon: <AssignmentIcon />,
    },
    {
      text: "Student Management",
      path: "/student-management",
      icon: <PeopleIcon />,
    },
  ];

  const renderMenuItem = (item, nested = false) => (
    <ListItemButton
      key={item.text}
      component={NavLink}
      to={item.path}
      onClick={closeDrawer}
      sx={{
        mx: 1,
        my: 0.5,
        pl: nested ? 4 : 2,
        borderRadius: 2.5,
        color: "#cbd5e1",
        minHeight: 44,
        transition: "all 0.2s ease",

        "&.active": {
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          color: "#fff",
          boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
        },

        "&:hover": {
          backgroundColor: "#1f2937",
          color: "#fff",
        },
      }}
    >
      <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
        {item.icon}
      </ListItemIcon>

      <ListItemText
        primary={item.text}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: 500,
        }}
      />
    </ListItemButton>
  );

  return (
    <Box
      sx={{
        width: open ? drawerWidth : 0,
        transition: "width 0.3s ease",
        overflowX: "hidden",
        background:
          "linear-gradient(180deg, #020617 0%, #0f172a 40%, #020617 100%)",
        color: "#fff",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        boxShadow: "6px 0 30px rgba(0,0,0,0.35)",
        backdropFilter: "blur(10px)",
      }}
    >
      {open && (
        <>
          {/* ===== LOGO ===== */}
          <Toolbar>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                letterSpacing: 0.5,
                background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              EduPortal
            </Typography>
          </Toolbar>

          <Divider sx={{ borderColor: "#1e293b" }} />

          {/* ===== MAIN ===== */}
          <List sx={{ mt: 1 }}>
            {mainMenu.map((item) => renderMenuItem(item))}
          </List>

          {/* ===== ANALYTICS ===== */}
          <Typography
            sx={{
              px: 2,
              pt: 2,
              pb: 1,
              fontSize: 11,
              fontWeight: 600,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Analytics
          </Typography>

          <List>
            {renderMenuItem({
              text: "Batch Analytics",
              path: "/analytics/batch/1",
              icon: <AnalyticsIcon />,
            })}
          </List>

          {/* ===== SUPPORT ===== */}
          <Typography
            sx={{
              px: 2,
              pt: 2,
              pb: 1,
              fontSize: 11,
              fontWeight: 600,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Support
          </Typography>

          <List>
            {renderMenuItem({
              text: "Support Requests",
              path: "/support",
              icon: <SupportAgentIcon />,
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default Sidebar;