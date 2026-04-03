import mongoose from "mongoose";
const investmentSchema = new mongoose.Schema(
  {
    amount: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true },
);

export const Investment = mongoose.model("Investment", investmentSchema);
