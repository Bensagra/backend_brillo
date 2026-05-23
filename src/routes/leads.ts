import { Router } from "express";
import { z } from "zod";
import { LeadCatalogSize, LeadStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const router = Router();

const leadInputSchema = z.object({
  ownerName: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(6, "WhatsApp requerido"),
  jewelryName: z.string().min(2, "Nombre de la joyería requerido"),
  city: z.string().min(2, "Ciudad requerida"),
  catalogSize: z.nativeEnum(LeadCatalogSize).default(LeadCatalogSize.no_se),
  message: z.string().max(2000).optional(),
  source: z.string().max(60).optional(),
});

// POST /api/leads — captura intención desde el landing
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = leadInputSchema.parse(req.body);
    const lead = await prisma.lead.create({ data });
    res.status(201).json(lead);
  })
);

// GET /api/leads — listado para admin (sin auth en MVP)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { status } = req.query as { status?: string };
    const leads = await prisma.lead.findMany({
      where: status && status in LeadStatus ? { status: status as LeadStatus } : undefined,
      orderBy: { createdAt: "desc" },
    });
    res.json(leads);
  })
);

// PATCH /api/leads/:id — actualizar estado
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const schema = z.object({ status: z.nativeEnum(LeadStatus) });
    const { status } = schema.parse(req.body);
    const updated = await prisma.lead.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(updated);
  })
);

export default router;
