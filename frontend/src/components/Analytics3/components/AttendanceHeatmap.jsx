import { Box, Typography } from "@mui/material";

export default function AttendanceHeatmap({ data }) {

  if (!data || data.length === 0) return null;

  return (
    <Box mb={5}>
      <Typography variant="h6" mb={2}>
        Attendance Heatmap
      </Typography>

      {data.map((row, i) => (
        <Box key={i} display="flex" gap={2} mb={1}>
          {row.map((val, j) => (
            <Box
              key={j}
              sx={{
                width: 80,
                height: 40,
                background: `rgba(37,99,235,${val / 100})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                borderRadius: 2
              }}
            >
              {val}%
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}