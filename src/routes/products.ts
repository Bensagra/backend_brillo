import { Router } from "express";
import { z } from "zod";
import { Availability, CategoryId } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { slugify } from "../lib/slug.js";

const router = Router();

const productInputSchema = z.object({
  id: z.string().optional(),
  jewelryId: z.string(),
  name: z.string().min(1),
  description: z.string().default(""),
  image: z.string().url(),
  gallery: z.array(z.string().url()).default([]),
  price: z.number().int().nullable().optional(),
  material: z.string().default(""),
  availability: z.nativeEnum(Availability).default(Availability.disponible),
  isFeatured: z.boolean().default(false),
  category: z.nativeEnum(CategoryId),
});

// GET /api/products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { q, category, jewelryId, featured } = req.query as {
      q?: string;
      category?: string;
      jewelryId?: string;
      featured?: string;
    };

    const where: any = {};
    if (jewelryId) where.jewelryId = jewelryId;
    if (category && category in CategoryId) {
      where.category = category as CategoryId;
    }
    if (featured === "true") where.isFeatured = true;
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { material: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      include: { jewelry: { select: { id: true, name: true, image: true } } },
    });

    res.json(products);
  })
);

// GET /api/products/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { jewelry: true },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  })
);

// GET /api/products/:id/similar
router.get(
  "/:id/similar",
  asyncHandler(async (req, res) => {
    const base = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!base) return res.status(404).json({ error: "Product not found" });
    const similar = await prisma.product.findMany({
      where: { category: base.category, NOT: { id: base.id } },
      take: 4,
      include: { jewelry: { select: { id: true, name: true } } },
    });
    res.json(similar);
  })
);

// POST /api/products
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = productInputSchema.parse(req.body);
    const id = data.id ?? slugify(`${data.name}-${Date.now()}`);
    const created = await prisma.product.create({ data: { ...data, id } });
    res.status(201).json(created);
  })
);

// PUT /api/products/:id
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = productInputSchema.partial().parse(req.body);
    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data,
    });
    res.json(updated);
  })
);

// DELETE /api/products/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(204).end();
  })
);

export default router;
