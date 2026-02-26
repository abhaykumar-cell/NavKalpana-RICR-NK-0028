import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";

import { useState } from "react";
import dayjs from "dayjs";

const DeadlineItem = ({
  deadline,
  onClick,
}) => {
  const today = dayjs();
  const due = dayjs(deadline.date);

  let status = "";
  let color = "#6C63FF";

  const diff = due.diff(today, "day");

  if (diff < 0) {
    status = "Overdue";
    color = "#E53935";
  } else if (diff === 0) {
    status = "Today";
    color = "#FF6B6B";
  } else if (diff === 1) {
    status = "Tomorrow";
    color = "#FB8C00";
  } else {
    status = `${diff} Days Left`;
    color = "#2E7D32";
  }

  return (
    <Box
      onClick={() => onClick(deadline)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f9fafc",
          borderRadius: 2,
          px: 1,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 45,
            height: 45,
            borderRadius: "14px",
            backgroundColor: `${color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {deadline.type === "assignment" ? (
            <AccessTimeIcon sx={{ color }} />
          ) : (
            <EventIcon sx={{ color }} />
          )}
        </Box>

        <Box>
          <Typography fontWeight="600">
            {deadline.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {deadline.subtitle}
          </Typography>
        </Box>
      </Box>

      <Box textAlign="right">
        <Typography
          variant="body2"
          fontWeight="600"
          sx={{ color }}
        >
          {due.format("DD MMM YYYY")}
        </Typography>

        <Chip
          label={status}
          size="small"
          sx={{
            mt: 0.5,
            backgroundColor: `${color}20`,
            color,
            fontWeight: 500,
          }}
        />
      </Box>
    </Box>
  );
};

const DeadlineSection = () => {
  const [selected, setSelected] = useState(null);
  const [newDate, setNewDate] = useState("");

  const deadlines = [
    {
      id: 1,
      title: "React Assignment",
      subtitle: "Batch A",
      date: "2026-02-25",
      type: "assignment",
    },
    {
      id: 2,
      title: "DSA Quiz",
      subtitle: "Batch C",
      date: "2026-02-28",
      type: "exam",
    },
  ];

  const handleEvaluate = () => {
    alert("Marked as Evaluated ✅");
    setSelected(null);
  };

  const handleExtend = () => {
    alert(`Deadline Extended to ${newDate}`);
    setSelected(null);
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          height: 340,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="700" mb={2}>
            Upcoming Deadlines
          </Typography>

          {deadlines.map((d, i) => (
            <Box key={d.id}>
              <DeadlineItem
                deadline={d}
                onClick={setSelected}
              />
              {i !== deadlines.length - 1 && <Divider />}
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* 🔥 Detail Modal */}
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        fullWidth
      >
        <DialogTitle>
          {selected?.title}
        </DialogTitle>

        <DialogContent>
          <Typography mb={2}>
            Batch: {selected?.subtitle}
          </Typography>

          <Typography mb={2}>
            Due Date:{" "}
            {dayjs(selected?.date).format("DD MMM YYYY")}
          </Typography>

          <TextField
            type="date"
            fullWidth
            label="Extend Deadline"
            InputLabelProps={{ shrink: true }}
            value={newDate}
            onChange={(e) =>
              setNewDate(e.target.value)
            }
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleEvaluate}
            variant="contained"
            color="success"
          >
            Mark as Evaluated
          </Button>

          <Button
            onClick={handleExtend}
            variant="outlined"
            color="warning"
          >
            Extend Deadline
          </Button>

          <Button onClick={() => setSelected(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeadlineSection;