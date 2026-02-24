import { Box, Typography, LinearProgress, Card } from "@mui/material";

const ProgressSection = ({ lesson }) => {
  const ogi = 72;

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {lesson} Progress
      </Typography>

      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle1">
          Overall Growth Index (OGI)
        </Typography>

        <Typography variant="h4" mt={1}>
          {ogi}%
        </Typography>

        <LinearProgress
          variant="determinate"
          value={ogi}
          sx={{ mt: 2, height: 8, borderRadius: 5 }}
        />
      </Card>
    </Box>
  );
};

export default ProgressSection;