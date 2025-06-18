// cron/fetchCodeforcesData.js

const cron = require("node-cron");
import syncData from "../controller/syncDataCtrl";

import {syncAndNotifyStudents} from '../services/inActivity'

/**
 * Run every day at 2 PM
 */
const scheduleCodeforcesSync = () => {
  cron.schedule("39 13 * * *", async () => {
    console.log('job started')
    await syncData();
    await syncAndNotifyStudents();
    console.log('job finished')
  },{
    timezone: "Asia/Kathmandu", // Change if your timezone is different
  });
};
export default scheduleCodeforcesSync;
