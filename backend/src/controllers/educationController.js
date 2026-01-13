import { Education } from "../models/educationModel.js";

/* CREATE EDUCATION */
export const createEducation = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { degree, institution, city, start_date, end_date } = req.body;

    await Education.create(user_id, degree, institution, city, start_date, end_date);
    res.status(201).json({ message: "Education added successfully" });
  } catch (err) {
    console.error("Create education error:", err);
    res.status(500).json({ message: "Failed to add education", error: err.message });
  }
};

/* GET ALL EDUCATIONS */
export const getEducations = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await Education.getAllByUser(user_id);
    res.json(rows);
  } catch (err) {
    console.error("Get education error:", err);
    res.status(500).json({ message: "Failed to fetch education", error: err.message });
  }
};

/* GET SINGLE EDUCATION */
export const getEducationById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const [rows] = await Education.getById(id, user_id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get single education error:", err);
    res.status(500).json({ message: "Error fetching education", error: err.message });
  }
};

/* UPDATE EDUCATION */
/* UPDATE EDUCATION */
export const updateEducation = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const { degree, institution, city, start_date, end_date } = req.body;

    // ✅ FIXED ORDER: degree, then institution, then city
    await Education.update(id, user_id, degree, institution, city, start_date, end_date);
    
    res.json({ message: "Education updated successfully" });
  } catch (err) {
    console.error("Update education error:", err);
    res.status(500).json({ message: "Failed to update education", error: err.message });
  }
};

/* DELETE EDUCATION */
export const deleteEducation = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    await Education.remove(id, user_id);
    res.json({ message: "Education deleted successfully" });
  } catch (err) {
    console.error("Delete education error:", err);
    res.status(500).json({ message: "Failed to delete education", error: err.message });
  }
};
