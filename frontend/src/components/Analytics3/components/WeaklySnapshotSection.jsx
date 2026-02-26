import { Box, Typography } from "@mui/material";

export default function WeeklySnapshotSection({ data }) {

  if (!data || data.length < 2) return null;

  const last = data[data.length - 1];
  const prev = data[data.length - 2];

  const diff = last.ogi - prev.ogi;
  const status =
    diff > 2 ? "Improving"
    : diff < -2 ? "Declining"
    : "Stable";

  return (
    <Box mb={5}>
      <Typography variant="h6" mb={1}>
        Weekly Performance Snapshot
      </Typography>

      <Typography>
        OGI Change: {diff > 0 ? "+" : ""}{diff.toFixed(2)}
      </Typography>

      <Typography>
        Status: {status}
      </Typography>
    </Box>
  );
}