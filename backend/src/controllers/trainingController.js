import { Training } from "../models/trainingModel.js";

export const createTraining = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, institution, completion_date, certificate_link } = req.body;

    await Training.create(user_id, title, institution, completion_date, certificate_link);
    res.status(201).json({ message: "Training added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add training", error: err.message });
  }
};

export const getTrainings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await Training.getAllByUser(user_id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch training", error: err.message });
  }
};

export const updateTraining = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const { title, institution, completion_date, certificate_link } = req.body;

    await Training.update(id, user_id, title, institution, completion_date, certificate_link);
    res.json({ message: "Training updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update training", error: err.message });
  }
};

export const deleteTraining = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    await Training.remove(id, user_id);
    res.json({ message: "Training deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete training", error: err.message });
  }
};
