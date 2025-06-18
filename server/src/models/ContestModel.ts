import mongoose, { Schema, model, connect } from "mongoose";



//Contest Interface
interface IContest {

  contestId: Number;
  contestName: string;
  handle: string;
  rank: Number;
  ratingUpdateTimeSeconds: Number;
  oldRating: Number;
  newRating: Number;
}

//Contest Schema
const contestSchema = new Schema({
  contestId: { type: Number },
  contestName: { type: String },
  handle: {
    ref: "Student",
    type: mongoose.Types.ObjectId,
  },
  rank: { type: Number },
  ratingUpdateTimeSeconds: { type: Number },
  oldRating: { type: Number },
  newRating: { type: Number },
});

//  Create a Model.
export const Contest = model<IContest>("Contest", contestSchema);
