const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// console.log();
// Configure Multer

const multerStoreFolder = multer({ dest: "uploads/" });

// File Upload API
router.post("/upload", multerStoreFolder.single("file"), async (req, res) => {
  try {
    // new FormData().append("file", {})
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // const result = await cloudinary.uploader.upload(req.file.path);

    // https://kalvium.xyz.com/uploads/1cccaec2290a41bc49ba1e091d00d27b

    if (!result) {
      return res.status(500).send({ message: "Image Upload failed..." });
    }
    // remove the fiele from th folder uploads

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
