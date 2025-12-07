import Hobby from "../models/hobbyModel.js";

export const createHobby = (req, res) => {
  Hobby.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Hobby added", id: result.insertId });
  });
};

export const getHobbies = (req, res) => {
  Hobby.getAll(req.params.user_id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const getHobby = (req, res) => {
  Hobby.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

export const updateHobby = (req, res) => {
  Hobby.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Hobby updated" });
  });
};

export const deleteHobby = (req, res) => {
  Hobby.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Hobby deleted" });
  });
};
