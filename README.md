# Brilla — Backend

API REST con Express + Prisma + Supabase (PostgreSQL + Storage).

## Estructura

```
backend/
├── api/
│   └── index.ts          # Entry point para Vercel serverless
├── src/
│   ├── app.ts            # Express app (exportable, reusada en api/ y server.ts)
│   ├── server.ts         # Listen para desarrollo local
│   ├── lib/              # prisma, supabase, env, helpers
│   └── routes/           # jewelries, products, reviews, leads, upload, categories
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── vercel.json
└── tsconfig.json
```

## Desarrollo local

```bash
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev          # http://localhost:4000
```

## Deploy a Vercel

El backend está preparado como serverless function. `api/index.ts` exporta el
mismo Express app que `server.ts` corre localmente. `vercel.json` enruta todas
las requests a esa función.

### Pasos

1. **Importá el repo en Vercel** y configurá el **Root Directory** del proyecto en `backend/`.
2. Configurá las **Environment Variables** (Settings → Environment Variables):

   | Var | Valor |
   | --- | --- |
   | `DATABASE_URL` | `postgresql://postgres.xxx:****@aws-1-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true` |
   | `DIRECT_URL` | `postgresql://postgres.xxx:****@aws-1-us-west-2.pooler.supabase.com:5432/postgres` |
   | `SUPABASE_URL` | `https://xxx.supabase.co` |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` |
   | `SUPABASE_STORAGE_BUCKET` | `images` |
   | `CORS_ORIGIN` | `https://tu-frontend.vercel.app` |

   > Importante: `DATABASE_URL` **debe usar el pooler** de Supabase (puerto 6543, con `?pgbouncer=true`). En serverless cada invocación abre una conexión y sin pooler se agotan rápido. `DIRECT_URL` se usa solo para `prisma migrate`.

3. Antes del primer deploy, corré las migraciones contra Supabase **desde tu máquina** (no podés migrar desde una función serverless):

   ```bash
   npx prisma migrate deploy
   npm run db:seed          # opcional, una sola vez
   ```

4. Hacé deploy. Vercel va a:
   - correr `npm install` (lanza `postinstall` → `prisma generate`)
   - correr `vercel-build` (otro `prisma generate` por las dudas)
   - compilar `api/index.ts` con esbuild + bundle de los imports de `src/`

5. Probá `https://tu-backend.vercel.app/health` y `https://tu-backend.vercel.app/api/jewelries`.

### Frontend en Vercel

En el proyecto del frontend agregá:

```
VITE_API_URL=https://tu-backend.vercel.app/api
```

Y en el backend agregá ese mismo origen al `CORS_ORIGIN`.

## Limitaciones a tener en cuenta

- **Body limit**: Vercel serverless tiene ~4.5 MB de body. `/api/upload` está limitado a 4 MB.
- **Cold start**: la primera request tras inactividad puede tardar 1–2s por Prisma. El pooler ayuda; si necesitás más rendimiento, mirá Prisma Accelerate.
- **maxDuration**: 30 s por request (configurable en `vercel.json`).

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | tsx watch local |
| `npm run build` | `prisma generate && tsc` (para hostings tipo Railway/Render) |
| `npm run vercel-build` | solo `prisma generate` (Vercel compila las functions) |
| `npm run start` | `node dist/server.js` |
| `npm run db:seed` | corre `prisma/seed.ts` |
| `npm run prisma:migrate` | crea migración nueva en dev |
| `npm run prisma:deploy` | aplica migraciones en prod |
| `npm run prisma:studio` | GUI para inspeccionar la DB |

## Endpoints

Base: `/api`

- `GET    /jewelries?q=&category=` · `GET /jewelries/:id` · `POST/PUT/DELETE /jewelries[/...]`
- `GET    /products?q=&category=&jewelryId=&featured=` · `GET /products/:id` · `GET /products/:id/similar` · `POST/PUT/DELETE /products[/...]`
- `GET    /reviews?jewelryId=` · `POST/DELETE /reviews[/...]`
- `GET    /leads?status=` · `POST /leads` · `PATCH /leads/:id`
- `GET    /categories`
- `POST   /upload` (multipart `file`, `folder?`) · `DELETE /upload?path=`
- `GET    /health`

## Troubleshooting

- **`Error TS6059: File 'prisma/seed.ts' is not under rootDir 'src'`** → resuelto: `tsconfig.json` excluye `prisma/`, el seed corre con `tsx` (no necesita compilarse).
- **`Can't reach database server`** → chequeá que `DATABASE_URL` use el pooler (`:6543` con `?pgbouncer=true`).
- **`Bucket not found`** → creá `images` en Supabase Storage y marcalo como **Public**.
- **CORS error en prod** → agregá el dominio del frontend a `CORS_ORIGIN` en Vercel.
