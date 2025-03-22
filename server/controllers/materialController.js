import Material from "../models/MaterialModel.js";

// Get all materials
const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new material
const addMaterial = async (req, res) => {
  try {
    const newMaterial = new Material(req.body);
    await newMaterial.save();
    res.json(newMaterial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getMaterials, addMaterial };
