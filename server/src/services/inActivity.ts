import {Student} from '../models/StudentModel'

import sendEmail from '../services/mailService'
import { fetchCodeforcesSubmissions } from '../controller/syncDataCtrl';

export async function syncAndNotifyStudents() {
  const students = await Student.find();
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  for (const student of students) {
    try {
      const submissions = await fetchCodeforcesSubmissions(student.cfHandle);
      if (submissions.length > 0) {
        const latestTimestamp = submissions[0].creationTimeSeconds * 1000;
        student.lastSubmissionDate = new Date(latestTimestamp);
        await student.save();
      }

      // Check inactivity and send email if needed
      if (
        student.autoReminderEnabled &&
        (!student.lastSubmissionDate || student.lastSubmissionDate < sevenDaysAgo)
      ) {
        await sendEmail({
          to: student.email,
          subject: '⏳ Time to Get Back to Problem Solving!',
          text: `Hi ${student.name},\n\nWe noticed you haven't submitted any Codeforces problems in the last 7 days. Keep practicing to improve!\n\n– Your Progress Tracker`,
        });

        student.reminderCount += 1;
        await student.save();
      }
    } catch (error) {
      console.error(`Failed for student ${student.name}:`, error);
    }
  }
}
