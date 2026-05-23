import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { slugify } from "../lib/slug.js";

const router = Router();

const jewelryInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().default(""),
  image: z.string().url(),
  address: z.string().min(1),
  shortAddress: z.string().min(1),
  distance: z.number().nonnegative().default(0),
  rating: z.number().min(0).max(5).default(0),
  reviewsCount: z.number().int().nonnegative().default(0),
  isOpen: z.boolean().default(true),
  hours: z.string().default(""),
  phone: z.string().default(""),
  whatsapp: z.string().default(""),
  instagram: z.string().default(""),
  specialties: z.array(z.string()).default([]),
  latitude: z.number(),
  longitude: z.number(),
});

// GET /api/jewelries
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { q, category } = req.query as { q?: string; category?: string };

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { specialties: { has: q } },
      ];
    }
    if (category) {
      where.specialties = {
        hasSome: [category, category.charAt(0).toUpperCase() + category.slice(1)],
      };
    }

    const jewelries = await prisma.jewelry.findMany({
      where,
      orderBy: { distance: "asc" },
    });

    res.json(jewelries);
  })
);

// GET /api/jewelries/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const jewelry = await prisma.jewelry.findUnique({
      where: { id: req.params.id },
      include: {
        products: true,
        reviews: { orderBy: { createdAt: "desc" } },
      },
    });
    if (!jewelry) {
      return res.status(404).json({ error: "Jewelry not found" });
    }
    res.json(jewelry);
  })
);

// POST /api/jewelries
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = jewelryInputSchema.parse(req.body);
    const id = data.id ?? slugify(data.name);
    const created = await prisma.jewelry.create({
      data: { ...data, id },
    });
    res.status(201).json(created);
  })
);

// PUT /api/jewelries/:id
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = jewelryInputSchema.partial().parse(req.body);
    const updated = await prisma.jewelry.update({
      where: { id: req.params.id },
      data,
    });
    res.json(updated);
  })
);

// DELETE /api/jewelries/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await prisma.jewelry.delete({ where: { id: req.params.id } });
    res.status(204).end();
  })
);

export default router;
