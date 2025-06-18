import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/Contest.module.css";
import Header from "./Header";
import ContestRatingChart from "../components/ContestChart";
import HistoryTable from "./HistoryTable";
import ProblemSolvingStats from "./ProblemSolvingStats";
import FilterByDays from "./FilterDays";
import SubmissionHeatmap from "./SubmissionHeatmap";

import { useParams } from "react-router-dom";

import { getDataApi } from "../fetch";

function ContestHistory() {

  const { id } = useParams();
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [days, setDays] = useState(90);

  useEffect(() => {
    async function fetchData() {
      const response = await getDataApi(`analytics/?page=1&handle=${id}&day=${days}`);
      setAnalytics(response.data);

      setIsLoading(true);
  }
    fetchData();
  }, [id,days]);

   const ratingData = analytics["ratingGraph"];
  const contestInfo = analytics["contestInfo"];
  const totalSolved = analytics["totalProblemSolved"];
  const avgRating = analytics["averageRating"];

  const hardestProblem = analytics["hardestProblem"];

  let problemname;
  let problemrating;
  let contestData = [];

  if (hardestProblem) {
    problemname = hardestProblem["problem"]["name"];
    problemrating = hardestProblem["problem"]["rating"];
  }

  if (contestInfo) {
    contestInfo.map((data: any) => {
      contestData.push({
        contest: data.name,
        ranks: data.rank,
        ratingChange: data.rating_change,
        unsolvedProblem: data.unsolved,
      });
    });
  }



  

  return isLoading ? (
    <div className={styles.main}>
    
      <div className={styles.container}>
        <div style={{ marginBottom: "20px" }}>
          <FilterByDays value={days} onChange={setDays} />
        </div>
        <Header />
        <div className={styles.view_point}>
          <ContestRatingChart data={ratingData} />
          <HistoryTable rows={contestData} />

          <ProblemSolvingStats
            totalSolved={totalSolved}
            averageRating={avgRating}
            avgPerDay={3}
            hardestProblem={{ name: problemname, rating: problemrating }}
          />

          <SubmissionHeatmap handle={id} />
        </div>
      </div>
    </div>
  ) : (
    <h3>Loading</h3>
  );
}

export default ContestHistory;
