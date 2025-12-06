import db from "../config/db.js";

export const Education = {
  create: (user_id, degree, institution, start_year, end_year, description) => {
    return db
      .promise()
      .query(
        "INSERT INTO education (user_id, degree, institution, start_year, end_year, description) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, degree, institution, start_year, end_year, description]
      );
  },

  getAllByUser: (user_id) => {
    return db
      .promise()
      .query("SELECT * FROM education WHERE user_id = ?", [user_id]);
  },
};
