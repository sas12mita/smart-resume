import Language from "../models/languageModel.js";

export const createLanguage = (req, res) => {
  Language.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Language added", id: result.insertId });
  });
};

export const getLanguages = (req, res) => {
  Language.getAll(req.params.user_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const getLanguage = (req, res) => {
  Language.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

export const updateLanguage = (req, res) => {
  Language.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Language updated" });
  });
};

export const deleteLanguage = (req, res) => {
  Language.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Language deleted" });
  });
};
