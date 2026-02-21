import {
  Drawer,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const CreateAssignmentDrawer = ({ open, setOpen, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    batch: "",
    dueDate: "",
    marks: "",
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.dueDate) return;

    onCreate(formData);
    setOpen(false);

    // Reset form
    setFormData({
      title: "",
      batch: "",
      dueDate: "",
      marks: "",
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{
          width: { xs: 320, sm: 420 },
          height: "100%",
          p: 4,
          background: "#fff",
        }}
      >

        {/* 🔥 Gradient Header */}
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
            color: "#fff",
            boxShadow:
              "0 10px 24px rgba(99,102,241,0.35)",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Create Assignment
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Add assignment details below
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* 🔥 Form Fields */}

        <TextField
          fullWidth
          label="Assignment Title"
          margin="normal"
          size="small"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Batch"
          margin="normal"
          size="small"
          value={formData.batch}
          onChange={(e) =>
            setFormData({
              ...formData,
              batch: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          type="date"
          margin="normal"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              dueDate: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Maximum Marks"
          margin="normal"
          size="small"
          type="number"
          value={formData.marks}
          onChange={(e) =>
            setFormData({
              ...formData,
              marks: e.target.value,
            })
          }
        />

        {/* 🔥 CTA Button */}
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            borderRadius: 3,
            fontWeight: 600,
          }}
          onClick={handleSubmit}
        >
          Add Assignment
        </Button>
      </Box>
    </Drawer>
  );
};

export default CreateAssignmentDrawer;