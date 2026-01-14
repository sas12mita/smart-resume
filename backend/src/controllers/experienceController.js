import { Experience } from "../models/experienceModel.js";

/* ================= CREATE EXPERIENCE ================= */
export const createExperience = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { company, city, role, start_date, end_date, description } = req.body;

    await Experience.create(user_id, company, city, role, start_date, end_date, description);
    res.status(201).json({ message: "Experience added successfully" });
  } catch (err) {
    console.error("Create experience error:", err);
    res.status(500).json({ message: "Failed to add experience", error: err.message });
  }
};

/* ================= GET ALL EXPERIENCES ================= */
export const getExperiences = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await Experience.getAllByUser(user_id);
    res.json(rows);
  } catch (err) {
    console.error("Get experiences error:", err);
    res.status(500).json({ message: "Failed to fetch experiences", error: err.message });
  }
};

/* ================= GET SINGLE EXPERIENCE ================= */
export const getExperienceById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const [rows] = await Experience.getById(id, user_id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get single experience error:", err);
    res.status(500).json({ message: "Error fetching experience", error: err.message });
  }
};

/* ================= UPDATE EXPERIENCE ================= */
export const updateExperience = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const { company, city, role, start_date, end_date, description } = req.body;

    await Experience.update(id, user_id, company, city, role, start_date, end_date, description);
    res.json({ message: "Experience updated successfully" });
  } catch (err) {
    console.error("Update experience error:", err);
    res.status(500).json({ message: "Failed to update experience", error: err.message });
  }
};

/* ================= DELETE EXPERIENCE ================= */
export const deleteExperience = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    await Experience.remove(id, user_id);
    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    console.error("Delete experience error:", err);
    res.status(500).json({ message: "Failed to delete experience", error: err.message });
  }
};
