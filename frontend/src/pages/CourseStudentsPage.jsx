import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Avatar,
  Chip,
  Stack,
  TextField,
  Paper,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { getStudentsByCourse } from "../api/CourseService";
import StudentDetailModal from "../components/student/StudentDetailModal";
import { getAttendanceColor } from "../utils/attendanceColor";
import attendanceService from "../api/attendanceService"; // ✅ import attendance api

const CourseStudentsPage = () => {
  const { id } = useParams();

  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // ✅ studentId -> %
  const [loading, setLoading] = useState(true);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ Load students
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getStudentsByCourse(id);
        setStudents(data ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // ✅ Load attendance for all students
  useEffect(() => {
    const loadAttendance = async () => {
      if (!students || students.length === 0) return;

      try {
        setAttendanceLoading(true);

        const map = {};

        for (const s of students) {
          try {
            const records = await attendanceService.getAttendanceByStudent(
              s.id
            );

            if (!records || records.length === 0) {
              map[s.id] = 0;
              continue;
            }

            const total = records.length;
            const present = records.filter(
              (r) => r.status === "PRESENT"
            ).length;

            map[s.id] = Number(((present / total) * 100).toFixed(1));
          } catch (e) {
            console.error("Attendance error for student", s.id, e);
            map[s.id] = 0;
          }
        }

        setAttendanceMap(map);
      } catch (e) {
        console.error(e);
      } finally {
        setAttendanceLoading(false);
      }
    };

    loadAttendance();
  }, [students]);

  // ✅ Search filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.enrollmentId?.toLowerCase().includes(q)
    );
  }, [students, search]);

  // ✅ DataGrid columns
  const columns = [
    {
      field: "avatar",
      headerName: "",
      width: 70,
      sortable: false,
      renderCell: (p) => (
        <Avatar sx={{ bgcolor: "#6366f1" }}>{p.row.name?.[0]}</Avatar>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "enrollmentId", headerName: "Enrollment", flex: 1 },

    {
      field: "attendance",
      headerName: "Attendance",
      flex: 1,
      renderCell: (p) => {
        const percent = attendanceMap[p.row.id] ?? 0;

        return (
          <Chip
            label={
              attendanceLoading ? "..." : `${percent}%`
            }
            color={getAttendanceColor(percent)}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        );
      },
    },

    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },

    {
      field: "actions",
      headerName: "View",
      width: 80,
      sortable: false,
      renderCell: (p) => (
        <Tooltip title="View Student">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setSelected(p.row);
            }}
            sx={{
              bgcolor: "#eef2ff",
              "&:hover": { bgcolor: "#e0e7ff" },
            }}
          >
            <VisibilityIcon sx={{ color: "#4338ca" }} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" fontWeight={800}>
            Course Students
          </Typography>

          <TextField
            placeholder="Search name / email / enrollment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ minWidth: 320 }}
          />
        </Box>

        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filtered}
              columns={columns}
              autoHeight
              getRowId={(row) => row.id}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: "#f8fafc",
                  fontWeight: 700,
                },
              }}
            />
          )}
        </Paper>

        <StudentDetailModal
          open={!!selected}
          student={selected}
          onClose={() => setSelected(null)}
        />
      </Container>
    </MainLayout>
  );
};

export default CourseStudentsPage;