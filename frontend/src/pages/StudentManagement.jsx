import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import StudentSummaryCards from "../components/student/StudentSummaryCards";
import StudentSearchFilter from "../components/student/StudentSearchFilter";
import StudentTable from "../components/student/StudentTable";
import StudentDetailModal from "../components/student/StudentDetailModal";
import {
  getStudents,
  getSummary,
  getStudentDetail,
  searchStudents,
  filterByCourse,
} from "../api/studentService";
import MainLayout from "../components/layout/MainLayout";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState(null);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [selected, setSelected] = useState(null);

  //  initial load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const studentData = await getStudents();
      setStudents(studentData);

      const summaryData = await getSummary();
      setSummary(summaryData);
    } catch (err) {
      console.error(err);
    }
  };

  //  SEARCH with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = async () => {
    try {
      if (!search) {
        // if search empty → reload course logic
        handleCourseFilter();
        return;
      }

      const data = await searchStudents(search);
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  //  COURSE FILTER
  useEffect(() => {
    handleCourseFilter();
  }, [course]);

  const handleCourseFilter = async () => {
    try {
      if (!course) {
        const data = await getStudents();
        setStudents(data);
        return;
      }

      const data = await filterByCourse(course);
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  //  Modal open
  const handleOpen = async (student) => {
    try {
      const data = await getStudentDetail(student.id);
      setSelected(data);
    } catch (err) {
      console.error(err);
    }
  };

  // dropdown courses
  const courses = [...new Set(students.map((s) => s.course))];

  return (
    <MainLayout>
      <Container maxWidth="xl">
        <Typography variant="h5" fontWeight={700} mb={2}>
          Student Management
        </Typography>

        <StudentSummaryCards students={students} summary={summary} />

        <StudentSearchFilter
          search={search}
          setSearch={setSearch}
          course={course}
          setCourse={setCourse}
          courses={courses}
        />

        <Box mt={2}>
          <StudentTable students={students} onOpen={handleOpen} />
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