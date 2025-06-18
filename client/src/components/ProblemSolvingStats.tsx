import React from "react";
import { Grid } from "@mui/material";
import SummaryCard from "../components/SummaryCard";
import ProblemBarChart from "../components/ProblemBarChart";
import SubmissionHeatmap from "../components/SubmissionHeatmap";
import styles from '../styles/Problemstats.module.css'


interface ProblemStatsProps {
  totalSolved: number;
  averageRating: number;
  avgPerDay: number;
  hardestProblem?: {
    name: string;
    rating: number;
  } | null;
  barChartData?: {
    rating: string;
    count: number;
  }[];
  heatmap?: Record<string, number>;
}

const ProblemSolvingStats: React.FC<ProblemStatsProps> = ({
  totalSolved,
  averageRating,
 // avgPerDay,
  hardestProblem,
  barChartData,
  heatmap,
}) => {
  return (
    <div className={styles.main}>
    <Grid container spacing={2}>
      <SummaryCard title="Total Solved" value={totalSolved} />
      <SummaryCard title="Average Rating" value={averageRating.toFixed(1)} />
      {/* <SummaryCard title="Avg Problems/Day" value={avgPerDay.toFixed(2)} /> */}
      <SummaryCard
        title="Hardest Problem"
        value={hardestProblem ? `${hardestProblem.name} (${hardestProblem.rating})` : "N/A"}
      />
      {/* <ProblemBarChart data={barChartData} />
      <SubmissionHeatmap heatmap={heatmap} /> */}
    </Grid>
    </div>
  );
};

export default ProblemSolvingStats;