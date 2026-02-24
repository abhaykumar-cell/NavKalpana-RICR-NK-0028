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
  Button,
} from "@mui/material";
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
        const data = await getAllCourses(); // 🔥 service already returns data
        console.log("Courses 👉", data);
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

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* HEADER */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>

          <Typography variant="h4" fontWeight={800}>
            Courses
          </Typography>
        </Box>

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
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid xs={12} sm={6} md={4} key={course.id}>
              <Card
                onClick={() =>
                  navigate(`/course/${course.id}/students`)
                }
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                  transition: ".3s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 18px 40px rgba(0,0,0,.15)",
                  },
                }}
              >
                <CardContent>
                  <Typography fontWeight={800}>
                    {course.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {course.description}
                  </Typography>

                  <Chip
                    label={course.type || "Course"}
                    size="small"
                    sx={{ mt: 2 }}
                    color="primary"
                  />
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