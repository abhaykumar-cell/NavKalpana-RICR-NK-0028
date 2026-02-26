import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import API from "../../api/api";
import CreateAssignmentDialog from "./CreateAssigmentDialog";

const AssignmentSection = ({ lessonId }) => {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);

  const loadAssignments = () => {
    API.get(`/api/assignments/lesson/${lessonId}`)
      .then((res) => {
        if (res.data.success) {
          setAssignments(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadAssignments();
  }, [lessonId]);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create Assignment
      </Button>

      <CreateAssignmentDialog
        open={open}
        onClose={() => setOpen(false)}
        lessonId={lessonId}
        reload={loadAssignments}
      />

      {assignments.map((a) => (
        <Card key={a.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">{a.title}</Typography>
            <Typography>Deadline: {a.deadline}</Typography>
            <Typography>Max Marks: {a.maxMarks}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default AssignmentSection;