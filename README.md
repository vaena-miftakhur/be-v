# Event Management System – Backend

REST API untuk sistem manajemen event menggunakan Express TypeScript dan Prisma ORM dengan database PostgreSQL.

## 🌐 Demo

- **Backend (Railway):** [https://be-v-production.up.railway.app/](https://be-v-production.up.railway.app/)
- **Frontend (Vercel):** [https://fe-vaena.vercel.app/](https://fe-vaena.vercel.app/)
- **Video Demo (YouTube):** [https://www.youtube.com/watch?v=0-wCwtFgxKI](https://www.youtube.com/watch?v=0-wCwtFgxKI)

## 👤 Identitas

- **Nama:** Vaena Miftakhur Risko
- **NIM:** 24090100
- **Program Studi:** D-4 Teknik Informatika
- **Fakultas:** Sekolah Vokasi

## 🛠️ Teknologi

- Express + TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Railway (deployment)

## 📦 Endpoint API

### Kategori
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | /categories | Ambil semua kategori |
| POST | /categories | Tambah kategori baru |
| GET | /categories/:id | Ambil kategori by ID |
| PUT | /categories/:id | Update kategori |
| DELETE | /categories/:id | Hapus kategori |

### Pembicara
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | /speakers | Ambil semua pembicara |
| POST | /speakers | Tambah pembicara baru |
| GET | /speakers/:id | Ambil pembicara by ID |
| PUT | /speakers/:id | Update pembicara |
| DELETE | /speakers/:id | Hapus pembicara |

### Event
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | /events | Ambil semua event |
| POST | /events | Tambah event baru |
| GET | /events/:id | Ambil event by ID |
| PUT | /events/:id | Update event |
| DELETE | /events/:id | Hapus event |

## 🗄️ Database Schema

```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  events    Event[]
}

model Speaker {
  id        Int      @id @default(autoincrement())
  name      String
  role      String
  image     String
  createdAt DateTime @default(now())
  events    Event[]
}

model Event {
  id          Int      @id @default(autoincrement())
  name        String
  categoryId  Int
  speakerId   Int?
  location    String
  dateEvent   DateTime
  description String
  createdAt   DateTime @default(now())
  category    Category @relation(fields: [categoryId], references: [id])
  speaker     Speaker? @relation(fields: [speakerId], references: [id])
}
```

## 🚀 Cara Menjalankan Lokal

```bash
# Clone repo
git clone https://github.com/username/repo-backend.git
cd repo-backend

# Install dependencies
npm install

# Setup environment variable
# Buat file .env dan isi DATABASE_URL

# Jalankan migrasi
npx prisma migrate dev

# Jalankan dev server
npm run dev
```

## 📁 Struktur Folder

```
src/
├── controllers/   # Logic handler (Category, Speaker, Event)
├── routes/        # Definisi endpoint API
├── lib/           # Prisma client
└── index.ts       # Entry point Express
prisma/
└── schema.prisma  # Schema database
```
