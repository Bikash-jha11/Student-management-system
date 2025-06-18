"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submision = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const submissionSchema = new mongoose_1.default.Schema({
    submisionId: {
        type: String
    },
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
exports.Submision = mongoose_1.default.model("Submission", submissionSchema);
