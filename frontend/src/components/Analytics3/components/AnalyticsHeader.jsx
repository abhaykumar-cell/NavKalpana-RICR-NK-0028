import {
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";

import { useEffect, useState } from "react";
import { getAllBatches } from "../../../api/BatchService";
import { getAllCourses } from "../../../api/courseService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function AnalyticsHeader({
  batchId,
  setBatchId,
  courseId,
  setCourseId,
}) {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ==========================
        FETCH DROPDOWN DATA
  ========================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [batchData, courseData] = await Promise.all([
          getAllBatches(),
          getAllCourses(),
        ]);

        setBatches(batchData || []);
        setCourses(courseData || []);
      } catch (error) {
        console.error("Dropdown Load Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ==========================
        EXPORT PDF
  ========================== */
  const handleExport = () => {
    const selectedBatch = batches.find((b) => b.id === batchId);
    const selectedCourse = courses.find((c) => c.id === courseId);

    const doc = new jsPDF();

    // Header
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("NavKalpana Analytics Report", 20, 18);

    // Body
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);

    doc.text(`Batch: ${selectedBatch?.name || "Not Selected"}`, 20, 45);
    doc.text(`Course: ${selectedCourse?.name || "Not Selected"}`, 20, 55);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 20, 65);

    doc.line(20, 72, 190, 72);

    const analyticsData = [
      ["Metric", "Value"],
      ["Total Students", "120"],
      ["Active Students", "105"],
      ["Average Quiz Score", "82%"],
      ["Assignment Completion", "91%"],
      ["Attendance Rate", "88%"],
      ["Module Completion Rate", "76%"],
    ];

    autoTable(doc, {
      startY: 80,
      head: [analyticsData[0]],
      body: analyticsData.slice(1),
      theme: "striped",
      headStyles: {
        fillColor: [79, 70, 229],
      },
      styles: {
        halign: "center",
      },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "Confidential - NavKalpana Learning Management System",
      20,
      pageHeight - 10
    );

    doc.save("NavKalpana-Analytics-Report.pdf");
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        mb: 4,
        display: "flex",
        justifyContent: "flex-end",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Typography fontWeight={600} mr="auto">
        Analytics Filters
      </Typography>

      {/* Batch Dropdown */}
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Batch</InputLabel>
        <Select
          value={batchId || ""}
          label="Batch"
          onChange={(e) => setBatchId(e.target.value)}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
            </MenuItem>
          ) : (
            batches.map((batch) => (
              <MenuItem key={batch.id} value={batch.id}>
                {batch.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* Course Dropdown */}
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Course</InputLabel>
        <Select
          value={courseId || ""}
          label="Course"
          onChange={(e) => setCourseId(e.target.value)}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={20} />
            </MenuItem>
          ) : (
            courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* Export Button */}
      <Button
        variant="contained"
        disabled={!batchId || !courseId}
        onClick={handleExport}
        sx={{
          px: 3,
          py: 1,
          fontWeight: 600,
          borderRadius: 2,
        }}
      >
        Export PDF
      </Button>
    </Paper>
  );
}