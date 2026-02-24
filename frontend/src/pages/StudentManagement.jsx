import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useState } from "react";

const StudentManagement = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          background:
            "linear-gradient(120deg,#eef2ff 0%,#f8fafc 40%,#ecfeff 100%)",
          pt: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* ⭐ HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            mb={4}
          >
            <Typography variant="h4" fontWeight={800}>
              Student Management
            </Typography>

            {/* ⭐ SEARCH */}
            <TextField
              size="small"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: { xs: "100%", md: 280 },
                bgcolor: "#fff",
                borderRadius: 2,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* ⭐ CENTER CARDS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 4, md: 10 },
            }}
          >
            <Grid container spacing={6} justifyContent="center" maxWidth={700}>
              {/* ⭐ BY BATCH */}
              <Grid item>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card
                    onClick={() => navigate("/student-management/batches")}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "30px",
                      width: 260,
                      height: 220,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg,#7c3aed 0%,#6366f1 100%)",
                      color: "white",
                      boxShadow: "0 20px 40px rgba(99,102,241,.35)",
                      transition: ".3s",
                      "&:hover": {
                        boxShadow: "0 25px 50px rgba(99,102,241,.5)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <GroupsIcon sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h5" fontWeight={800}>
                        By Batch
                      </Typography>
                      <Typography sx={{ opacity: 0.9 }}>
                        Explore batch groups
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* ⭐ BY COURSE */}
              <Grid item>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card
                    onClick={() => navigate("/student-management/courses")}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "30px",
                      width: 260,
                      height: 220,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg,#06b6d4 0%,#2563eb 100%)",
                      color: "white",
                      boxShadow: "0 20px 40px rgba(37,99,235,.35)",
                      transition: ".3s",
                      "&:hover": {
                        boxShadow: "0 25px 50px rgba(37,99,235,.5)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <SchoolIcon sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h5" fontWeight={800}>
                        By Course
                      </Typography>
                      <Typography sx={{ opacity: 0.9 }}>
                        Explore course groups
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default StudentManagement;