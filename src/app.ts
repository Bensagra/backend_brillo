import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { env } from "./lib/env.js";
import jewelriesRouter from "./routes/jewelries.js";
import productsRouter from "./routes/products.js";
import reviewsRouter from "./routes/reviews.js";
import categoriesRouter from "./routes/categories.js";
import uploadRouter from "./routes/upload.js";
import leadsRouter from "./routes/leads.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigin === "*" ? true : env.corsOrigin.split(","),
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "brilla-backend" });
  });

  app.use("/api/jewelries", jewelriesRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/reviews", reviewsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/upload", uploadRouter);
  app.use("/api/leads", leadsRouter);

  app.use((req, res) => {
    res.status(404).json({ error: "Not found", path: req.originalUrl });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: "Validation failed", issues: err.issues });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Resource not found" });
      }
      if (err.code === "P2002") {
        return res
          .status(409)
          .json({ error: "Resource already exists", target: err.meta?.target });
      }
      return res
        .status(400)
        .json({ error: "Database error", code: err.code, message: err.message });
    }
    console.error("[unhandled]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
  });

  return app;
}

const app = createApp();
export default app;
