import ProductCombination from "../models/ProductCombination.js";

// Get all product combinations
const getCombination = async (req, res) => {
  try {
    const combinations = await ProductCombination.find()
      .populate("productId")
      .populate("materialId")
      .populate("gradeId");
    res.json(combinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new product combination
const addCombination = async (req, res) => {
  console.log("api comb called");
  try {
    console.log("re body", req.body);
    if (Array.isArray(req.body)) {
      // Bulk Insert (if request body is an array)
      const newCombinations = await ProductCombination.insertMany(req.body);
      return res.status(201).json({
        message: `${newCombinations.length} combinations added successfully`,
        data: newCombinations,
      });
    } else {
      // Single Insert (if request body is a single object)
      const newCombination = new ProductCombination(req.body);
      await newCombination.save();
      return res.status(201).json({
        message: "Combination added successfully",
        data: newCombination,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product details (Quick Edit)
const updateCombination = async (req, res) => {
  try {
    const updatedCombination = await ProductCombination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCombination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getCombination, addCombination, updateCombination };
