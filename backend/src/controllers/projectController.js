import Project from "../models/projectModel.js";

export const createProject = (req, res) => {
  Project.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Project created", id: result.insertId });
  });
};

export const getProjects = (req, res) => {
  Project.findAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getProjectById = (req, res) => {
  Project.findById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

export const updateProject = (req, res) => {
  Project.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Project updated" });
  });
};

export const deleteProject = (req, res) => {
  Project.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Project deleted" });
  });
};
