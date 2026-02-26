export const getAttendanceColor = (value) => {
  if (value >= 75) return "success";
  if (value >= 50) return "warning";
  return "error";
};