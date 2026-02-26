import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../services/analyticsApi";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem
} from "@mui/material";

export default function LeaderboardSection({ batchId, courseId }) {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("ogi");

  useEffect(() => {
    fetchLeaderboard(batchId, courseId, sortBy)
      .then(res => {
        const result = Array.isArray(res.data) ? res.data : [];
        setData(result);
      })
      .catch(() => setData([]));
  }, [batchId, courseId, sortBy]);

  return (
    <Box mt={5}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">
          Class Leaderboard
        </Typography>

        <Select
          size="small"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <MenuItem value="ogi">OGI</MenuItem>
          <MenuItem value="attendance">Attendance</MenuItem>
          <MenuItem value="assignmentScore">Assignment</MenuItem>
        </Select>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Student</TableCell>
            <TableCell>OGI</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell>Assignment</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map(row => (
              <TableRow key={row.studentId}>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.studentName}</TableCell>
                <TableCell>{row.ogi}</TableCell>
                <TableCell>{row.attendance}</TableCell>
                <TableCell>{row.assignmentScore}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No leaderboard data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}