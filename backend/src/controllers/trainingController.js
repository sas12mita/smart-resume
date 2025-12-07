import Training from "../models/trainingModel.js";

export const createTraining = (req, res) => {
  Training.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Training created", id: result.insertId });
  });
};

export const getTrainings = (req, res) => {
  Training.findAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getTrainingById = (req, res) => {
  Training.findById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

export const updateTraining = (req, res) => {
  Training.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Training updated" });
  });
};

export const deleteTraining = (req, res) => {
  Training.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Training deleted" });
  });
};
