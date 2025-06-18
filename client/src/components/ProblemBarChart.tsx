import React from "react";
import { Card, CardContent, Typography, useTheme,Grid } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface ProblemBarChartProps {
  data: { rating: string; count: number }[];
}

const ProblemBarChart: React.FC<ProblemBarChartProps> = ({ data }) => {
  const theme = useTheme();

  return (
  //  @ts-ignore
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Problems Solved by Rating Bucket
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="rating" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProblemBarChart;