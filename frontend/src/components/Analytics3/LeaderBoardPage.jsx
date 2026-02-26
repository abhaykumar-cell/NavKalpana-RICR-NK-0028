import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  CircularProgress,
  Avatar,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { getLeaderboard } from "../../api/analyticsService";

const getRankColor = (rank) => {
  if (rank === 1) return "#facc15";
  if (rank === 2) return "#94a3b8";
  if (rank === 3) return "#f97316";
  return "#6366f1";
};

const LeaderboardPage = () => {
  const { courseId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    setLoading(true);
    getLeaderboard(courseId)
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [courseId]);

  return (
    <Box>
      {/* TITLE */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Class Leaderboard
      </Typography>

      {/* LOADING */}
      {loading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {/* EMPTY STATE */}
      {!loading && data.length === 0 && (
        <Typography color="text.secondary">
          No leaderboard data available.
        </Typography>
      )}

      {/* TOP 3 HIGHLIGHT */}
      {!loading && data.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              mb: 4,
              flexWrap: "wrap",
            }}
          >
            {data.slice(0, 3).map((student, index) => (
              <Box
                key={student.studentId}
                sx={{
                  flex: 1,
                  minWidth: 220,
                  background: "#ffffff",
                  borderRadius: 3,
                  p: 3,
                  textAlign: "center",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                  border: `2px solid ${getRankColor(index + 1)}`,
                }}
              >
                <EmojiEventsIcon
                  sx={{
                    fontSize: 40,
                    color: getRankColor(index + 1),
                  }}
                />

                <Typography fontWeight={600} mt={1}>
                  {student.studentName}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ color: getRankColor(index + 1) }}
                >
                  {student.ogi}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Rank #{index + 1}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* FULL TABLE */}
          <Paper
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: "#f8fafc",
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>OGI</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={row.studentId}
                    hover
                    sx={{
                      transition: "0.2s",
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={`#${index + 1}`}
                        size="small"
                        sx={{
                          backgroundColor: getRankColor(index + 1),
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: "#6366f1" }}>
                          {row.studentName.charAt(0)}
                        </Avatar>
                        <Typography fontWeight={500}>
                          {row.studentName}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={row.ogi}
                        sx={{
                          background:
                            "linear-gradient(135deg,#4f46e5,#6366f1)",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default LeaderboardPage;