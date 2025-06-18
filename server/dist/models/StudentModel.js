"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
//Student Schema
const studentSchema = new mongoose_1.Schema({
    name: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: Number, required: true },
    cfHandle: { type: String, required: true, lowercase: true }, //code-force handle
    currentRating: { type: Number, required: true },
    maxRating: { type: Number, required: true },
});
//  Create a Model.
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
