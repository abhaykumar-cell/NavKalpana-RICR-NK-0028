import { Typography, Box } from "@mui/material";

const BatchHeader = () => {
  return (
    <Box mb={3}>
      <Typography variant="h4" fontWeight="bold">
        Batch Management
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Manage, monitor and control all academic batches
      </Typography>
    </Box>
  );
};

export default BatchHeader;