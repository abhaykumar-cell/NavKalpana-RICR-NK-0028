import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@mui/material";

const SupportFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2} mb={3}>
      
      {/* Course Filter */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Course</InputLabel>
          <Select
            name="courseId"
            value={filters.courseId}
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            {/* Map from backend courses */}
          </Select>
        </FormControl>
      </Grid>

      {/* Status Filter */}
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={filters.status}
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="RESOLVED">Resolved</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Topic Filter */}
      <Grid item xs={4}>
        <TextField
          fullWidth
          label="Search by Topic"
          name="topic"
          value={filters.topic}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default SupportFilters;