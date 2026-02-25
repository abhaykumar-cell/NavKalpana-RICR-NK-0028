import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Box,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MainLayout from "../components/layout/MainLayout";
import { getAllCourses } from "../api/CourseService";
import { useNavigate } from "react-router-dom";

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const gradients = [
    "linear-gradient(135deg,#6366f1,#8b5cf6)",
    "linear-gradient(135deg,#06b6d4,#3b82f6)",
    "linear-gradient(135deg,#f97316,#fb923c)",
    "linear-gradient(135deg,#16a34a,#22c55e)",
  ];

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 5 }}>

        {/* HEADER */}
        <Typography variant="h4" fontWeight={800} mb={4}>
          Courses
        </Typography>

        {/* LOADING */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        )}

        {/* EMPTY */}
        {!loading && courses.length === 0 && (
          <Typography textAlign="center" mt={5}>
            No courses found
          </Typography>
        )}

        {/* CARDS */}
        <Grid container spacing={4}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                onClick={() =>
                  navigate(`/course/${course.id}/students`)
                }
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#fff",
                  boxShadow: "0 15px 35px rgba(0,0,0,.08)",
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 25px 50px rgba(0,0,0,.18)",
                  },
                }}
              >
                {/* Gradient Top Strip */}
                <Box
                  sx={{
                    height: 6,
                    background:
                      gradients[index % gradients.length],
                  }}
                />

                <CardContent sx={{ p: 4 }}>

                  {/* Icon + Title */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={3}
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: "50%",
                        background:
                          gradients[index % gradients.length],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      {index % 2 === 0 ? (
                        <SchoolIcon />
                      ) : (
                        <AutoStoriesIcon />
                      )}
                    </Box>

                    <Typography
                      fontWeight={800}
                      fontSize={18}
                    >
                      {course.name}
                    </Typography>
                  </Box>

                  {/* Footer */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Chip
                      label={course.type || "Course"}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        background:
                          gradients[index % gradients.length],
                        color: "#fff",
                      }}
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      View Students →
                    </Typography>
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </MainLayout>
  );
};

export default CourseListPage;