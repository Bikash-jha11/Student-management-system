import mongoose from "mongoose";
import { Schema, model, connect } from "mongoose";

//Student Interface
interface IStudent {
  name: string;
  email: string;
  phone: Number;
  cfHandle: string;
  currentRating: Number;
  maxRating: Number;
  lastSubmissionDate: Date;
  autoReminderEnabled:boolean;
  reminderCount:number;
}

//Student Schema
const studentSchema = new Schema({
  name: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: Number, required: true },
  cfHandle: { type: String, required: true,}, //code-force handle
  currentRating: { type: Number, required: true },
  maxRating: { type: Number, required: true },
  lastSubmissionDate: Date, // update this after each sync
  autoReminderEnabled: { type: Boolean, default: true },
  reminderCount: { type: Number, default: 0 }
});

//  Create a Model.
export const Student = model<IStudent>("Student", studentSchema);

