import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({ toggleDrawer, open }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // 🔥 FIX: navigate define kar diya

  // 🔥 Time-based Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();

    // 🔥 Example logout logic
    localStorage.removeItem("token"); // if using token
    navigate("/login"); // redirect to login page
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#ffffff",
        color: "#111827",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!open && (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" fontWeight="700">
            Dashboard
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          
          {/* Greeting */}
          <Typography variant="body1" fontWeight="500">
            {getGreeting()}, <strong>Teacher</strong>
          </Typography>

          {/* Notifications */}
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Section */}
          <Box
            onClick={handleOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              px: 1.5,
              py: 0.5,
              borderRadius: 3,
              "&:hover": { backgroundColor: "#f3f4f6" },
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#6C63FF",
                width: 36,
                height: 36,
              }}
            >
              T
            </Avatar>

            <Typography fontSize={14} fontWeight="600">
              Senior Faculty
            </Typography>

            <KeyboardArrowDownIcon fontSize="small" />
          </Box>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: 1,
                mt: 1,
                minWidth: 180,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/profile");
              }}
            >
              My Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/settings");
              }}
            >
              Settings
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={handleLogout}
              sx={{ color: "error.main" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;