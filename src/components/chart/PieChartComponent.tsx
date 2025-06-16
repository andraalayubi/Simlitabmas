"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type PieChartComponentProps = {
  data: { name: string; value: number }[];
};

const COLORS: Record<string, string> = {
  Penelitian: "#4caf50",
  Pengmas: "#ff9800",
  Kosong: "#cfd8dc",
};

const renderCustomizedLabel = ({ percent }: { percent: number }) =>
  `${(percent * 100).toFixed(0)}%`;

const PieChartComponent = ({ data }: PieChartComponentProps) => {
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || "#8884d8"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
