import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

async function callHF(prompt, retries = 3) {
  try {
    const res = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        inputs: prompt,
        parameters: { max_new_tokens: 120 }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );
    return res.data;
  } catch (err) {
    if (retries > 0) {
      console.log("Model loading... retrying");
      await new Promise(r => setTimeout(r, 8000));
      return callHF(prompt, retries - 1);
    }
    throw err;
  }
}

router.post("/generate-summary", async (req, res) => {
  try {
    const { designation, skills, experience } = req.body;

    if (!designation) {
      return res.status(400).json({ error: "Designation is required" });
    }

    const prompt = `
Write a professional ATS-friendly resume summary (3-4 lines).

Designation: ${designation}
Skills: ${skills || "N/A"}
Experience: ${experience || "N/A"}
`;

    const data = await callHF(prompt);

    const summary =
      data?.[0]?.generated_text || "Unable to generate summary";

    res.json({ summary: summary.trim() });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      error: "Free model busy. Please try again in a moment."
    });
  }
});

export default router;
