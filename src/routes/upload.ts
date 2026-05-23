import { Router } from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { supabase, STORAGE_BUCKET } from "../lib/supabase.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB (Vercel serverless limit ~4.5MB)
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Solo se permiten imágenes"));
    }
    cb(null, true);
  },
});

// POST /api/upload  (multipart/form-data: field "file", optional "folder")
router.post(
  "/",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file received" });

    const folder = (req.body.folder as string | undefined)?.replace(
      /[^a-zA-Z0-9_\-/]/g,
      ""
    );
    const ext = req.file.originalname.split(".").pop() ?? "jpg";
    const filename = `${folder ? `${folder}/` : ""}${randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filename, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      return res
        .status(500)
        .json({ error: "Upload failed", details: error.message });
    }

    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filename);

    res.status(201).json({ path: filename, url: data.publicUrl });
  })
);

// DELETE /api/upload?path=...
router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const path = req.query.path as string | undefined;
    if (!path) return res.status(400).json({ error: "Missing path" });

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path]);

    if (error) {
      return res
        .status(500)
        .json({ error: "Delete failed", details: error.message });
    }
    res.status(204).end();
  })
);

export default router;
