import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Chip,
  Stack
} from "@mui/material";
import { useState } from "react";
import EndBatchDialog from "./EndBatchDialog";

const getStatusColor = (status) => {
  switch (status) {
    case "Ongoing":
      return "info";
    case "Completed":
      return "success";
    case "Upcoming":
      return "warning";
    default:
      return "default";
  }
};

const getAccentColor = (status) => {
  switch (status) {
    case "Ongoing":
      return "linear-gradient(90deg,#3b82f6,#06b6d4)";
    case "Completed":
      return "linear-gradient(90deg,#16a34a,#22c55e)";
    case "Upcoming":
      return "linear-gradient(90deg,#f97316,#fb923c)";
    default:
      return "#ccc";
  }
};

const BatchCard = ({ batch, onEnd }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
          }
        }}
      >
        {/* Top Gradient Accent */}
        <Box
          sx={{
            height: 6,
            background: getAccentColor(batch.status)
          }}
        />

        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: "16px", sm: "18px" } }}
            >
              {batch.name}
            </Typography>

            <Chip
              label={batch.status}
              color={getStatusColor(batch.status)}
              size="small"
              sx={{
                fontWeight: "bold",
                borderRadius: "16px"
              }}
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            sx={{ fontSize: "14px" }}
          >
            {batch.type}
          </Typography>

          <Box mt={3}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, mb: 1 }}
            >
              Students Enrolled: {batch.totalStudents}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={batch.progress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#e5e7eb",
                "& .MuiLinearProgress-bar": {
                  background: getAccentColor(batch.status)
                }
              }}
            />

            <Typography
              variant="caption"
              sx={{ mt: 1, display: "block", fontWeight: 500 }}
            >
              {batch.progress}% Completed
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mt={3}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                "&:hover": {
                  background: "linear-gradient(90deg,#4f46e5,#7c3aed)"
                }
              }}
            >
              Manage
            </Button>

            {batch.status === "Ongoing" && (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: "bold"
                }}
                onClick={() => setOpen(true)}
              >
                End
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      <EndBatchDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleConfirm={() => {
          onEnd(batch.id);
          setOpen(false);
        }}
      />
    </>
  );
};

export default BatchCard;