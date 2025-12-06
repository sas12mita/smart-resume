import { Education } from "../models/education.model.js";

export const addEducation = async (req, res) => {
  try {
    const { degree, institution, start_year, end_year, description } = req.body;
    const user_id = req.user.id;

    await Education.create(
      user_id,
      degree,
      institution,
      start_year,
      end_year,
      description
    );

    res.json({ message: "Education added!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEducation = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await Education.getAllByUser(user_id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
