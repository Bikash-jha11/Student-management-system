import express,{Request,Response} from "express";
import { Parser } from "json2csv";
import { Student } from "../models/StudentModel";

const router = express.Router();

router.get("/", async (req:Request, res:Response) => {
  try {
    const students = await Student.find().lean();

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const fields = [
      "name",
      "email",
      "phone",
      "cfHandle",
      "currentRating",
      "maxRating",
      "lastSubmissionDate",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(students);

    res.header("Content-Type", "text/csv");
    res.attachment("students.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).json({ message: "Server error while generating CSV" });
  }
});

export default router;
