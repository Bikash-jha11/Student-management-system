import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: string | number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => (
    //@ts-ignore. fix-later
  <Grid item xs={12} md={3}>
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography>{value}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default SummaryCard;