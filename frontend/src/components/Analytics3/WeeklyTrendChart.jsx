import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

export default function WeeklyTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
  <LineChart
    data={weeklyTrend}
    margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
    <XAxis
      dataKey="week"
      tick={{ fill: "#6b7280", fontSize: 13 }}
      axisLine={false}
      tickLine={false}
    />
    <YAxis
      tick={{ fill: "#9ca3af", fontSize: 12 }}
      axisLine={false}
      tickLine={false}
    />
    <Tooltip
      contentStyle={{
        borderRadius: "12px",
        border: "none",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      }}
    />

    <Line
      type="monotone"
      dataKey="quiz"
      stroke="#6366f1"
      strokeWidth={3}
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
      animationDuration={800}
    />

    <Line
      type="monotone"
      dataKey="assignment"
      stroke="#10b981"
      strokeWidth={3}
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
      animationDuration={800}
    />

    <Line
      type="monotone"
      dataKey="ogi"
      stroke="#f59e0b"
      strokeWidth={3}
      dot={{ r: 4 }}
      activeDot={{ r: 6 }}
      animationDuration={800}
    />
  </LineChart>
</ResponsiveContainer>
  );
}