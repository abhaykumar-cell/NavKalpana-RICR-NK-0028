import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { getAllBatches } from "../api/BatchService";

const statusStyles = {
  ONGOING: { bg: "#eef2ff", color: "#4338ca" },
  UPCOMING: { bg: "#fff7ed", color: "#c2410c" },
  COMPLETED: { bg: "#dcfce7", color: "#15803d" },
};

const BatchListPage = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllBatches();

        // ⭐ ApiResponse wrapper fix
        const data = res?.data ?? res ?? [];

        setBatches(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setBatches([]);
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
            Batches
          </Typography>
        </Box>

        {/* LOADER */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        )}

        {/* CARDS */}
        <Grid container spacing={4}>
          {batches?.map((batch, i) => {
            const status = batch?.status || "ONGOING";
            const style = statusStyles[status] || statusStyles.ONGOING;

            return (
              <Grid item xs={12} sm={6} md={4} key={batch?.id || i}>
                {/* ⭐ CLICKABLE CARD */}
                <Card
                  onClick={() => navigate(`/batch/${batch.id}/students`)}
                  sx={{
                    cursor: "pointer",
                    height: 200,
                    borderRadius: 4,
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                    transition: ".3s",
                    display: "flex",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 18px 40px rgba(0,0,0,.15)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {/* TITLE + STATUS */}
                    <Box display="flex" justifyContent="space-between" gap={1}>
                      <Typography
                        fontWeight={800}
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {batch?.batchName || batch?.name}
                      </Typography>

                      <Chip
                        label={status}
                        size="small"
                        sx={{
                          background: style.bg,
                          color: style.color,
                          fontWeight: 700,
                        }}
                      />
                    </Box>

                    {/* COUNT */}
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Students Enrolled
                      </Typography>
                      <Typography fontWeight={800} fontSize={20}>
                        {batch?.totalStudents ?? 0}
                      </Typography>
                    </Box>

                    {/* PROGRESS */}
                    <Box>
                      <LinearProgress
                        variant="determinate"
                        value={batch?.progress ?? 30}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          background: "#f1f5f9",
                          "& .MuiLinearProgress-bar": {
                            background:
                              "linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)",
                          },
                        }}
                      />
                      <Typography variant="caption" fontWeight={700}>
                        {batch?.progress ?? 30}% Completed
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default BatchListPage;