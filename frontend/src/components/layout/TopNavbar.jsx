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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { logoutUser } from "../../api/authService";

const TopNavbar = ({ toggleDrawer, open }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  /* ==========================
        FETCH USER FROM BACKEND
  ========================== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/account");

        const teacher = res.data.data;

        console.log("Fetched Teacher:", teacher);

        setUserName(teacher.name);
        setUserRole(teacher.role);

      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  /* ==========================
        GREETING
  ========================== */
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  /* ==========================
        LOGOUT
  ========================== */
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /* ==========================
        AVATAR INITIAL
  ========================== */
  const getInitial = () => {
    return userName ? userName.charAt(0).toUpperCase() : "U";
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
            {getGreeting()},{" "}
            <strong>{userName || "Loading..."}</strong>
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
              {getInitial()}
            </Avatar>

            <Typography fontSize={14} fontWeight="600">
              {userRole || ""}
            </Typography>

            <KeyboardArrowDownIcon fontSize="small" />
          </Box>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/profile");
              }}
            >
              My Profile
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