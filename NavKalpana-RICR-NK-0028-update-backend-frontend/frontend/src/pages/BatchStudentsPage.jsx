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
        FETCH
  ============================== */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getStudentsByBatch(id);
        setStudents(data ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  /* ===============================
        SEARCH
  ============================== */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.enrollmentId?.toLowerCase().includes(q)
    );
  }, [students, search]);

  /* ===============================
        TABLE
  ============================== */
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
    { field: "course", headerName: "Course", flex: 1 },

    {
      field: "modules",
      headerName: "Modules",
      flex: 1,
      renderCell: (p) => (
        <Stack direction="row" spacing={0.5}>
          {(p.row.modules ?? []).slice(0, 2).map((m) => (
            <Chip
              key={m}
              label={m}
              size="small"
              sx={{
                bgcolor: "#eef2ff",
                color: "#4338ca",
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>
      ),
    },

    {
      field: "attendance",
      headerName: "Attendance",
      flex: 1,
      renderCell: (p) => (
        <Chip
          label={`${p.row.attendance ?? 0}%`}
          color={getAttendanceColor(p.row.attendance ?? 0)}
          size="small"
          sx={{ fontWeight: 700 }}
        />
      ),
    },

    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },

    /* ⭐ VIEW BUTTON COLUMN */
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

  /* ===============================
        UI
  ============================== */
  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* ⭐ HEADER */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          gap={2}
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
            sx={{
              minWidth: { xs: "100%", md: 320 },
              bgcolor: "#fff",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* ⭐ TABLE */}
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

        {/* ⭐ MODAL */}
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