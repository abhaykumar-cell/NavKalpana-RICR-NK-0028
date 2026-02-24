import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

const CreateAssignment = ({ open, handleClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    maxMarks: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create Assignment</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            name="title"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            onChange={handleChange}
          />
          <TextField
            type="datetime-local"
            name="deadline"
            onChange={handleChange}
          />
          <TextField
            label="Maximum Marks"
            type="number"
            name="maxMarks"
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignment;