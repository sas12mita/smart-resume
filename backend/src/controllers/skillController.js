import { Skill } from "../models/skillModel.js";

/* CREATE SKILL */
export const createSkill = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { skill_name, skill_level } = req.body;

    await Skill.create(user_id, skill_name, skill_level);
    res.status(201).json({ message: "Skill added successfully" });
  } catch (err) {
    console.error("Create skill error:", err);
    res.status(500).json({ message: "Failed to add skill", error: err.message });
  }
};

/* GET ALL SKILLS */
export const getSkills = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await Skill.getAllByUser(user_id);
    res.json(rows);
  } catch (err) {
    console.error("Get skills error:", err);
    res.status(500).json({ message: "Failed to fetch skills", error: err.message });
  }
};

/* GET SINGLE SKILL */
export const getSkillById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const [rows] = await Skill.getById(id, user_id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get single skill error:", err);
    res.status(500).json({ message: "Error fetching skill", error: err.message });
  }
};

/* UPDATE SKILL */
export const updateSkill = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const { skill_name, skill_level } = req.body;

    await Skill.update(id, user_id, skill_name, skill_level);
    res.json({ message: "Skill updated successfully" });
  } catch (err) {
    console.error("Update skill error:", err);
    res.status(500).json({ message: "Failed to update skill", error: err.message });
  }
};

/* DELETE SKILL */
export const deleteSkill = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    await Skill.remove(id, user_id);
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("Delete skill error:", err);
    res.status(500).json({ message: "Failed to delete skill", error: err.message });
  }
};
