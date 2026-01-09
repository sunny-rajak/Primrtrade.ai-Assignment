import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true } // Track creation and update times
);

export default mongoose.model("Task", taskSchema);
