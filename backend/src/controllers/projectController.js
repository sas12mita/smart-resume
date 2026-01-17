import { Project } from "../models/projectModel.js";

/* CREATE PROJECT */
export const createProject = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, description, link } = req.body;

    await Project.create(user_id, title, description, link);
    res.status(201).json({ message: "Project added successfully" });
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: "Failed to add project", error: err.message });
  }
};

/* GET ALL PROJECTS */
export const getProjects = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await Project.getAllByUser(user_id);
    res.json(rows);
  } catch (err) {
    console.error("Get projects error:", err);
    res.status(500).json({ message: "Failed to fetch projects", error: err.message });
  }
};

/* GET SINGLE PROJECT */
export const getProjectById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    const [rows] = await Project.getById(id, user_id);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get single project error:", err);
    res.status(500).json({ message: "Error fetching project", error: err.message });
  }
};

/* UPDATE PROJECT */
export const updateProject = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const { title, description, link } = req.body;

    await Project.update(id, user_id, title, description, link);
    res.json({ message: "Project updated successfully" });
  } catch (err) {
    console.error("Update project error:", err);
    res.status(500).json({ message: "Failed to update project", error: err.message });
  }
};

/* DELETE PROJECT */
export const deleteProject = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    await Project.remove(id, user_id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete project error:", err);
    res.status(500).json({ message: "Failed to delete project", error: err.message });
  }
};
