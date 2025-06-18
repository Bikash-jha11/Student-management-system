



📚 Student Progress Management System – Features Overview
🧑‍🎓 Student Management
Add, edit, delete students with fields: name, email, phone, Codeforces handle, current & max rating.

View all students in a responsive table.

Fetch and update live Codeforces rating data per student.


https://github.com/user-attachments/assets/da282f7f-f3fe-4f25-aa0e-221d28070cf0





📊 Contest & Rating Analytics
Visualize rating progression with a contest rating line chart.

View a detailed contest history table with:

Contest name, rank, rating change, and unsolved problems.

View analytics like:

Total problems solved

Average problem rating

Hardest problem solved





🔥 Submission Tracking
Automatically fetch and store submissions from Codeforces using API.

Store details like problem metadata, verdict, language, and creation time.

Track latest submission per student.

Store submission data in MongoDB with proper schema design.



📅 Heatmap & Activity Monitoring
🔥 Submission Heatmap API created to visualize student activity over time.

Frontend chart implemented to show heatmap calendar.






📬 Inactivity Reminder Emails
Identify students who haven’t submitted in the last 7 days.

Automatically send reminder emails via scheduled jobs.

Track how many times a student has been emailed.

Ability to disable reminders per student.





📦 Data Export Features
🧮 Convert all student data to CSV format via API.

📥 Download CSV directly via frontend “Download CSV” button.

JSON export also implemented on demand.






📆 Filtering Features
Filter contest data based on:

Last 7, 30, or 90 days

Dynamically updates analytics and history.







⚙️ Tech Stack Used
Frontend: React, TypeScript, CSS Modules

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Charting: Chart.js / Custom Heatmap

Email: Nodemailer (for sending inactivity reminders)

Data Conversion: json2csv for CSV export

