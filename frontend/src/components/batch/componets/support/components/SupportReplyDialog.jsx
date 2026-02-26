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
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  replySupport,
  markResolved,
} from "../../../../../api/supportService";

const SupportReplyDialog = ({ support, onClose, onSuccess }) => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Set reply when support changes
  useEffect(() => {
    if (support) {
      setReply(support.teacherResponse || "");
    }
  }, [support]);

  if (!support) return null;

  const isValid = reply.trim().length > 0;

  /* ===============================
     SEND REPLY
  =============================== */
  const handleReply = async (e) => {
    e?.preventDefault();

    if (!isValid) {
      toast.warning("Please write a reply");
      return;
    }

    try {
      setLoading(true);

      await replySupport(support.id, {
        teacherResponse: reply,
      });

      toast.success("Reply sent successfully!");

      if (onSuccess) {
        await onSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Reply Error:", error);
      toast.error("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     MARK RESOLVED
  =============================== */
  const handleResolve = async (e) => {
    e?.preventDefault();

    if (!isValid) {
      toast.warning("Please write a reply before resolving");
      return;
    }

    try {
      setLoading(true);

      // Send reply first
      await replySupport(support.id, {
        teacherResponse: reply,
      });

      // Then mark resolved
      await markResolved(support.id);

      toast.success("Support marked as resolved!");

      if (onSuccess) {
        await onSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Resolve Error:", error);
      toast.error("Failed to resolve support");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={Boolean(support)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Support Request</DialogTitle>

      <DialogContent dividers>
        <Typography variant="h6" fontWeight={600}>
          {support.topic}
        </Typography>

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

          <Typography mt={2}>{support.description}</Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Write Reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          sx={{ mt: 3 }}
          error={!isValid && reply.length > 0}
          helperText={!isValid && reply.length > 0 ? "Reply is required" : ""}
        />
      </DialogContent>

      <DialogActions>
        <Button
          type="button"
          onClick={onClose}
          disabled={loading}
        >
          Close
        </Button>

        <Button
          type="button"
          variant="contained"
          onClick={handleReply}
          disabled={loading || !isValid}
        >
          {loading ? <CircularProgress size={20} /> : "Send Reply"}
        </Button>

        <Button
          type="button"
          variant="contained"
          color="success"
          onClick={handleResolve}
          disabled={loading || !isValid}
        >
          {loading ? <CircularProgress size={20} /> : "Mark Resolved"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SupportReplyDialog;