import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";

const AttemptMonitor = ({ quiz, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {quiz.title} - Attempt Monitoring
      </DialogTitle>

      <DialogContent>
        <Box mb={2}>
          <Typography>
            Student: Rahul Sharma
          </Typography>
          <Chip
            label="Score: 18/20"
            color="primary"
            size="small"
            sx={{ borderRadius: 2, mt: 1 }}
          />
        </Box>

        <Box>
          <Typography>
            Student: Priya Singh
          </Typography>
          <Chip
            label="Score: 16/20"
            color="secondary"
            size="small"
            sx={{ borderRadius: 2, mt: 1 }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AttemptMonitor;