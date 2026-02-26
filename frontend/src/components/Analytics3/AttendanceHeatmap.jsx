import { Box, Typography } from "@mui/material";

export default function AttendanceHeatmap({ data }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Attendance Heatmap</Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
        {data.map((value, index) => (
          <Box
            key={index}
            sx={{
              height: 40,
              backgroundColor:
                value > 80
                  ? "#2e7d32"
                  : value > 50
                  ? "#f9a825"
                  : "#c62828",
              borderRadius: 1
            }}
          />
        ))}
      </Box>
    </Box>
  );
}