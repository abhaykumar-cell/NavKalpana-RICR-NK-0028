import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Stack
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusColor = {
  ONGOING: "primary",
  COMPLETED: "success",
  UPCOMING: "warning"
};

const BatchCard = ({ batch, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();   // 👈 ADD THIS

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
      <CardContent>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>
            {batch.name}
          </Typography>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        </Stack>

        <Chip
          label={batch.status}
          color={statusColor[batch.status]}
          size="small"
          sx={{ mt: 1 }}
        />

        <Typography mt={2}>
          Students Enrolled: {batch.totalStudents}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={batch.progressPercentage}
          sx={{ mt: 1, height: 8, borderRadius: 5 }}
        />

        <Typography variant="caption">
          {batch.progressPercentage}% Completed
        </Typography>

        {/* ✅ Manage Button Navigation */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, borderRadius: 3 }}
          onClick={() => navigate(`/attendance/${batch.id}`)}
        >
          Manage
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            onClick={() => {
              onEdit(batch);
              setAnchorEl(null);
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(batch.id);
              setAnchorEl(null);
            }}
          >
            Delete
          </MenuItem>
        </Menu>

      </CardContent>
    </Card>
  );
};

export default BatchCard;