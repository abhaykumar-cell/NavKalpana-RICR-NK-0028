import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./AssessmentManagement.css";
import MainLayout from "../layout/MainLayout";

const AssessmentManagement = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/course")
      .then((res) => {
        if (res.data.success) {
          setCourses(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <MainLayout>
    <Box className="assessment-container">
      <Typography variant="h4" className="assessment-title">
        Assessment Management
      </Typography>

      <div className="course-grid">
        {courses.map((course) => (
          <Card key={course.id} className="course-card">
            <CardContent>
              <Typography variant="h6">{course.name}</Typography>
              <Typography>{course.type}</Typography>
              <Typography>{course.totalBatches} Batches</Typography>

              <Button
                variant="contained"
                onClick={() =>
                  navigate(`/assessment-management/course/${course.id}`)
                }
              >
                View Lessons
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Box>
    </MainLayout>
  );
};

export default AssessmentManagement;