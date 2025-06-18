import express,{Request,Response} from "express";
import { Submision } from "../models/SubmisiomModel";
import { Student } from "../models/StudentModel";

const router = express.Router();

// GET /api/heatmap?handle=some_cf_handle
//@ts-ignore
router.get("/", async (req:Request, res:Response) => {
  try {
    const handle = req.query.handle as string;

    if (!handle) {
      return res.status(400).json({ message: "Missing handle in query" });
    }

    // Find the student by handle
    const student = await Student.findOne({ cfHandle: handle });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find all submissions for that student
    const submissions = await Submision.find({ studentId: student._id });

    // Count submissions per day
    const dateCounts: Record<string, number> = {};

    submissions.forEach((sub) => {
      const date = new Date(sub.creationTime);
      const key = date.toISOString().split("T")[0]; // yyyy-mm-dd
      dateCounts[key] = (dateCounts[key] || 0) + 1;
    });

    // Convert to array
    const heatmapData = Object.keys(dateCounts).map((date) => ({
      date,
      count: dateCounts[date],
    }));

    res.status(200).json({ data: heatmapData });
  } catch (err) {
    console.error("Heatmap error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
