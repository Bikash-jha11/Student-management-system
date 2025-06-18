import express from "express";
import cors from "cors";
const app = express();

import  scheduleCodeforcesSync  from './services/cronService'
import heatmapRoute from "./controller/heatmapCtrl";
 import exportCsv from "./controller/csvCtrl";

import ConnectToDb from "./utils/dbConnection";
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3006", // frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(require("./routes/studentRoute"));
app.use(require("./routes/syncRoute"));
app.use(require("./routes/detailRoute"));
app.use("/heatmap", heatmapRoute);
app.use("/export-csv", exportCsv);

//connecting to database
let connectToDb = new ConnectToDb();
connectToDb.connect(process.env.DATABASE_URL as string);

//start cron
scheduleCodeforcesSync()

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server started");
});
