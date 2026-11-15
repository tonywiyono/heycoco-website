/** Real Hey Coco! works, scraped from heycoco.agency on 2026-10-20. Images are in /public/images/works. */
export type Work = {
  slug: string;
  title: string;
  client: string;
  type: string;
  category: "social-media" | "branding" | "photo-video" | "performance-marketing" | string;
  year: string;
  description: string;
  thumb: string;
  hero: string;
  gallery: string[];
};

export const works: Work[] = [
  {
    "slug": "first-step-matters-photoshoot",
    "title": "First Step Matters",
    "client": "First Step Matters",
    "type": "Photoshoot",
    "category": "photo-video",
    "year": "2026",
    "description": "#BecauseItAlwaysMatters The safest baby & kids skincare for sensitive skin 🔬 BPOM | Halal | Dermatologically Tested",
    "thumb": "/images/works/8febcbe0-7211-4c08-92fd-a1b9878d40b1.webp",
    "hero": "/images/works/dadd5c76-beb6-4411-b13c-a1c30ffaf022.webp",
    "gallery": [
      "/images/works/ca7103b8-8404-4d4f-a46b-2ba6d6a9a67a.webp",
      "/images/works/4bf2c899-89ad-4efe-b0c4-47a07a68d59b.webp",
      "/images/works/ddfc826f-fb88-4d23-bfea-59c8a9055267.webp"
    ]
  },
  {
    "slug": "snail-helmet",
    "title": "Snail Helmet",
    "client": "Snail Helmet",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Snail Helmet is a motorcycle helmet brand that combines protection, comfort, and bold design for modern riders. Through dynamic visuals and product-focused storytelling, the brand highlights its diverse helmet designs and visor options while showcasing the individuality and style of every ride.",
    "thumb": "/images/works/0887ceba-b124-41fd-9ba0-079276708be5.webp",
    "hero": "/images/works/14d30d38-8d06-4d58-a5de-755d36bbd4d4.webp",
    "gallery": [
      "/images/works/948db4ce-aff6-48f8-a0bd-112af24be080.webp",
      "/images/works/cc6f4b3b-8f95-4a6f-83ff-0b3b20dee827.webp",
      "/images/works/dee436bc-516b-4452-a174-a34db3831bfb.webp"
    ]
  },
  {
    "slug": "kahf-extrait",
    "title": "Kahf",
    "client": "Kahf",
    "type": "Videoshoot",
    "category": "photo-video",
    "year": "2026",
    "description": "For men who choose their own path. No. 1 Face Wash & Sunscreen in Indonesia.",
    "thumb": "/images/works/b799bdf3-0a99-4498-9e64-3be14f2f1680.webp",
    "hero": "/images/works/29ed21a3-f3e4-41ba-a0ba-c6b2e0f72386.webp",
    "gallery": [
      "/images/works/75398b4e-2e09-44fc-910e-7741da558752.webp",
      "/images/works/f1302c72-f546-43e3-a150-a3f84fec53bb.webp"
    ]
  },
  {
    "slug": "beluga-coffee",
    "title": "Beluga Coffee Roastery",
    "client": "Beluga Coffee",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Coffee Roaster for Shops & Home Brewer. Where coffee lovers experience the finest coffee beans.",
    "thumb": "/images/works/f7d7ff4c-d738-47be-a076-b595e6b1860e.webp",
    "hero": "/images/works/a570f0a4-bd30-4489-927c-7eb8d8ffb761.webp",
    "gallery": [
      "/images/works/1adb004f-b2c8-4793-9417-7c6db3bc4374.webp",
      "/images/works/c64dc68d-ec76-458d-a6c0-c257d7f8da89.webp",
      "/images/works/88d54221-c26e-43ca-ac88-82f2eea895c5.webp"
    ]
  },
  {
    "slug": "dorskin",
    "title": "Dorskin",
    "client": "Dorskin",
    "type": "Photoshoot",
    "category": "photo-video",
    "year": "2026",
    "description": "💖 Indonesia's #1 Product for Healthy & Acne-Free Skin Care 💟 Proven by 500k++ Acne Fighters",
    "thumb": "/images/works/6507c8bc-ec53-4a5f-9f6c-2ff36cbe7065.webp",
    "hero": "/images/works/857eb504-6d52-4ec5-a47b-d142f2ccd704.webp",
    "gallery": [
      "/images/works/f3d9b4bf-ee81-4b16-ab61-500643b4ca09.webp",
      "/images/works/ca7685aa-824c-4b57-97a4-83fc10536133.webp"
    ]
  },
  {
    "slug": "dokterin",
    "title": "DokterIN",
    "client": "DokterIN",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Solusi Kesehatan Digital untuk Asuransi & Korporasi | Cashless Healthcare Ecosystem",
    "thumb": "/images/works/3fabe7fb-5374-4422-a195-c3e542e09208.webp",
    "hero": "/images/works/0183d5d6-1a2b-42a2-a76d-cad78edfa287.webp",
    "gallery": [
      "/images/works/b9b2d912-9eef-45d3-9275-202f09e1f1b0.webp",
      "/images/works/569be62b-2a83-4cf4-8618-c924445cd4a4.webp",
      "/images/works/930b5ee6-7c87-4eeb-8ea1-d8013da2590c.webp"
    ]
  },
  {
    "slug": "life-at-gps",
    "title": "Life at GPS",
    "client": "GPS United",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Life at GPS is an entrepreneurial community powered by GPS United, an exclusive partner of Prudential Indonesia. Established in 2014, GPS United has grown into one of the largest life insurance agencies in Indonesia and achieved the position of No. 1 agency within Prudential Indonesia in 2019.",
    "thumb": "/images/works/1c7ef3eb-4bd6-4f26-87bb-4f5d47d25ec4.webp",
    "hero": "/images/works/c71e411b-3c92-447b-9553-1e79fc3c670e.webp",
    "gallery": [
      "/images/works/c13fefae-2047-4319-8cce-b77ac69bace1.webp",
      "/images/works/e7b1f96f-bb08-429b-86cf-cd373544dc5c.webp",
      "/images/works/59d7e2fd-045a-4ddb-b606-3816264ea5cd.webp"
    ]
  },
  {
    "slug": "duanyam",
    "title": "Duanyam",
    "client": "Duanyam",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2025",
    "description": "Social enterprise empowering women weavers of rural Indonesia | Corporate & Wholesale | Export",
    "thumb": "/images/works/eb28e3e3-097e-4f62-b204-608e43838155.webp",
    "hero": "/images/works/e2d4db77-3681-4525-8fb8-7804bc5025d5.webp",
    "gallery": [
      "/images/works/7b539691-4c4f-4446-bbe3-ed6b00313d31.webp",
      "/images/works/8eb9cb68-e484-4110-8291-475f9dd9a687.webp"
    ]
  },
  {
    "slug": "arta-texindo",
    "title": "Arta Texindo",
    "client": "Arta Texindo",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Arta Texindo is an Indonesian textile company specializing in the production and supply of quality fabrics for fashion, lifestyle, and business needs. Operating under PT Arta Permai Texindo, the company is based in West Jakarta and focuses on delivering high-quality textile products with consistent production standards.",
    "thumb": "/images/works/e1db5158-ada8-465d-9b45-4d3563e8211e.webp",
    "hero": "/images/works/b571a7b5-9859-4821-90cc-c973a07b30ea.webp",
    "gallery": [
      "/images/works/d3c2ae2e-e418-43fa-aa21-28a8da4f0b2b.webp",
      "/images/works/ddc4ed07-1ace-4c8a-bba5-edbfdd897516.webp",
      "/images/works/f82005fa-ef98-4264-b26f-de2a2839157b.webp"
    ]
  },
  {
    "slug": "ayam-presto-nita",
    "title": "Ayam Presto Nita",
    "client": "Ayam Presto Nita",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "🍗 Ayamnya Enak, Tulangnya Lunak! ✨ Higienis, Sehat, Rendah Lemak",
    "thumb": "/images/works/5c4b6c99-4a8e-4e85-b582-b3b87d2bdaff.webp",
    "hero": "/images/works/ef2f8cb2-19c0-4585-965b-a36eee8b02e1.webp",
    "gallery": [
      "/images/works/7cf8ec0d-a1e7-492b-a0fe-c3466c5f2d17.webp",
      "/images/works/4e94dec8-16ce-44f2-b04b-299216d4f6b5.webp",
      "/images/works/0c0b8e0f-e409-43c5-b1f5-02e7fda73e9e.webp"
    ]
  },
  {
    "slug": "indoprima",
    "title": "Indoprima",
    "client": "Indoprima",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2025",
    "description": "Indoprima (PT Wanindo Prima) is an established Indonesian exhibition and event contractor that has been providing integrated exhibition solutions since 1993. With more than three decades of experience, the company specializes in creating and executing exhibition spaces, event installations, and brand activation environments for businesses, brands, and event organizers.",
    "thumb": "/images/works/25be92c2-8d8e-4b1a-9698-d8fe5dc50698.webp",
    "hero": "/images/works/8c63c1c4-715f-4326-8251-d49912a6aa49.webp",
    "gallery": [
      "/images/works/63b4eb47-d0a7-46eb-a227-ca5bbfbc970c.webp",
      "/images/works/b3af90d7-950e-4f5a-9fe0-522b19c8ecda.webp",
      "/images/works/fbc8b7e6-4ce5-479c-9706-0d1e272ba8d0.webp"
    ]
  },
  {
    "slug": "viroteq",
    "title": "Viroteq",
    "client": "Viroteq",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Great Fabric With Great Character",
    "thumb": "/images/works/7904ea20-58d2-4c1a-91c4-5559c518ae07.webp",
    "hero": "/images/works/adfcac9d-3a3f-4246-accd-35b916ab34fe.webp",
    "gallery": [
      "/images/works/ce007eb1-09a3-4b34-a16f-d229803e95ee.webp",
      "/images/works/6d8de326-dbf1-4519-a777-2b60bf97a8ac.webp",
      "/images/works/2d9fb468-93fb-47a8-80df-ce8f56a2c576.webp"
    ]
  },
  {
    "slug": "liga-peter-collection",
    "title": "Liga Peter Collection",
    "client": "Liga Peter Collection",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "#1 Women's Fashion Supplier",
    "thumb": "/images/works/b5cba4a6-58ae-4d56-a5bf-eb22d805f4f9.webp",
    "hero": "/images/works/21121919-31de-4e69-9024-9d2f32b7e2af.webp",
    "gallery": [
      "/images/works/8f37ed88-a150-45f1-a446-44f6261749ab.webp",
      "/images/works/8ecf87af-f3b2-4f71-9f35-8a24050797f0.webp",
      "/images/works/0435295e-5a17-4493-ad1b-a9f69a707047.webp"
    ]
  },
  {
    "slug": "coco-cart",
    "title": "Coco Cart",
    "client": "Coco Cart",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "cᴏᴄᴏɴᴜᴛ-ᴏɴ-ᴡʜᴇᴇʟꜱ ᴘᴇʀᴛᴀᴍᴀ ᴅɪ ᴊᴀᴋᴀʀᴛᴀ",
    "thumb": "/images/works/8617b197-14c3-4154-895e-94ad2af713de.webp",
    "hero": "/images/works/61848a22-30e1-4f6c-aa9a-5e026acdf89c.webp",
    "gallery": [
      "/images/works/b1c20936-bce6-4e42-8896-d2b21dc8d362.webp",
      "/images/works/738be315-8bf7-43a3-924e-84d25df89b58.webp",
      "/images/works/500d85af-03d7-4b4c-bbcc-74493895693d.webp"
    ]
  },
  {
    "slug": "edo-food",
    "title": "Edo Food",
    "client": "Edo Food",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Enaknya Sat Set, Kualitasnya Juara!",
    "thumb": "/images/works/b73a26fc-2590-46f4-ac8f-32a3937bc355.webp",
    "hero": "/images/works/4f518177-15e3-4ca1-92ee-29ed26fb4dae.webp",
    "gallery": [
      "/images/works/0da6fc51-05c0-4d77-ac22-a122c59c051e.webp",
      "/images/works/ee34fc5d-017d-4c5c-8637-7f75e854dbd6.webp"
    ]
  },
  {
    "slug": "chef-daniel",
    "title": "Chef Daniel",
    "client": "Chef Daniel",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Rahasia rasa umami untuk sup, tumisan, dan berbagai hidangan",
    "thumb": "/images/works/ca1fa0d0-6a85-44ae-8a45-0dd8161e07f2.webp",
    "hero": "/images/works/15e41f4d-32a8-4f63-bbda-ce3623d78121.webp",
    "gallery": [
      "/images/works/5317af86-4431-408a-9d71-ae19d64c889a.webp",
      "/images/works/d39eaa44-1430-4f02-bba7-3b84b45bdba6.webp",
      "/images/works/7b0e12be-596c-418a-ad2c-1e683fed5d60.webp"
    ]
  },
  {
    "slug": "dapur-jeng-gendhis",
    "title": "Dapur Jeng Gendhis",
    "client": "Dapur Jeng Gendhis",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Katering Nusantara | Menu autentik & praktis Hidangan siap saji untuk harian & momen spesial",
    "thumb": "/images/works/3f584316-1238-4a93-b31f-0bc7fea60a78.webp",
    "hero": "/images/works/9213cf85-10a7-4b1a-bf06-2e6376227525.webp",
    "gallery": [
      "/images/works/433f3c7e-5f68-4f80-bf94-6dbc5291b29d.webp",
      "/images/works/f931b85e-337c-45ef-aa53-38ccc02cd92e.webp",
      "/images/works/db057603-5316-4b1a-a13c-89d0eb93db43.webp"
    ]
  },
  {
    "slug": "kara",
    "title": "Kara",
    "client": "Kara Coconut Cooking Oil",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "#keluargaKARAkeluargasehat",
    "thumb": "/images/works/57681bf5-8f7c-4507-b398-c7319f97776b.webp",
    "hero": "/images/works/2b0b5f92-08ca-4ada-8b92-559080d7a7cb.webp",
    "gallery": [
      "/images/works/8e77471d-5f3a-4e95-956f-42dd262bdc15.webp",
      "/images/works/828c49ea-5ba9-4116-b0a1-24214c3a967e.webp",
      "/images/works/fc69f620-074f-4fa0-a2de-c2e6cb8f031e.webp"
    ]
  },
  {
    "slug": "fitmee",
    "title": "Fitmee",
    "client": "Fitmee",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Pilih Sehat, Pilih Fitmee! 🍚",
    "thumb": "/images/works/e0461607-ac9e-4ead-b173-2a5a88311b7c.webp",
    "hero": "/images/works/a83b5bab-4faf-48df-932d-ff970e97ab2f.webp",
    "gallery": [
      "/images/works/30576df0-cc68-47ee-9aa4-afa4043d93e8.webp",
      "/images/works/6e0ab78b-5cdc-448e-a88b-2e6a34ce1c24.webp",
      "/images/works/a7817c55-4404-4e1a-8079-6360244ce37c.webp"
    ]
  },
  {
    "slug": "biopet",
    "title": "Biopet",
    "client": "Biopet",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Most halal certified pet food sold in 8 hours",
    "thumb": "/images/works/a8e1cabb-186e-4cd9-b76c-80ab2685580e.webp",
    "hero": "/images/works/2862fbb3-069d-4f00-852f-2ed7e0e91494.webp",
    "gallery": [
      "/images/works/0fdecda3-7e2a-4e22-999d-8ce9e9341865.webp",
      "/images/works/975dedf8-385e-4b6e-96c2-47c71c46dc30.webp",
      "/images/works/47d4a597-3fca-4725-a46b-48ee098b7774.webp"
    ]
  },
  {
    "slug": "digimap",
    "title": "Digimap",
    "client": "Digimap",
    "type": "Social Media Management",
    "category": "social-media",
    "year": "2026",
    "description": "Indonesia's Leading Apple Premium Partner & Authorised Reseller, Under MAP Group.",
    "thumb": "/images/works/1b889314-094c-4065-8332-57cb76ef9fe3.webp",
    "hero": "/images/works/89238ea3-fe62-4149-a765-247b2b0dc838.webp",
    "gallery": [
      "/images/works/5c5c615d-e6f5-4864-b36b-cb73ad0eaa39.webp",
      "/images/works/bc9c5f5e-725f-465a-b88a-5255975e8fb8.webp",
      "/images/works/266b70b0-f150-482a-894a-357b03bc0f56.webp"
    ]
  }
];
