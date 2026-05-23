import { Router } from "express";

const router = Router();

// Categorías estáticas (definidas por el enum). Se exponen como API
// para mantener consistencia con el frontend.
const CATEGORIES = [
  { id: "anillos", name: "Anillos", icon: "diamond" },
  { id: "alianzas", name: "Alianzas", icon: "favorite" },
  { id: "cadenas", name: "Cadenas", icon: "linked_services" },
  { id: "pulseras", name: "Pulseras", icon: "circle" },
  { id: "relojes", name: "Relojes", icon: "watch" },
  { id: "reparaciones", name: "Reparaciones", icon: "build" },
];

router.get("/", (_req, res) => {
  res.json(CATEGORIES);
});

export default router;
