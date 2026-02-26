import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function AnalyticsFilters({ onFilter }) {
  const [batchId, setBatchId] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleApply = () => {
    onFilter(batchId, courseId);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleApply}
        >
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
}