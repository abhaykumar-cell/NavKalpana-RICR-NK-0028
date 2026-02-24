import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import {
  replySupport,
  markResolved,
} from "../../../../../api/supportService";

const SupportReplyDialog = ({ support, onClose }) => {
  const [reply, setReply] = useState(support.teacherResponse || "");
  const [loading, setLoading] = useState(false);

  /* ===============================
     HANDLE REPLY
  =============================== */
  const handleReply = async () => {
    if (!reply.trim()) {
      alert("Please write a reply");
      return;
    }

    try {
      setLoading(true);

      await replySupport(support.id, {
        teacherResponse: reply, // ✅ FIXED KEY
      });

      alert("Reply Sent Successfully!");
      onClose(); // ✅ close dialog
    } catch (error) {
      console.error("Reply error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     HANDLE RESOLVE
  =============================== */
  const handleResolve = async () => {
    try {
      setLoading(true);

      await markResolved(support.id);

      alert("Marked as Resolved!");
      onClose(); // ✅ close dialog
    } catch (error) {
      console.error("Resolve error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Support Request</DialogTitle>

      <DialogContent dividers>
        <Typography variant="h6">{support.topic}</Typography>

        <Chip
          label={support.status}
          color={
            support.status === "PENDING"
              ? "warning"
              : support.status === "IN_PROGRESS"
              ? "info"
              : "success"
          }
          sx={{ mt: 1 }}
        />

        <Box mt={2}>
          <Typography>
            <b>Student:</b> {support.studentName}
          </Typography>

          <Typography>
            <b>Course:</b> {support.courseName}
          </Typography>

          <Typography mt={2}>
            {support.description}
          </Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Write Reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          sx={{ mt: 3 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Close
        </Button>

        <Button
          variant="contained"
          onClick={handleReply}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Send Reply"}
        </Button>

        <Button
          color="success"
          onClick={handleResolve}
          disabled={loading}
        >
          Mark Resolved
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupportReplyDialog;