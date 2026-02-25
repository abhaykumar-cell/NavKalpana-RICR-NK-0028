import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Avatar,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useState, useEffect } from "react";
import { searchStudents } from "../api/studentService";

const StudentManagement = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Search Logic (Debounced)
  useEffect(() => {
    if (!search.trim()) {
      setStudents([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchStudents(search);
        setStudents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Search failed", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

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

          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            mb={3}
          >
            <Typography variant="h4" fontWeight={800}>
              Student Management
            </Typography>

            <TextField
              size="small"
              placeholder="Search by Name / Enrollment / Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: { xs: "100%", md: 320 },
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

          {/* 🔥 SEARCH RESULTS */}
          {search && (
            <Box mb={4}>
              {loading ? (
                <CircularProgress />
              ) : students.length === 0 ? (
                <Typography>No students found</Typography>
              ) : (
                <Grid container spacing={2}>
                  {students.map((student) => (
                    <Grid item xs={12} md={6} key={student.id}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow:
                            "0 10px 25px rgba(0,0,0,0.08)",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate(`/students/${student.id}`)
                        }
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Avatar>
                            <PersonIcon />
                          </Avatar>

                          <Box>
                            <Typography fontWeight={700}>
                              {student.name}
                            </Typography>
                            <Typography variant="body2">
                              {student.email}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Enrollment: {student.enrollmentNumber}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {/* 🔥 LEFT ALIGNED CARDS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              mt: { xs: 4, md: 6 },
            }}
          >
            <Grid
              container
              spacing={4}
              justifyContent="flex-start"
              maxWidth={900}
            >

              {/* ⭐ BY BATCH */}
              <Grid item>
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
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
                      boxShadow:
                        "0 20px 40px rgba(99,102,241,.35)",
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
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }}>
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
                      boxShadow:
                        "0 20px 40px rgba(37,99,235,.35)",
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