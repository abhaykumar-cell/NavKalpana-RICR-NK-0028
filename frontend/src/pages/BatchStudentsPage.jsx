import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Avatar,
  Chip,
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
import { getStudentsByBatch } from "../api/studentService";
import StudentDetailModal from "../components/student/StudentDetailModal";
import { getAttendanceColor } from "../utils/attendanceColor";

const BatchStudentsPage = () => {
  const { id } = useParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  /* ===============================
        FETCH STUDENTS
  ============================== */
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);

        const data = await getStudentsByBatch(id);

        // ✅ IMPORTANT:
        // Attendance % yahi se direct use hoga
        const processed = (data ?? []).map((student) => ({
          ...student,
          attendancePercentage: Number(student.attendancePercentage ?? 0),
        }));

        setStudents(processed);
      } catch (error) {
        console.error("Error loading students:", error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [id]);

  /* ===============================
        SEARCH FILTER
  ============================== */
  const filteredStudents = useMemo(() => {
    const q = search.toLowerCase();

    return students.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.enrollmentId?.toLowerCase().includes(q)
    );
  }, [students, search]);

  /* ===============================
        TABLE COLUMNS
  ============================== */
  const columns = [
    {
      field: "avatar",
      headerName: "",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <Avatar sx={{ bgcolor: "#6366f1" }}>
          {params.row.name?.[0]}
        </Avatar>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "enrollmentId",
      headerName: "Enrollment",
      flex: 1,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 1,
    },
    {
      field: "attendancePercentage",
      headerName: "Attendance",
      flex: 1,
      renderCell: (params) => {
        const percent = params.row.attendancePercentage ?? 0;

        return (
          <Chip
            label={`${percent}%`}
            color={getAttendanceColor(percent)}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "View",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="View Student">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setSelected(params.row);
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
            Batch Students
          </Typography>

          <TextField
            placeholder="Search name / email / enrollment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ minWidth: 320, bgcolor: "#fff" }}
          />
        </Box>

        <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filteredStudents}
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

export default BatchStudentsPage;