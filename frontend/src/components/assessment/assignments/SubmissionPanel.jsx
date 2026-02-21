import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { useState } from "react";
import EvaluationDrawer from "./EvaluationDrawer";

const SubmissionPanel = () => {
  const [evaluationOpen, setEvaluationOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [submissions, setSubmissions] = useState([
    {
      student: "Rahul Sharma",
      submittedOn: "2026-02-20",
      status: "Submitted",
    },
    {
      student: "Anjali Verma",
      submittedOn: "2026-02-21",
      status: "Submitted",
    },
  ]);

  const handleEvaluate = ({ marks }) => {
    const updated = [...submissions];
    updated[selectedIndex].status = "Evaluated";
    updated[selectedIndex].marks = marks;
    setSubmissions(updated);
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Student Submissions
      </Typography>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><b>Student</b></TableCell>
                <TableCell><b>Submitted On</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="right"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {submissions.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell>{item.student}</TableCell>
                  <TableCell>{item.submittedOn}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={
                        item.status === "Evaluated"
                          ? "primary"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setSelectedIndex(index);
                        setEvaluationOpen(true);
                      }}
                    >
                      <GradeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EvaluationDrawer
        open={evaluationOpen}
        setOpen={setEvaluationOpen}
        onSubmit={handleEvaluate}
      />
    </Box>
  );
};

export default SubmissionPanel;