import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const LessonSelector = ({ lesson, setLesson }) => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        alignItems="center"
      >
        {/* Icon Section */}
        <Grid item>
          <Box
            sx={{
              height: 48,
              width: 48,
              borderRadius: 3,
              background:
                "linear-gradient(135deg,#6366F1,#8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow:
                "0 8px 20px rgba(99,102,241,0.3)",
            }}
          >
            <MenuBookIcon />
          </Box>
        </Grid>

        {/* Text + Dropdown */}
        <Grid item xs>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            gutterBottom
          >
            Select Lesson
          </Typography>

          <FormControl
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          >
            <InputLabel>Lesson</InputLabel>

            <Select
              value={lesson}
              label="Lesson"
              onChange={(e) =>
                setLesson(e.target.value)
              }
            >
              <MenuItem value="Lesson 1">
                Lesson 1
              </MenuItem>
              <MenuItem value="Lesson 2">
                Lesson 2
              </MenuItem>
              <MenuItem value="Lesson 3">
                Lesson 3
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LessonSelector;