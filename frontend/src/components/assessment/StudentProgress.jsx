import { Box, LinearProgress, Typography, Card } from "@mui/material";

const StudentProgress = () => {
  const ogi = 78;

  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6">Overall Growth Index</Typography>
        <Typography variant="h4" mt={1}>
          {ogi}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={ogi}
          sx={{ mt: 2, height: 10, borderRadius: 5 }}
        />
      </Card>
    </Box>
  );
};

export default StudentProgress;