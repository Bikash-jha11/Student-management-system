import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../styles/SubmisionMap.css"; // optional for custom styling
import { getDataApi } from "../fetch";

interface HeatmapData {
  date: string;
  count: number;
}

interface Props {
  handle: string;
}

const SubmissionHeatmap: React.FC<Props> = ({ handle }) => {
  const [data, setData] = useState<HeatmapData[]>([]);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const res = await getDataApi(`heatmap?handle=${handle}`);
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching heatmap data", err);
      }
    };

    fetchHeatmapData();
  }, [handle]);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1); // last 1 year

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Problem Solving Activity</h3>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-empty";
          if (value.count < 3) return "color-scale-1";
          if (value.count < 5) return "color-scale-2";
          return "color-scale-3";
        }}
        tooltipDataAttrs={(value) =>
          value.date
            ? {
                "data-tip": `${value.date}: ${value.count} submissions`,
              }
            : {}
        }
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default SubmissionHeatmap;
