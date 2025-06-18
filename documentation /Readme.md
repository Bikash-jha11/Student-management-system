📘 Student Progress Management System – Technical Documentation
🔧 Tech Stack
Frontend: React, TypeScript, TailwindCSS, Chart.js, React Calendar Heatmap, MUI

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

External Integration: Codeforces Public API

Authentication: Session/Cookie based or JWT (assumed)

Others: Cron Jobs for automation, REST API design, CSV export

root/
├── server/                 # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/           # Codeforces API interaction
│   ├── jobs/               # Cron Jobs
│   ├── utils/
│   └── server.ts
└── README.md
|--> client.                  #typical react app

🧑‍💻 Core Features
🧑 Student Management
Add, update, delete students

Store name, email, phone, Codeforces handle

View student profile with rating/contest/graph/statistics

📊 Progress Analytics
Codeforces Rating Graph (Line Chart)

Submission Heatmap (Calendar)

Problem Tags, Problem Ratings Pie Chart

Hardest Problem Solved, Average Rating, Problems Solved

🧠 Intelligent Tracking
Detect inactive students

Detect rating drop and notify

Track recent contests and submissions

🔁 Codeforces Integration
Fetch contest history, submission data, rating changes

Store only unique submissions using submisionId

📤 Export/Import
Export student data as CSV

Import Codeforces data on button click

🔔 Reminder System
Send automatic reminders via email

Uses node-cron for daily reminders


🗂 API Endpoints
Students
Method	  Endpoint	         Description
GET	     /analytics	    List of rating,contest,averagerating,hardestproblem
GET  	 /getdetaiL   	List of student(phone,email,cf handle,rating)
POST 	 /addStudent. 	Create new student
GET      /heatmap       Get all data for headmap
GET     /export-csv     Get aa data in csv 


Codeforces Data
Method	Endpoint	            Description
GET	   /codeforces/fetch	    Fetch data for all students
GET	   /codeforces/:handle	    Get individual rating info
GET	   /codeforces/submissions	Fetch and store submissions

CSV Export
Method	    Endpoint	     Description
GET	        /export-csv	     Export student data


🛠 Cron Job (Daily Sync)
Fetch rating/submissions for all students

Update MongoDB if new submissions found

Can be scheduled using:

cron.schedule("0 0 * * *", syncCodeforcesData);



📅 Submission Heatmap
Uses react-calendar-heatmap

Groups by day, counts submissions per date


# For Student
interface Student {
  name: string;
  email: string;
  phone: number;
  cfHandle: string;
  currentRating: number;
  maxRating: number;
}

# Rating Chart Data

interface RatingGraph {
  date: Date;
  rating: number;
}
Fetched from:

data.map((entry) => ({
  date: new Date(entry.ratingUpdateTimeSeconds * 1000),
  rating: entry.newRating,
}));

# For filtering 7,30,90 days
interface FilterByDaysProps {
  value: number;
  onChange: (days: number) => void;
}

# For history of contest
interface History {
  contest: string;
  ranks: number;
  ratingChange: number;
  unsolvedProblem: number;
}

interface historyProps {
  rows: History[];
}

# For problem stats
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


# For heatmap
interface HeatmapData {
  date: string;
  count: number;
}

interface Props {
  handle: string;
}
