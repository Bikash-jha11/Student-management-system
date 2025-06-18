import React from "react";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Define the type for each data point
interface ContestData {
  date: string; // e.g. "2024-05-15"
  rating: number; // e.g. 1530
}

interface ContestRatingChartProps {
  data: ContestData[];
}

const ContestRatingChart: React.FC<ContestRatingChartProps> = ({ data }) => {


  const theme = useTheme();

  // Extract ratings for computing graph bounds
  const ratings = data.map((d) => d.rating);
  const yMin = Math.max(0, Math.min(...ratings) - 100);
  const yMax = Math.max(...ratings) + 100;

  return (
 
    <>
        <Typography variant="h6" gutterBottom style={{'color':'#FF5733',fontWeight:800}}>
          Rating History
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[yMin, yMax]} />

            <Line
              type="monotone"
              dataKey="rating"
              stroke={theme.palette.warning.dark}
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
    </>
   
  );
};

export default ContestRatingChart;
