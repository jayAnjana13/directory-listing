import mongoose from "mongoose";

const productCombinationSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  gradeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
    required: true,
  },
  productName: { type: String, default: "" },
  materialName: { type: String, default: "" },
  gradeName: { type: String, default: "" },
  price: { type: Number, default: 0 },
  surfaceFinish: { type: String, default: "" },
  shape: { type: String, default: "" },
  length: { type: String, default: "" },
  thickness: { type: String, default: "" },
  outsideDia: { type: String, default: "" },
});

export default mongoose.model("ProductCombination", productCombinationSchema);
