const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
const mime = require("mime-types");

const uploadWithDestination = (method, fields, uploadPath) => {
  const storage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const originalName = path.basename(file.originalname, ext);
      const mimeType = mime.lookup(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      if (mimeType.startsWith("image/")) {
        cb(null, originalName + uniqueSuffix + ".webp");
      } else {
        cb(null, originalName + ext);
      }
    },
  });

  const upload = multer({ storage }).fields(fields);

  return async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error during upload:", err);
        return res.status(500).send("Error uploading files.");
      }

      try {
        const tempFiles = await processFiles(req.files);
        // cleanupTempFiles(tempFiles); // Cleanup temp files after processing
        next();
      } catch (processErr) {
        console.error("Error processing files:", processErr);
        cleanupUploadedFiles(req.files);
        res.status(500).send("Error processing files.");
      }
    });
  };
};

const processFiles = async (files) => {
  const tempRemovingFiles = [];
  const processFile = async (file) => {
    const mimeType = mime.lookup(file.originalname);
    const ext = path.extname(file.originalname).toLowerCase();

    if (mimeType.startsWith("application/")) return;

    const originalPath = file.path.replace(/\\/g, "/");
    const compressedPath = path.join(path.dirname(originalPath), "temp" + file.fieldname+ ext);

    await fs.move(originalPath, compressedPath, { overwrite: true });

    if (mimeType.startsWith("image/") && ext !== ".pdf") {
      try {
        const transformer = sharp(compressedPath).webp({ quality: 75 });
        await transformer.toFile(originalPath);
        tempRemovingFiles.push(compressedPath);
      } catch (error) {
        console.error("Error processing image:", error);
        await fs.move(compressedPath, originalPath);
      }
    } else {
      tempRemovingFiles.push(compressedPath);
    }
  };

  for (const fieldName in files) {
    const fileArray = files[fieldName];
    for (const file of fileArray) {
      await processFile(file);
    }
  }

  return tempRemovingFiles;
};


const cleanupTempFiles = (files) => {
  for (const tempFile of files) {
    if (fs.existsSync(tempFile)) {
      fs.unlink(tempFile, (err) => {
        if (err) console.error("Error removing temp file:", tempFile, err);
      });
    }
  }
};

const cleanupUploadedFiles = (files) => {
  if (files && Array.isArray(files)) {
    files.forEach((file) => {
      if (file && file.path) {
        fs.unlink(file.path, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
          }
        });
      }
    });
  }
};


module.exports = uploadWithDestination;