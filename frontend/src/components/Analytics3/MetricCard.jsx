import { Card, CardContent, Typography } from "@mui/material";

export default function MetricCard({ title, value }) {
  return (
    <ResponsiveContainer width="200%" height={300}>
  <BarChart
    data={moduleAttendance}
    margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
  >
    <defs>
      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
    <XAxis
      dataKey="module"
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
      cursor={{ fill: "rgba(99,102,241,0.08)" }}
      contentStyle={{
        borderRadius: "10px",
        border: "none",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      }}
    />
    <Bar
      dataKey="value"
      fill="url(#barGradient)"
      radius={[12, 12, 0, 0]}
      barSize={45}
      animationDuration={800}
    />
  </BarChart>
</ResponsiveContainer>
  );
}