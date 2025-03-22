import Grade from "../models/GradeModel.js";

// Get all Grades
const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new grade
const addGrade = async (req, res) => {
  try {
    const newGrade = new Grade(req.body);
    await newGrade.save();
    res.json(newGrade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getGrades, addGrade };
