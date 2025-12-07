import Experience from "../models/experienceModel.js";

export const createExperience = (req, res) => {
  Experience.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Experience created", id: result.insertId });
  });
};

export const getExperiences = (req, res) => {
  Experience.findAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getExperienceById = (req, res) => {
  Experience.findById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

export const updateExperience = (req, res) => {
  Experience.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Experience updated" });
  });
};

export const deleteExperience = (req, res) => {
  Experience.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Experience deleted" });
  });
};
