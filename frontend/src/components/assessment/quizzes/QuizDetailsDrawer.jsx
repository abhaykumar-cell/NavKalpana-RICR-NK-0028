import {
  Drawer,
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const QuizDetailsDrawer = ({ open, setOpen, quiz }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{
          width: { xs: 360, sm: 520 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#F9FAFB",
        }}
      >
        {/* 🔥 Gradient Header */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            color: "#fff",
            boxShadow: "0 10px 25px rgba(99,102,241,0.3)",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <QuizIcon />
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {quiz.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Duration: {quiz.duration} mins • 
                Total Marks: {quiz.totalMarks}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* 🔥 Body Content */}
        <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>

          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Questions
            </Typography>

            <Chip
              label={`${quiz.questions.length} Questions`}
              color="primary"
              size="small"
              sx={{ borderRadius: 2 }}
            />
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {quiz.questions.length === 0 && (
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography color="text.secondary">
                No questions added yet.
              </Typography>
            </Paper>
          )}

          {quiz.questions.map((q, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              <Typography fontWeight={600} mb={2}>
                {index + 1}. {q.question}
              </Typography>

              <Stack spacing={1}>
                {["A", "B", "C", "D"].map((opt) => {
                  const optionKey = `option${opt}`;
                  const isCorrect = q.correct === opt;

                  return (
                    <Box
                      key={opt}
                      sx={{
                        p: 1.2,
                        borderRadius: 2,
                        background: isCorrect
                          ? "rgba(34,197,94,0.1)"
                          : "#F3F4F6",
                        border: isCorrect
                          ? "1px solid #22C55E"
                          : "1px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        {opt}. {q[optionKey]}
                      </Typography>

                      {isCorrect && (
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ color: "#22C55E" }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Stack>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 2 }}
              >
                Marks: {q.marks}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* 🔥 Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #eee",
            background: "#fff",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: 3 }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default QuizDetailsDrawer;