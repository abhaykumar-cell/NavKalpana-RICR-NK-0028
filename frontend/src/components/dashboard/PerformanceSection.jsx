import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 72 },
  { name: "Wed", value: 68 },
  { name: "Thu", value: 85 },
  { name: "Fri", value: 80 },
  { name: "Sat", value: 90 },
];

const PerformanceSection = () => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        height: "100%",
      }}
    >
      <CardContent>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="700">
            Average Performance
          </Typography>

          <Select
            size="small"
            defaultValue="7"
            sx={{
              borderRadius: 3,
              background: "#f5f6fa",
            }}
          >
            <MenuItem value="7">Last 7 Days</MenuItem>
            <MenuItem value="30">Last 30 Days</MenuItem>
          </Select>
        </Box>

        {/* GRAPH */}
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6C63FF" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#6C63FF"
              strokeWidth={3}
              fill="url(#colorUv)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceSection;
