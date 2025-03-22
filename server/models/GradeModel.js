import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model("Grade", gradeSchema);
