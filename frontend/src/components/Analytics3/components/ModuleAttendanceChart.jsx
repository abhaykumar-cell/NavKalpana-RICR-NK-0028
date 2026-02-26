import { Typography, Paper } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";
import { useMemo } from "react";

export default function ModuleAttendanceChart() {

  // 🔥 Professional Dummy Course Data
  const chartData = useMemo(() => {
    return [
      { name: "Python Programming", attendance: 88 },
      { name: "Data Structures & Algorithms", attendance: 82 },
      { name: "Full Stack Development", attendance: 90 },
      { name: "Artificial Intelligence", attendance: 76 },
      { name: "Data Science Bootcamp", attendance: 85 },
      { name: "Core Java Programming", attendance: 80 },
      { name: "Big Data Analytics", attendance: 78 },
    ];
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        mb: 5,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        mb={3}
      >
        Course-wise Attendance
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="name"
            angle={-25}
            textAnchor="end"
            interval={0}
          />

          <YAxis
            domain={[0, 100]}
            tickFormatter={(val) => `${val}%`}
          />

          <Tooltip
            formatter={(val) => `${val}%`}
          />

          <Bar
            dataKey="attendance"
            fill="#4f46e5"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          >
            <LabelList
              dataKey="attendance"
              position="top"
              formatter={(val) => `${val}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}