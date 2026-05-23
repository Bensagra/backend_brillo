import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const router = Router();

const reviewInputSchema = z.object({
  jewelryId: z.string(),
  author: z.string().min(1),
  avatar: z.string().url().default("https://i.pravatar.cc/100"),
  rating: z.number().int().min(1).max(5),
  date: z.string().default("Hace unos minutos"),
  comment: z.string().min(1),
});

// GET /api/reviews?jewelryId=...
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { jewelryId } = req.query as { jewelryId?: string };
    const reviews = await prisma.review.findMany({
      where: jewelryId ? { jewelryId } : undefined,
      orderBy: { createdAt: "desc" },
    });
    res.json(reviews);
  })
);

// POST /api/reviews
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = reviewInputSchema.parse(req.body);
    const created = await prisma.review.create({ data });

    // Recalcular rating y reviewsCount de la joyería
    const all = await prisma.review.findMany({
      where: { jewelryId: data.jewelryId },
      select: { rating: true },
    });
    const avg =
      all.reduce((sum, r) => sum + r.rating, 0) / (all.length || 1);

    await prisma.jewelry.update({
      where: { id: data.jewelryId },
      data: {
        rating: Math.round(avg * 10) / 10,
        reviewsCount: all.length,
      },
    });

    res.status(201).json(created);
  })
);

// DELETE /api/reviews/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await prisma.review.delete({ where: { id: req.params.id } });
    res.status(204).end();
  })
);

export default router;
