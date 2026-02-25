import { TextField, MenuItem, Stack } from "@mui/material";

const StudentSearchFilter = ({ search, setSearch, course, setCourse, courses }) => (
  <Stack direction={{ xs: "column", md: "row" }} spacing={2} my={2}>
    <TextField
      fullWidth
      label="Search Student"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <TextField
      select
      label="Filter Course"
      value={course}
      onChange={(e) => setCourse(e.target.value)}
      sx={{ minWidth: 200 }}
    >
      <MenuItem value="">All</MenuItem>
      {courses.map((c) => (
        <MenuItem key={c} value={c}>
          {c}
        </MenuItem>
      ))}
    </TextField>
      </Stack>
);

export default StudentSearchFilter;