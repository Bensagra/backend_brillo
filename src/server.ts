import app from "./app.js";
import { env } from "./lib/env.js";

app.listen(env.port, () => {
  console.log(`🌟 Brilla backend listo en http://localhost:${env.port}`);
  console.log(`   Bucket Supabase: ${env.supabaseStorageBucket}`);
});
