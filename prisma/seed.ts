import { PrismaClient, Availability, CategoryId } from "@prisma/client";

const prisma = new PrismaClient();

const jewelries = [
  {
    id: "aurum-boutique",
    name: "Aurum Boutique",
    description:
      "Joyería de alta gama especializada en piezas únicas de oro 18k y diamantes. Más de 30 años creando alianzas, anillos de compromiso y joyas a medida.",
    image:
      "https://images.unsplash.com/photo-1581266503312-c84c0d3d0e95?auto=format&fit=crop&w=1200&q=80",
    address: "Av. Santa Fe 1234, Recoleta, CABA",
    shortAddress: "Av. Santa Fe 1234",
    distance: 0.8,
    rating: 4.9,
    reviewsCount: 124,
    isOpen: true,
    hours: "Lun a Sáb 10:00 - 20:00",
    phone: "+5491145678901",
    whatsapp: "5491145678901",
    instagram: "@aurum.boutique",
    specialties: ["Anillos", "Alianzas", "Oro 18k", "Diamantes"],
    latitude: -34.595,
    longitude: -58.395,
  },
  {
    id: "plata-arte",
    name: "Plata & Arte",
    description:
      "Diseño contemporáneo en plata 925 y piedras naturales. Piezas artesanales hechas a mano en nuestro taller.",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80",
    address: "Defensa 870, San Telmo, CABA",
    shortAddress: "Defensa 870",
    distance: 1.2,
    rating: 4.7,
    reviewsCount: 89,
    isOpen: true,
    hours: "Mar a Dom 11:00 - 19:30",
    phone: "+5491145678902",
    whatsapp: "5491145678902",
    instagram: "@plataarte.bsas",
    specialties: ["Plata 925", "Diseño artesanal", "Piedras"],
    latitude: -34.62,
    longitude: -58.373,
  },
  {
    id: "chronos-time",
    name: "Chronos Time",
    description:
      "Relojería de alta gama. Servicio técnico oficial de las principales marcas suizas y selección curada de relojes nuevos y vintage.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    address: "Av. Alvear 1882, Recoleta, CABA",
    shortAddress: "Av. Alvear 1882",
    distance: 1.6,
    rating: 4.8,
    reviewsCount: 156,
    isOpen: true,
    hours: "Lun a Vie 10:00 - 19:00",
    phone: "+5491145678903",
    whatsapp: "5491145678903",
    instagram: "@chronos.time",
    specialties: ["Relojes", "Servicio técnico", "Vintage"],
    latitude: -34.59,
    longitude: -58.392,
  },
  {
    id: "taller-artesanos",
    name: "Taller Artesanos",
    description:
      "Reparación, restauración y diseño a medida. Trabajamos con todo tipo de metales y piedras. Más de 40 años de oficio.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    address: "Av. Corrientes 2456, Balvanera, CABA",
    shortAddress: "Av. Corrientes 2456",
    distance: 2.1,
    rating: 4.6,
    reviewsCount: 73,
    isOpen: false,
    hours: "Lun a Vie 09:00 - 18:00",
    phone: "+5491145678904",
    whatsapp: "5491145678904",
    instagram: "@taller.artesanos",
    specialties: ["Reparaciones", "Diseño a medida", "Restauración"],
    latitude: -34.604,
    longitude: -58.41,
  },
  {
    id: "joyas-dor",
    name: "Joyas d'Or",
    description:
      "Joyería clásica con más de medio siglo de tradición familiar. Alianzas grabadas, anillos solitarios y regalos para toda ocasión.",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80",
    address: "Av. Cabildo 2100, Belgrano, CABA",
    shortAddress: "Av. Cabildo 2100",
    distance: 3.4,
    rating: 4.5,
    reviewsCount: 211,
    isOpen: true,
    hours: "Lun a Sáb 09:30 - 20:00",
    phone: "+5491145678905",
    whatsapp: "5491145678905",
    instagram: "@joyas.dor",
    specialties: ["Alianzas", "Oro", "Regalos"],
    latitude: -34.563,
    longitude: -58.456,
  },
  {
    id: "atelier-luz",
    name: "Atelier Luz",
    description:
      "Joyería contemporánea de autor. Piezas minimalistas, únicas y de edición limitada inspiradas en formas naturales.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    address: "Honduras 5200, Palermo Soho, CABA",
    shortAddress: "Honduras 5200",
    distance: 2.8,
    rating: 4.9,
    reviewsCount: 64,
    isOpen: true,
    hours: "Mar a Sáb 12:00 - 20:00",
    phone: "+5491145678906",
    whatsapp: "5491145678906",
    instagram: "@atelier.luz",
    specialties: ["Diseño de autor", "Plata", "Minimalista"],
    latitude: -34.587,
    longitude: -58.432,
  },
];

const products = [
  {
    id: "p1",
    jewelryId: "aurum-boutique",
    name: "Solitario Oro 18k",
    description:
      "Anillo solitario en oro amarillo 18k con diamante central talla brillante de 0.25 ct. Pieza clásica y atemporal.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
    ],
    price: 1250000,
    material: "Oro 18k · Diamante",
    availability: Availability.disponible,
    isFeatured: true,
    category: CategoryId.anillos,
  },
  {
    id: "p2",
    jewelryId: "plata-arte",
    name: "Aros Perla Natural",
    description:
      "Aros colgantes en plata 925 con perla natural de cultivo. Diseño artesanal único.",
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
    ],
    price: 340000,
    material: "Plata 925 · Perla",
    availability: Availability.disponible,
    isFeatured: true,
    category: CategoryId.anillos,
  },
  {
    id: "p3",
    jewelryId: "atelier-luz",
    name: "Gargantilla Minimal",
    description:
      "Gargantilla en plata 925 con baño de oro, diseño minimalista geométrico de edición limitada.",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f743baf?auto=format&fit=crop&w=900&q=80",
    ],
    price: 195000,
    material: "Plata 925 con baño de oro",
    availability: Availability.disponible,
    isFeatured: true,
    category: CategoryId.cadenas,
  },
  {
    id: "p4",
    jewelryId: "chronos-time",
    name: "Reloj Clásico Swiss",
    description:
      "Reloj automático suizo con caja de acero y malla de cuero genuino. 2 años de garantía oficial.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80",
    ],
    price: 2800000,
    material: "Acero · Cuero",
    availability: Availability.disponible,
    isFeatured: true,
    category: CategoryId.relojes,
  },
  {
    id: "p5",
    jewelryId: "aurum-boutique",
    name: "Alianza Clásica Oro",
    description:
      "Alianza de oro 18k 4mm, terminación mate y brillo. Personalización con grabado interior incluida.",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
    ],
    price: 480000,
    material: "Oro 18k",
    availability: Availability.disponible,
    isFeatured: false,
    category: CategoryId.alianzas,
  },
  {
    id: "p6",
    jewelryId: "joyas-dor",
    name: "Cadena Italiana 50cm",
    description:
      "Cadena italiana de oro 18k modelo cartier, 50cm de largo. Cierre seguro de mosquetón.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
    ],
    price: 720000,
    material: "Oro 18k",
    availability: Availability.disponible,
    isFeatured: true,
    category: CategoryId.cadenas,
  },
  {
    id: "p7",
    jewelryId: "plata-arte",
    name: "Pulsera Tejida Plata",
    description:
      "Pulsera tejida a mano en plata 925, ajustable. Pieza artesanal hecha en taller propio.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f743baf?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611652022419-a9419f743baf?auto=format&fit=crop&w=900&q=80",
    ],
    price: 95000,
    material: "Plata 925",
    availability: Availability.disponible,
    isFeatured: false,
    category: CategoryId.pulseras,
  },
  {
    id: "p8",
    jewelryId: "atelier-luz",
    name: "Anillo Luna Plata",
    description:
      "Anillo modelo Luna, plata 925 con detalle de circonita. Diseño de autor exclusivo del atelier.",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
    ],
    price: 145000,
    material: "Plata 925 · Circonita",
    availability: Availability.disponible,
    isFeatured: false,
    category: CategoryId.anillos,
  },
  {
    id: "p9",
    jewelryId: "chronos-time",
    name: "Reloj Vintage 1972",
    description:
      "Pieza vintage de colección, totalmente revisada y restaurada. Único disponible.",
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80",
    ],
    price: 1850000,
    material: "Acero vintage",
    availability: Availability.disponible,
    isFeatured: false,
    category: CategoryId.relojes,
  },
  {
    id: "p10",
    jewelryId: "joyas-dor",
    name: "Alianzas Pareja Oro",
    description:
      "Set de alianzas para pareja en oro 18k, distintos anchos. Incluye estuche premium y grabado.",
    image:
      "https://images.unsplash.com/photo-1551446591-142875a901a1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551446591-142875a901a1?auto=format&fit=crop&w=900&q=80",
    ],
    price: 980000,
    material: "Oro 18k",
    availability: Availability.disponible,
    isFeatured: true,
    category: CategoryId.alianzas,
  },
  {
    id: "p11",
    jewelryId: "taller-artesanos",
    name: "Reparación de cadenas",
    description:
      "Servicio de reparación, soldadura y limpieza de cadenas de oro y plata. Presupuesto sin cargo.",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
    ],
    price: null,
    material: "Servicio",
    availability: Availability.disponible,
    isFeatured: false,
    category: CategoryId.reparaciones,
  },
  {
    id: "p12",
    jewelryId: "atelier-luz",
    name: "Aros Hoja Mini",
    description:
      "Aros pequeños en forma de hoja, plata 925. Livianos para uso diario.",
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
    ],
    price: 78000,
    material: "Plata 925",
    availability: Availability.disponible,
    isFeatured: false,
    category: CategoryId.pulseras,
  },
];

const reviews = [
  {
    id: "r1",
    jewelryId: "aurum-boutique",
    author: "María González",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    date: "Hace 2 semanas",
    comment:
      "Excelente atención. Compramos las alianzas de casamiento y nos asesoraron en cada detalle. Las piezas son hermosas.",
  },
  {
    id: "r2",
    jewelryId: "aurum-boutique",
    author: "Lucas Pérez",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "Hace 1 mes",
    comment:
      "Compré un anillo de compromiso, increíble la calidad y el trato. Volveré sin dudas.",
  },
  {
    id: "r3",
    jewelryId: "plata-arte",
    author: "Sofía Méndez",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 4,
    date: "Hace 3 días",
    comment:
      "Diseños hermosos y originales. Me encantó el trato personalizado del taller.",
  },
  {
    id: "r4",
    jewelryId: "chronos-time",
    author: "Tomás Álvarez",
    avatar: "https://i.pravatar.cc/100?img=15",
    rating: 5,
    date: "Hace 1 semana",
    comment:
      "Me arreglaron un reloj de mi abuelo, quedó como nuevo. Conocimiento y profesionalismo de primera.",
  },
];

async function main() {
  console.log("🌱 Seed iniciado...");

  // Limpia en orden para respetar las FKs
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.jewelry.deleteMany();

  for (const j of jewelries) {
    await prisma.jewelry.create({ data: j });
  }
  console.log(`✓ ${jewelries.length} joyerías`);

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`✓ ${products.length} productos`);

  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }
  console.log(`✓ ${reviews.length} reseñas`);

  console.log("✨ Seed terminado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
