// Entry point para Vercel serverless functions.
// Toda request entra acá (gracias al rewrite en vercel.json) y la pasamos al
// mismo Express app que usamos localmente.
import app from "../src/app.js";

export default app;
