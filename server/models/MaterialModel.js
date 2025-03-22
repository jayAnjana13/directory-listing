import mongoose from "mongoose";
const materialSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model("Material", materialSchema);
