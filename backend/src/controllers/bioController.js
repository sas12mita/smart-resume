import { Bio } from "../models/bioModel.js";
import fs from "fs";
import path from "path";
// CREATE or UPDATE (single bio per user)
// export const saveBio = async (req, res) => {
//   try {
//     const user_id = req.user.id;
//     // Extract photo from request body
//     const { fullname, email, designation, phone, address, summary, photo } = req.body;

//     if (!fullname || !email) {
//       return res.status(400).json({ error: "Fullname and email are required" });
//     }

//     const [existingBio] = await Bio.getByUser(user_id);

//     if (existingBio.length > 0) {
//       await Bio.updateByUser(
//         user_id,
//         fullname,
//         email,
//         designation,
//         phone,
//         address,
//         summary,
//         photo // Added photo here
//       );
//       return res.json({ message: "Bio updated successfully" });
//     }

//     await Bio.create(
//       user_id,
//       fullname,
//       email,
//       designation,
//       phone,
//       address,
//       summary,
//       photo // Added photo here
//     );

//     res.json({ message: "Bio created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };


// CREATE or UPDATE (single bio per user)
export const saveBio = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { fullname, email, designation, phone, address, summary, photo } = req.body;

    if (!fullname || !email) {
      return res.status(400).json({ error: "Fullname and email are required" });
    }

    let photoPath;

    if (photo) {
      // Remove base64 prefix
      const base64Data = photo.replace(/^data:image\/\w+;base64,/, "");

      // Generate unique filename
      const fileName = `bio_${user_id}_${Date.now()}.png`;

      // Ensure uploads folder exists
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

      // Full file path
      const filePath = path.join(uploadDir, fileName);

      // Save file
      fs.writeFileSync(filePath, base64Data, "base64");

      // Save relative path in DB
      photoPath = `/uploads/${fileName}`;
    }

    const [existingBio] = await Bio.getByUser(user_id);

    if (existingBio.length > 0) {
      await Bio.updateByUser(
        user_id,
        fullname,
        email,
        designation,
        phone,
        address,
        summary,
        photoPath // save file path instead of full base64
      );
      return res.json({ message: "Bio updated successfully" });
    }

    await Bio.create(
      user_id,
      fullname,
      email,
      designation,
      phone,
      address,
      summary,
      photoPath // save file path instead of full base64
    );

    res.json({ message: "Bio created successfully" });
  } catch (err) {
    console.error("Save Bio Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// GET BIO
export const getBio = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [bio] = await Bio.getByUser(user_id);
    res.json(bio[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
