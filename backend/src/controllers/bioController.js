import { Bio } from "../models/bioModel.js";

// CREATE or UPDATE (single bio per user)
export const saveBio = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { fullname, email, designation, phone, address, summary } = req.body;

    if (!fullname || !email) {
      return res.status(400).json({ error: "Fullname and email are required" });
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
        summary
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
      summary
    );

    res.json({ message: "Bio created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
