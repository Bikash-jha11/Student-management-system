import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    submisionId:{
      type:String
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    problem: {
      contestId: Number,
      index: String,
      name: String,
      rating: Number,
      tags: [String],
    },

    programmingLanguage: String,
    verdict: String, // e.g., "OK", "WRONG_ANSWER"
    passedTestCount: Number,
    timeConsumedMillis: Number,
    memoryConsumedBytes: Number,

    creationTime: Date, // Codeforces submission time
  },
  {
    timestamps: true,
  }
);

export const Submision = mongoose.model("Submission", submissionSchema);
