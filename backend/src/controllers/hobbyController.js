import { Hobby } from "../models/hobbyModel.js";

export const createHobby = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { hobby_name } = req.body;

    await Hobby.create(user_id, hobby_name);
    res.status(201).json({ message: "Hobby added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add hobby", error: err.message });
  }
};

export const getHobbies = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await Hobby.getAllByUser(user_id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hobbies", error: err.message });
  }
};

export const updateHobby = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const { hobby_name } = req.body;

    await Hobby.update(id, user_id, hobby_name);
    res.json({ message: "Hobby updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update hobby", error: err.message });
  }
};

export const deleteHobby = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    await Hobby.remove(id, user_id);
    res.json({ message: "Hobby deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete hobby", error: err.message });
  }
};
