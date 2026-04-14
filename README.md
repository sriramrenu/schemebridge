# 🌉 Scheme Bridge

**Bridging the gap between 1.4 Billion citizens and government benefits.**

Scheme Bridge is a high-performance, personalized gateway designed to simplify the discovery of government schemes in India. By leveraging smart matching algorithms and an inclusive design system, we empower users to find exactly what they are entitled to in seconds.

![Scheme Bridge Banner](https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop)

---

## ✨ Key Features

- **🎯 Personalization Engine**: A smart dashboard that filters **4,600+ schemes** based on your specific age, gender, state, income, and employment status.
- **🛡️ Secure Auth System**: Multi-step registration wizard backed by PostgreSQL and JWT session management.
- **🌍 Bilingual accessibility**: Seamless, invisible translation between English and Tamil to serve diverse communities.
- **♿ Accessibility Hub**: Built-in support for High Contrast mode, Dyslexia-friendly fonts, and Text Scaling.
- **⚡ Lightning Fast Search**: Real-time filtering by ministry, keyword, or eligibility category.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16 (Turbopack)](https://nextjs.org/) & TypeScript
- **Styling**: Vanilla CSS with modern Glassmorphism & Framer Motion
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Render Hosted)
- **ORM**: [Prisma 7](https://www.prisma.io/) with Driver Adapters
- **Auth**: Password Hashing (Bcrypt) & JWT Sessions (Jose)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- PostgreSQL Database

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/scheme-bridge.git

# Install dependencies
npm install

# Build the Prisma Client
npx prisma generate
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:pass@host/db"
JWT_SECRET="your-secure-secret-key"
```

### 4. Database Setup
```bash
# Initialize your cloud database with the SchemeBridge schema
npx prisma db push
```

### 5. Run Locally
```bash
npm run dev
```

---

## 🏗️ Architecture

- `/src/app`: Next.js App Router (Pages & Components)
- `/src/lib`: Database client singletons and Auth utilities
- `/prisma`: Database schema and configuration
- `/scripts`: Data synchronization and extraction tools
- `/public`: Optimized assets and icons

## 📜 License

Distributed under the MIT License. Built for the Public Good at **Solvathon 2026**.

---

<div align="center">
  <sub>Built with ❤️ by Sriram R & the Scheme Bridge Team</sub>
</div>
