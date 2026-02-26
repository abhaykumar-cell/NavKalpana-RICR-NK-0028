import { Box, Typography, Paper } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useMemo } from "react";

export default function WeeklyTrendChart({ data = [] }) {
  const generateRandomData = () => {
    const weeks = 6;
    return Array.from({ length: weeks }, (_, i) => ({
      week: `Week ${i + 1}`,
      quiz: Math.floor(Math.random() * 30) + 60,        // 60–90
      assignment: Math.floor(Math.random() * 30) + 55,  // 55–85
      ogi: Math.floor(Math.random() * 30) + 65,         // 65–95
    }));
  };

  const chartData = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((d, i) => ({
        week: d.week || d.weekLabel || `Week ${i + 1}`,
        quiz: Number(d.quiz ?? d.avgQuiz ?? 0),
        assignment: Number(d.assignment ?? d.avgAssignment ?? 0),
        ogi: Number(d.ogi ?? d.overallOGI ?? 0),
      }));
    }

    // 🔥 fallback random demo data
    return generateRandomData();
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper elevation={3} sx={{ p: 1.5, borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {label}
          </Typography>
          {payload.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: item.color }}
            >
              {item.name}: {item.value}%
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(145deg, #ffffff, #f8fafc)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        mb={3}
      >
        Weekly Activity Trend
      </Typography>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="week" tick={{ fontSize: 12 }} />

          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            label={{
              value: "Performance %",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="quiz"
            name="Quiz"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />

          <Line
            type="monotone"
            dataKey="assignment"
            name="Assignment"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />

          <Line
            type="monotone"
            dataKey="ogi"
            name="Overall Growth Index"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}