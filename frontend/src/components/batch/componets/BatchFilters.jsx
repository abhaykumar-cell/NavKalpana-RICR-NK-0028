import { Tabs, Tab, Box } from "@mui/material";

const BatchFilters = ({ value, onChange }) => {
  return (
    <Box mb={3}>
      <Tabs
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Ongoing" />
        <Tab label="Completed" />
        <Tab label="Upcoming" />
      </Tabs>
    </Box>
  );
};

export default BatchFilters;