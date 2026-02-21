import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";

const EndBatchDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>End Batch</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to mark this batch as Completed?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleConfirm}>
          End Batch
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EndBatchDialog;