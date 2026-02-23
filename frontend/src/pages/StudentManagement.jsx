import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import StudentSummaryCards from "../components/student/StudentSummaryCards";
import StudentSearchFilter from "../components/student/StudentSearchFilter";
import StudentTable from "../components/student/StudentTable";
import StudentDetailModal from "../components/student/StudentDetailModal";
import { getStudents } from "../api/studentService";
import MainLayout from "../components/layout/MainLayout";   // ⭐ IMPORTANT

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getStudents().then(setStudents);
  }, []);

  const courses = [...new Set(students.map((s) => s.course))];

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.enrollmentId.toLowerCase().includes(search.toLowerCase());
    const matchCourse = course ? s.course === course : true;
    return matchSearch && matchCourse;
  });

  return (
    <MainLayout>   {/* ⭐ THIS FIXES SIDEBAR */}
      <Container maxWidth="xl">
        <Typography variant="h5" fontWeight={700} mb={2}>
          Student Management
        </Typography>

        <StudentSummaryCards students={students} />

        <StudentSearchFilter
          search={search}
          setSearch={setSearch}
          course={course}
          setCourse={setCourse}
          courses={courses}
        />

        <Box mt={2}>
          <StudentTable students={filtered} onOpen={setSelected} />
        </Box>

        <StudentDetailModal
          open={!!selected}
          onClose={() => setSelected(null)}
          student={selected}
        />
      </Container>
    </MainLayout>
  );
};

export default StudentManagement;