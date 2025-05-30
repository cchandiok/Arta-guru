
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface BarChartWithCustomColorsProps {
  data: Array<{
    name: string;
    performance: number;
    [key: string]: any;
  }>;
  dataKey: string;
  height?: number;
}

export default function BarChartWithCustomColors({ 
  data, 
  dataKey,
  height = 300
}: BarChartWithCustomColorsProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
        <Legend />
        <Bar 
          dataKey={dataKey} 
          name="Performance" 
          fill="#8884d8"
          className="custom-bar"
        />
        <defs>
          <style>
            {`
              .custom-bar path {
                fill: #22c55e;
              }
              .custom-bar path[y1]:not([y1="0"]) {
                fill: #ef4444;
              }
            `}
          </style>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}
