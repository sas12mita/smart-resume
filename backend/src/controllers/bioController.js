import { Bio } from "../models/bioModel.js";

export const createBio = async (req, res) => {
  try {
    const { full_name, email, phone, address, summary } = req.body;
    const user_id = req.user.id;

    await Bio.create(user_id, full_name, email, phone, address, summary);
    res.json({ message: "Bio created!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBio = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [bio] = await Bio.getByUser(user_id);
    res.json(bio[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
