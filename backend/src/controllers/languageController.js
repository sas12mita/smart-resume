import { Language } from "../models/languageModel.js";

export const createLanguage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { language_name, proficiency } = req.body;

    await Language.create(user_id, language_name, proficiency);
    res.status(201).json({ message: "Language added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add language", error: err.message });
  }
};

export const getLanguages = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [rows] = await Language.getAllByUser(user_id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch languages", error: err.message });
  }
};

export const updateLanguage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const { language_name, proficiency } = req.body;

    await Language.update(id, user_id, language_name, proficiency);
    res.json({ message: "Language updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update language", error: err.message });
  }
};

export const deleteLanguage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    await Language.remove(id, user_id);
    res.json({ message: "Language deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete language", error: err.message });
  }
};
